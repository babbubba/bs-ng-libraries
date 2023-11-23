import { Component, OnInit } from '@angular/core';
import { Menu } from 'projects/bs-navigation/src/lib/models/menu-item.interface';
import { FormGroup } from '@angular/forms';
import { ApiResponseDatatable, ILoginDto, ListItem } from 'BsSharedUtils';
import { IDynamicFormConf } from 'projects/bs-easy-form/src/public-api';
import { of } from 'rxjs';
import { AuthenticationService } from 'projects/bs-shared-utils/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

/**
 *
 */
constructor(private autService: AuthenticationService) {
  this.autService.login2(<ILoginDto>{}).subscribe();

}

  menu: Menu = {};
  vm: any = {
    field1: 'Valore di prova',
    field2: 'Valore di prova',
    field3: ['id1'],
    field4: new Date,
    field5: new Date,
    field6: new Date,
    field7: 'id2',
    field8: new Date,
    field9: new Date,
    field10: true

  }

  options:ListItem[] = [
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
        name: 'field3', label: 'Campo 3', value: this.vm.field3, type: 'select2multi', class: 'col-md-4', list:this.options, validators: { required: true }
      },
      {
        name: 'field4', label: 'Campo 4', value: this.vm.field4, type: 'datetime-local', class: 'col-md-4', validators: { }
      },
      {
        name: 'field5', label: 'Campo 5', value: this.vm.field5, type: 'date', class: 'col-md-4', validators: { }
      },
      {
        name: 'field6', label: 'Campo 6', value: this.vm.field6, type: 'time', class: 'col-md-4', validators: { }
      },
      {
        name: 'field7', label: 'Campo 7', value: this.vm.field7, type: 'select2', class: 'col-md-4', list:this.options, validators: { required: true }
      },
      {
        name: 'field8', label: 'Campo 8', value: this.vm.field8, type: 'month', class: 'col-md-4', validators: { }
      },
      {
        name: 'field9', label: 'Campo 9', value: this.vm.field9, type: 'week', class: 'col-md-4', validators: { }
      },
      {
        name: 'field10', label: 'Campo 10', value: this.vm.field10, type: 'checkbox', class: 'col-md-4', validators: { }
      },
    ]
  };

  companies!: any[];

  columns = [
    { data: 'code', name: 'Code' },
    { data: 'name', name: 'Name' },
  ];

  order = [[0, 'asc']];


  ngOnInit(): void {

  }

  submitted(fg: FormGroup) {
    this.vm = fg.value;
  }

  dataCb = (dt: any, cb: any) => {

    const fakeResult: ApiResponseDatatable<any[]> = <ApiResponseDatatable<any[]>>{
      success:true,
      data: <any[]>[],
      recordsTotal: 17,
      recordsFiltered: 16
    };

    of(fakeResult).subscribe(res => {
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
