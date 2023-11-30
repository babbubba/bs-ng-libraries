import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from '../../models/menu-item.interface';
import { BsNavigationService } from '../../bs-navigation.service';
declare const $ : any;

@Component({
  selector: 'BsNavigation',
  templateUrl: './bs-navigation.component.html',
  styles: [
  ]
})
export class BsNavigationComponent implements OnInit {

  @Input() menuCode!: string;

  private menuItems: MenuItem[] = [];

  get items() : MenuItem[] {
    if(!this.menuItems) return [];
    return this.menuItems.sort((a, b) => a.position - b.position);
  }
  constructor(private menuService: BsNavigationService) { }

  ngOnInit(): void {
    //this init the treeview plugin for sub menu items (Admin Lte)
    $('[data-widget="treeview"]')?.Treeview('init');

    this.menuService.menus$.subscribe(r=>this.menuItems = r[this.menuCode]);
    this.menuService.loadMenu('main-sidebar');
  }




}


