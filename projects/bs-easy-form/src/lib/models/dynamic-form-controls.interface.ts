import { ListItem } from "BsSharedUtils";
import { IDynamicFormControlOptions } from "./dynamic-form-control-options.interface";
import { IDynamicFormValidators } from "./dynamic-form-validators.interface";

export interface IDynamicFormControls {
  name: string;
  label: string;
  value: string | boolean | any | any[];
  type: string;
  options?: IDynamicFormControlOptions;
  validators: IDynamicFormValidators;
  class?: string;
  list?:ListItem[];
  children?: IDynamicFormControls[];
}
