# BsEasyForm

It helps building forms with bootstrap style.

## Supported form element

### Common Input element

The following input element types are displayed with the input tag:

'text','password','email','number','search','tel','url','datetime-local','date','time','week','month'

The date types ('datetime-local','date','time','week','month') are formatted automatically using angular DatePipe. The value expected is a Angualr Date type value and he returned value is Date type as well.

### Textarea

'textarea'

### Checkbox

'checkbox'

### Select element

 'select', 'enum-checkbox',

### Select2

'select2multi'

N.B.: To get correct style import the css file: "node_modules/@ng-select/ng-select/themes/default.theme.css" in the "styles" section of your angular.json.

## Example

This is a simple configuration for the form building.

It will generate two input type 'text' with required validation and one select2 with multiple selection (not mandatory).

```typescript
this.formConf = {
              controls: [
              {
                name: 'code',
                label: 'Codice',
                class: 'col-md-3',
                value: this.model?.code,
                type: 'text',
                validators: {
                  required: true
                }
              },
              {
                name: 'name',
                label: 'Nome',
                class: 'col-md-3',
                value: this.model?.name,
                type: 'text',
                validators: {
                  required: true
                }
              },
              {
                 name: 'membersId',
                 label: 'Membri',
                 value: this.model?.membersId,
                 type: 'select2multi',
                 class: 'col-md-6',
                 list: this.users,
                 validators: {}
              }
            ]
}
```

In the template file we use the dynamic form in this way:

```html
 <BsDynamicForm *ngIf="formConf" [formConf]="formConf" (submittedValue)="submitted($event)"></BsDynamicForm>
```

The submitted event returns the IFormSubmit object. It contains:

- formGroup - of type FormGroup it is the raw FormGroup submitted. You will never use the formGroup.value object because it doesn't contain parsed data object like Date types;
- result - of type any this contains the parsed model (cloned from form binded data but parsed);

This is an example of how to handle the submit value event:

```typescript
 submitted(response: IFormSubmit) {
  if (!response.formGroup.valid || !this.model) return;

  this.model = { ...this.model, ...response.result };
  // objectAssign(this.model, frm.value);

  if (this.model?.id) {
   //update
   this.myService.update(this.model).subscribe(res => {	... });
  }
  else {
   //create
   this.myService.create(this.model).subscribe(res => { ... });
  }
 }
```

