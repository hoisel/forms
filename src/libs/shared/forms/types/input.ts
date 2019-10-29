import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

import { InputSwitchField } from './input-switch';
import { TextField } from './text';

@Component({
  selector: 'formly-field-primeng-input',
  template: `
    <input
      *ngIf="to.type !== 'number'; else numberTmp"
      pInputText
      [type]="to.type || 'text'"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [class.ng-dirty]="showError"
    />
    <ng-template #numberTmp>
      <input
        type="number"
        pInputText
        [formControl]="formControl"
        [formlyAttributes]="field"
        [class.ng-dirty]="showError"
      />
    </ng-template>
  `
})
// tslint:disable-next-line:component-class-suffix
export class InputField extends FieldType {
  static getEditForm = () => [
    TextField.create('label', {
      label: 'Label',
      placeholder: 'Label',
      required: true
    }),
    InputSwitchField.create('required', {
      label: 'Obrigatório?',
      placeholder: 'Obrigatório?',
      required: true
    })
  ];
}
