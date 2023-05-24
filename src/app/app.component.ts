import { Component, OnInit } from '@angular/core';
import { Menu } from 'projects/bs-navigation/src/lib/models/menu-item.interface';
import { BsNavigationService } from 'projects/bs-navigation/src/public-api';
import { TestServiceBaseService } from './test-service-base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  menu:Menu = {};

  constructor(private menuService:BsNavigationService, private tService:TestServiceBaseService) {

  }
  ngOnInit(): void {

    // this.menuService.menus$.subscribe(r=>this.menu = r);
    // this.menuService.loadMenu('main-sidebar');
    this.tService.getCompanies().subscribe(
      res=> {
        console.log(res);
      }
    );
  }


}
