import { HttpBackend, HttpClient } from '@angular/common/http';
import { AppConfig } from '../models';
import { ApplicationService } from './application.service';
import { TranslateService } from '@ngx-translate/core';


export abstract class ServiceBase {
  protected httpClientBackend: HttpClient;
  protected appConfig?: AppConfig;
  protected dtConfig?: DataTables.Settings;

  constructor(private handler: HttpBackend, protected httpClient: HttpClient, protected applicationService: ApplicationService, private translateService: TranslateService) {
    this.httpClientBackend = new HttpClient(this.handler);
    applicationService.appConfig$.subscribe(res => this.appConfig = res);
    applicationService.dtConfig$.subscribe(res => this.dtConfig = res);
  }

  protected T(messageKey:string, interpolatedParams: Object| undefined = undefined):string {
    return this.translateService.instant(messageKey, interpolatedParams);
  }

  protected get apiUrl(): string {
    let result = '';
    if(this.appConfig) {
      if(!this.appConfig?.apiEndpointUrl.endsWith('/')) {
        result+= '/';
      }
    }
    return result;
  }
}
