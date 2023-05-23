import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'BsCheckbox',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CheckBoxComponent
    }
  ]
})
export class CheckBoxComponent implements ControlValueAccessor, OnInit {
  // form: NgForm;
  // control!: AbstractControl;
  value:boolean|undefined;

  @Input() label!: string;
  @Input() description!: string;
  @Input() name!: string;
  // @Input() required!: boolean;
  @Input() wrap: boolean =true;
  // @Input() value!: any;
  // disabled: boolean = false;

  constructor() {
    // this.form = form;
   }

   onChange  = (value: any) => {};
   onTouched  = () => {};
   touched = false;
   disabled = false;

  ngOnInit(): void {
  }



  writeValue(value: boolean|undefined): void {
    this.value = value;
  }


  registerOnChange(onChange: any): void {
    this.onChange  = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
   }

   markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }


  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled;
  }

  change() {
    this.markAsTouched();
    if(this.value){
      this.value = !this.value;
    }
    else {
      this.value = true;
    }
    this.onChange(this.value);
  }
}
