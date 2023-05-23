import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
// import { BS_NAVIGATION_CONFIG_SERVICE } from './bs-navigation.module';
// import { BsNavigationConfig } from "./models/bs-navigation-config.interface";
import { Menu, MenuItem } from './models/menu-item.interface';
import { ApiResponseValue, AppConfig, ApplicationService, ModalMessagesService } from 'BsSharedUtils';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class BsNavigationService {

  menus: Menu = {};
  menus$: BehaviorSubject<Menu> = new BehaviorSubject({});
  appConfig!: AppConfig;

    constructor(private applicationService: ApplicationService, private http: HttpClient, private mms:ModalMessagesService, private translateService:TranslateService) {
      this.applicationService.appConfig$.subscribe(res => {
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
    return this.http.get<ApiResponseValue<MenuItem[]>>(`${this.appConfig.apiEndpointUrl}/api/Navigation/menu-items`, { params: params });
  }

  async loadMenu(menuCode: string) {
    if(!this.appConfig) {
      console.warn("No valid 'appConfig'");
      return;
    }
    try {
      const resp = await lastValueFrom(this.getMenuItems(menuCode));
      if (resp?.success) {
        this.menus[menuCode] = resp.value;
        this.menus$.next(this.menus);
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          console.error(`Event error - ${error}`);
        } else {
          console.error(`Error - [Status Code: ${error.status}] ${error.message}`);
        }
      } else {
        console.error(`Unhandled error - ${error}`);
      }
    }

  }

}


