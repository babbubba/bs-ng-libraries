import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApplicationService, ServiceBase, pipeError } from 'BsSharedUtils';

@Injectable({
  providedIn: 'root'
})
export class TestServiceBaseService extends ServiceBase {

  constructor(private httpClient:HttpClient, private _appService:ApplicationService, private _translateService:TranslateService) {
    super(_appService, _translateService);
  }

  getCompanies() {
    return this.httpClient.get(this.apiUrl + 'api/companies').pipe(pipeError);
  }
}
