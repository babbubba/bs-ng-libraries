import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BS_NAVIGATION_CONFIG_SERVICE, BsNavigationModule } from 'projects/bs-navigation/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsNavigationModule.forRoot({
      baseUrl:'http://localhost:5134/'
    })
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
