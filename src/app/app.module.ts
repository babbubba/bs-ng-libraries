import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpBackend, HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ApplicationService, BsSharedUtilsModule } from 'BsSharedUtils';
import { HttpLoaderFactory } from 'projects/bs-shared-utils/src/public-api';
import { BsNavigationModule } from 'BsNavigation';
import { appConfigFactory, dtConfigFactory } from 'projects/bs-shared-utils/src/lib/services/factory.function';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BsSharedUtilsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend]
      },
      defaultLanguage: 'it'
    }),
    BsNavigationModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER, useFactory: appConfigFactory, multi: true, deps: [ApplicationService]
    },
    {
      provide: APP_INITIALIZER, useFactory: dtConfigFactory, multi: true, deps: [ApplicationService]
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
