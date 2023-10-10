import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { Menu, MenuItem } from './models/menu-item.interface';
import { TranslateService } from '@ngx-translate/core';
import { ApiResponseValue, ApplicationService, ModalMessagesService, ServiceBase } from '@babbubba/bs-shared-utils';

@Injectable({
  providedIn: 'root'
})
export class BsNavigationService extends ServiceBase {

  menus: Menu = {};
  menus$: BehaviorSubject<Menu> = new BehaviorSubject({});

    constructor(override applicationService: ApplicationService, override http: HttpClient, private mms:ModalMessagesService, override translateService:TranslateService) {
      super(applicationService,translateService,http)
      this.applicationService.appConfig$.subscribe((res: any) => {
        if(!res) {
          this.mms.errorMessage(this.translateService.instant('navigation-service.messages.app-config-invalid'))?.subscribe();
          return;
        }
        this.appConfig = res
      }
     );
  }

  private getMenuItems(menuCode: string): Observable<ApiResponseValue<MenuItem[]>> {
    let params = new HttpParams().set('menuCode', menuCode);
    return this.http.get<ApiResponseValue<MenuItem[]>>(`${this.apiUrl}api/Navigation/menu-items`, { params: params });
  }

  async loadMenu(menuCode: string) {
    if(!this.appConfig) {
      console.warn("Invalid 'appConfig' loading navigation menu items... retry later");
      return;
    }
    try {
      const resp = await lastValueFrom(this.getMenuItems(menuCode));
      if (resp?.success) {
        this.emitMenuChanges(menuCode, resp);
      }
    } catch (error) {
      this.emitMenuChanges(menuCode, <ApiResponseValue<MenuItem[]>>{success:false});
      console.error(`Error loading navigation menu items - ${error}`);
    }
  }

  private emitMenuChanges(menuCode: string, resp: ApiResponseValue<MenuItem[]>) {
    this.menus[menuCode] = resp.value;
    this.menus$.next(this.menus);
  }
}
