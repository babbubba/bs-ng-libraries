import { Component, Input } from '@angular/core';
import { MenuItem } from './models/menu-item.interface';
import { Router } from '@angular/router';



@Component({
  selector: '[menu-item]',
  templateUrl: './menu-item.component.html',
  styles: []
})

export class MenuItemComponent {
  @Input() menuItem!: MenuItem;
  constructor(private router: Router) {

  }

  anyChildIsActive(itemGroup: MenuItem): Boolean {
    if (!itemGroup?.subItems) return false;
    let anyChildActive = itemGroup.subItems.filter(si => this.router.isActive(si.path, false));

    return anyChildActive?.length > 0;
  }
}
