import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { BsNavigationComponent } from './components/bs-navigation/bs-navigation.component';
import { HttpClientModule} from '@angular/common/http'
import { BsNavigationService } from './bs-navigation.service';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { BsNavigationConfig } from './models/bs-navigation-config.interface';
import { BsSharedUtilsModule } from '@babbubba/bs-shared-utils';


@NgModule({
  declarations: [
    BsNavigationComponent,
    MenuItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    BsSharedUtilsModule
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

export const BS_NAVIGATION_CONFIG_SERVICE = new InjectionToken<BsNavigationConfig>('BsNavigationConfig');
