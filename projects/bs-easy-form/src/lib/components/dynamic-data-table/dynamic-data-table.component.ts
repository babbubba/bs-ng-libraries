import { TranslateService } from '@ngx-translate/core';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApplicationService } from '@babbubba/bs-shared-utils';

import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject, Subscription } from 'rxjs';

export interface DatTableCb {
  draw?: number | undefined;
  recordsTotal?: number | undefined;
  recordsFiltered?: number | undefined;
  data: any;
  error?: string | undefined;
}

@Component({
  selector: 'BsDynamicDataTable',
  templateUrl: './dynamic-data-table.component.html',
  styleUrls: ['./dynamic-data-table.component.css']
})
export class DynamicDataTableComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(DataTableDirective, { static: false }) dtElement!: DataTableDirective;
  dtOptions!: DataTables.Settings;
  dtTrigger: Subject<any> = new Subject();
  @Input() requestReload$?: Observable<boolean>;
  requestReloadSubscription?: Subscription;
  @Input() items?: any[];
  @Input() columns?: DataTables.ColumnSettings[];
  @Input() orders: Array<(number | string)> | Array<Array<(number | string)>> | undefined;
  @Input() dataCb!: (dtp: any, cb: any) => void;

  constructor(private appService: ApplicationService, private translateService: TranslateService) { }

  ngOnInit(): void {
    this.appService.dtConfig$.subscribe(
      (res: any) => {
        if (res) {
          this.dtOptions = {...res};
          this.dtOptions.columns = this.columns;
          this.dtOptions.order = this.orders;
          this.dtOptions.ajax = this.dataCb;
        }
        else {
          //error dtoption not found
          alert(this.translateService.instant('commons.messages.dt-option-not-found'));
        }
      }
    );
    this.requestReloadSubscription = this.requestReload$?.subscribe(
      res => {
        if (res) {
          this.reload();
        }
      }
    );
  }


  ngAfterViewInit(): void {
    this.dtTrigger.next(null);
  }

  reload() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(null);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger?.unsubscribe();
    this.requestReloadSubscription?.unsubscribe();
  }

}
