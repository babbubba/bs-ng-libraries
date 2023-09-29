import { ListItem } from "@babbubba/bs-shared-utils";
import { IDynamicFormControlOptions } from "./dynamic-form-control-options.interface";
import { IDynamicFormValidators } from "./dynamic-form-validators.interface";

/**
 * Interface for the dynamic form control (it represents a field of the form)
 */
export interface IDynamicFormControls {
  name: string;
  /**
   * The label is displayed above the field's form
   */
  label: string;
  value: string | boolean | any | any[];
  /**
   * The type of the form field. It maybe: 'text','password','email','number','search','tel','url','datetime-local','datetime','textarea','checkbox', 'select', 'select2multi','enum-checkbox',
   */
  type: string;
  options?: IDynamicFormControlOptions;
  validators: IDynamicFormValidators;
  class?: string;
  /**
   * Optional list of elements (for select and select2 from controls)
   */
  list?:ListItem[];
  children?: IDynamicFormControls[];
}
