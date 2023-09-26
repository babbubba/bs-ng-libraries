# BsEasyForm

It helps building forms with bootstrap style.

## Supported form element

### Input element

'text','password','email','number','search','tel','url','datetime-local','datetime'

### Textarea

'textarea'

### Checkbox

'checkbox'

### Select element

 'select', 'select2multi','enum-checkbox',

### Select2

select2multi

N.B.: To get correct style import the css file: "node_modules/@ng-select/ng-select/themes/default.theme.css" in the "styles" section of your angular.json.

N.B.2: To get select2 working import the module "NgSelectModule" in your module file.

## Example

This is a simple configuration for the form building.

It will generate two input type 'text' with required validation.

```json
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
              }
            ]
}
```

