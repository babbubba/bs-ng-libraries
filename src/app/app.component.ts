import { Component, OnInit } from '@angular/core';
import { Menu } from 'projects/bs-navigation/src/lib/models/menu-item.interface';
import { TestServiceBaseService } from './test-service-base.service';
import { IDynamicFormConf } from 'BsEasyForm';
import { FormGroup } from '@angular/forms';
import { ListItem } from 'BsSharedUtils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  menu: Menu = {};
  vm: any = {
    field1: 'Valore di prova',
    field2: 'Valore di prova',
    field3: ['id1']
  }

  select2DataOptions:ListItem[] = [
    <ListItem>{
      id: 'id1',
      label: 'ID 1',
      isEnabled: true
    },
    <ListItem>{
      id: 'id2',
      label: 'ID 2',
      isEnabled: true
    },
    <ListItem>{
      id: 'id3',
      label: 'ID 3',
      isEnabled: true
    }
  ];
  formConf: IDynamicFormConf = {
    controls: [
      {
        name: 'field1', label: 'Campo 1', value: this.vm.field1, type: 'text', class: 'col-md-4', validators: {}
      },
      {
        name: 'field2', label: 'Campo 2', value: this.vm.field2, type: 'text', class: 'col-md-4', validators: { required: true }
      },
      {
        name: 'field3', label: 'Campo 3', value: this.vm.field3, type: 'select2multi', class: 'col-md-4', list:this.select2DataOptions, validators: { required: true }
      }
    ]
  };

  companies!: any[];

  columns = [
    { data: 'code', name: 'Code' },
    { data: 'name', name: 'Name' },
  ];

  order = [[0, 'asc']];

  constructor(private tService: TestServiceBaseService) {

  }
  ngOnInit(): void {

  }

  submitted(fg: FormGroup) {
    this.vm = fg.value;
  }

  dataCb = (dt: any, cb: any) => {
    this.tService.getCompaniesQuery(dt).subscribe(res => {
      if (res.success) {
        this.companies = res.data;
      }

      cb({
        recordsTotal: res.recordsTotal,
        recordsFiltered: res.recordsFiltered,
        data: []
      });
    });
  }


  edit(companyId: string) {

  }

}
