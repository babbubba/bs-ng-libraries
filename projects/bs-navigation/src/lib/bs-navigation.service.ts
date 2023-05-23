import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { BsNavigationConfig, BS_NAVIGATION_CONFIG_SERVICE } from './bs-navigation.module';
import { Menu, MenuItem } from './models/menu-item.interface';

@Injectable({
  providedIn: 'root'
})
export class BsNavigationService {

  menus: Menu = {};
  menus$: BehaviorSubject<Menu> = new BehaviorSubject({});

  constructor(@Inject(BS_NAVIGATION_CONFIG_SERVICE) private config: BsNavigationConfig, private http: HttpClient) {
  }

  getMenuItems(menuCode: string): Observable<ApiResponseValue<MenuItem[]>> {
    let params = new HttpParams().set('menuCode', menuCode);
    return this.http.get<ApiResponseValue<MenuItem[]>>(`${this.config.baseUrl}api/Navigation/menu-items`, { params: params });
  }

  async loadMenu(menuCode: string) {
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

export interface ApiResponse {
  success: boolean;
  errorMessage: string;
  warnMessage: string;
  errorCode: number;
}

export interface ApiResponseValue<T> extends ApiResponse {
  value: T;
}


