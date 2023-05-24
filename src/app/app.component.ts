import { Component, OnInit } from '@angular/core';
import { Menu } from 'projects/bs-navigation/src/lib/models/menu-item.interface';
import { BsNavigationService } from 'projects/bs-navigation/src/public-api';
import { TestServiceBaseService } from './test-service-base.service';
import { IDynamicFormConf } from 'BsEasyForm';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  menu: Menu = {};
  vm:any = {
    field1: 'Valore di prova',
    field2: 'Valore di prova'

  }
  formConf: IDynamicFormConf = {
    controls: [
      {
        name: 'field1',
        label: 'Campo 1',
        value: this.vm.field1,
        type: 'text',
        class: 'col-md-4',
        validators: {
        }
      },
      {
        name: 'field2',
        label: 'Campo 2',
        value: this.vm.field2,
        type: 'text',
        class: 'col-md-4',
        validators: {
          required: true
        }
      }
    ]
  };


  constructor(private menuService: BsNavigationService, private tService: TestServiceBaseService) {

  }
  ngOnInit(): void {

    // this.menuService.menus$.subscribe(r=>this.menu = r);
    // this.menuService.loadMenu('main-sidebar');
    this.tService.getCompanies().subscribe(
      res => {
        console.log(res);
      }
    );
  }


  submitted(fg: FormGroup) {
    this.vm = fg.value;
  }

}
