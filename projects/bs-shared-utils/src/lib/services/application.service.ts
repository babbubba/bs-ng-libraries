import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { AppConfig, Globals } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  httpClient: HttpClient;
  private dtOptions!: DataTables.Settings;
  private appConfig!: AppConfig;

  constructor(private handler: HttpBackend) {
    this.httpClient = new HttpClient(this.handler);
  }

  public get dataTablesOption() {
    return (async()=> {
      if (this.dtOptions) return this.dtOptions;
      let response = await lastValueFrom(this.httpClient.get<DataTables.Settings>(Globals.DATATABLES_CONFIG_PATH));
      if(response) {
        this.dtOptions = response;
      }
      return this.dtOptions;
    })
  }

  public get applicationConfig() {
    return (async()=> {
      if (this.appConfig) return this.appConfig;
      let response = await lastValueFrom(this.httpClient.get<AppConfig>(Globals.CONFIG_PATH));
      if(response) {
        this.appConfig = response;
      }
      return this.appConfig;
    })
  }

}
