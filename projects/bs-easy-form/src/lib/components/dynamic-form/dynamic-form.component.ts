import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDynamicFormConf, IDynamicFormControls } from '../../models';
import { DatePipe } from '@angular/common';
import { IFormSubmit } from '../../models/form-submit.interface';

@Component({
  selector: 'BsDynamicForm',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.less']
})
export class DynamicFormComponent implements OnChanges {

  @Input() formConf?: IDynamicFormConf;
  @Output() submitted: EventEmitter<FormGroup> = new EventEmitter();
  @Output() submittedValue: EventEmitter<IFormSubmit> = new EventEmitter();
  public formGroup: FormGroup = this.fb.group({});

  validTypes: string[] = [
    'text', 'password', 'email', 'number', 'search', 'tel', 'url', 'textarea', 'select', 'select2', 'select2multi', 'enum-checkbox', 'datetime-local', 'date', 'time', 'month', 'week', 'checkbox'
  ];
  labeledTypes: string[] = [
    'text', 'password', 'email', 'number', 'search', 'tel', 'url', 'textarea', 'select', 'select2', 'select2multi', 'enum-checkbox', 'datetime-local', 'date', 'time', 'month', 'week'
  ];
  constructor(private fb: FormBuilder, private datePipe: DatePipe) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formConf'] && this.formConf) {
      this.createForm(this.formConf.controls)
    }
  }

  createForm(controls: IDynamicFormControls[]) {
    for (const control of controls) {
      // datetime is deprecated...change it to datetime-local
      if (control.type === 'datetime') {
        control.type = 'datetime-local';
      }

      if (!this.validTypes.includes(control.type)) {
        console.error(`BsEasyForm: invalid type: '${control.type}'`)
        return;
      }

      // if value type is a Date
      if (control.value instanceof Date) {
        // convert date format according to desired input type
        switch (control.type) {
          case 'date': {
            control.value = this.datePipe.transform(control.value, "yyyy-MM-dd");
            break;
          }
          case 'datetime-local': {
            control.value = this.datePipe.transform(control.value, "yyyy-MM-ddTHH:mm");
            break;
          }
          case 'time': {
            control.value = this.datePipe.transform(control.value, "HH:mm");
            break;
          }
          case 'month': {
            control.value = this.datePipe.transform(control.value, "yyyy-MM");
            break;
          }
          case 'week': {
            control.value = this.datePipe.transform(control.value, "yyyy-'W'ww");
            break;
          }
          default: {
            console.debug(`unrecognized type of date input type: '${control.type}'`)
          }
        }
      }


      const validatorsToAdd = [];
      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'min':
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'max':
            validatorsToAdd.push(Validators.max(value));
            break;
          case 'required':
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case 'email':
            if (value) {
              validatorsToAdd.push(Validators.email);
            }
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'nullValidator':
            if (value) {
              validatorsToAdd.push(Validators.nullValidator);
            }
            break;
          default:
            break;
        }
      }

      const ctrl = this.fb.control(control.value, validatorsToAdd);
      this.formGroup.addControl(
        control.name,
        ctrl
      );
    }
  }

  dateChanged(eventDate: string): Date | null {
    return !!eventDate ? new Date(eventDate) : null;
  }

  onSubmit() {
    let result = {... this.formGroup.value};

    this.formConf?.controls.filter(c=>c.type === 'date' || c.type === 'datetime-local').forEach(
      c=> {
        let ctrl =  this.formGroup.get(c.name);
        let value = ctrl?.value;
        result[c.name]=this.dateChanged(value)
        // ctrl?.setValue(this.dateChanged(value));
      }
    );

    this.submitted.emit(this.formGroup);
    this.submittedValue.emit(<IFormSubmit>{formGroup:this.formGroup,result: result});
  }


}


