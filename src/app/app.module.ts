import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavigationModule } from 'BsNavigation';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // BsNavigationModule.forRoot({
    //   baseUrl:'http://localhost:5134/'
    // })
    BsNavigationModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
