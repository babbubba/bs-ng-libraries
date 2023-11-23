import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpBackend, HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import {  ApplicationService, BsSharedUtilsModule, HttpLoaderFactory, appConfigFactory, dtConfigFactory, recaptchaConfigFactory } from 'BsSharedUtils';
import { BsNavigationModule } from 'BsNavigation';
import { BsEasyFormModule } from 'BsEasyForm';

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
    BsNavigationModule,
    BsEasyFormModule,
    NgSelectModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER, useFactory: appConfigFactory, multi: true, deps: [ApplicationService]
    },
    {
      provide: APP_INITIALIZER, useFactory: dtConfigFactory, multi: true, deps: [ApplicationService]
    },
    {
      provide: RECAPTCHA_V3_SITE_KEY, useFactory: recaptchaConfigFactory, deps: [ApplicationService]
    },
    // {
    //   provide: RECAPTCHA_V3_SITE_KEY,
    //   useValue: (appService: ApplicationService) => {
    //     return appService.appConfig$.pipe(
    //       last(ac=> ac !== undefined) as OperatorFunction<AppConfig|undefined, AppConfig>,
    //       map(ac=>ac?.recaptchaSiteKey),
    //       tap(t=>console.log('Recaptcha Token', t)),
    //       catchError(err => {
    //         alert("Error reading Recaptcha Site Key. Please contact the support.");
    //         return of([])
    //       })
    //     );
    //   },
    //   deps: [ApplicationService]
    // },
    // {
    //   provide: RECAPTCHA_V3_SITE_KEY,
    //   useFactory: (config: ApplicationService) => {
    //     return config.appConfig?.recaptchaSiteKey;
    //   },
    //   deps: [ApplicationService]
    // },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
