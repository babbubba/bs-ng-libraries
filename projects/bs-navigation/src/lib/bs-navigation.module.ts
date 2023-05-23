import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { BsNavigationComponent } from './bs-navigation.component';
import { HttpClientModule} from '@angular/common/http'
import { BsNavigationService } from './bs-navigation.service';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from './menu-item.component';



@NgModule({
  declarations: [
    BsNavigationComponent,
    MenuItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    BsNavigationComponent
  ]
})
export class BsNavigationModule {

  static forRoot(config: BsNavigationConfig): ModuleWithProviders<BsNavigationModule> {
    return {
      ngModule: BsNavigationModule,
      providers: [
        BsNavigationService,
        {
          provide: BS_NAVIGATION_CONFIG_SERVICE,
          useValue: config
        }
      ]
    }
  }

}


export interface BsNavigationConfig {
  baseUrl: string;
}

export const BS_NAVIGATION_CONFIG_SERVICE = new InjectionToken<BsNavigationConfig>('BsNavigationConfig');
