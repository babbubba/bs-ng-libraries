import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiResponseDatatable, ApplicationService, ServiceBase, pipeError } from '@babbubba/bs-shared-utils';

@Injectable({
  providedIn: 'root'
})
export class TestServiceBaseService extends ServiceBase {

  constructor(private httpClient:HttpClient, private _appService:ApplicationService, private _translateService:TranslateService) {
    super(_appService, _translateService);
  }

  getCompanies() {
    return this.httpClient.get<any>(this.apiUrl + 'api/companies').pipe(pipeError);
  }

  getCompaniesQuery(dtParams:any) {
    return this.httpClient.post<ApiResponseDatatable<any>>(this.apiUrl + 'api/companies/query', dtParams).pipe(pipeError);
  }
}
