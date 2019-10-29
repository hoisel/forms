import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

import { createField, InputSwitchTemplateOptions } from '../helpers';
import { TextField } from './text';

@Component({
  selector: 'formly-field-primeng-input-switch',
  template: `
    <p-inputSwitch [class.ng-dirty]="showError" [formControl]="formControl" [formlyAttributes]="field"> </p-inputSwitch>
  `
})
// tslint:disable-next-line:component-class-suffix
export class InputSwitchField extends FieldType {
  static create(key: string, templateOptions?: InputSwitchTemplateOptions, options?: any): FormlyFieldConfig {
    const defaults = {
      label: 'Sim/Não',
      icon: 'fa-toggle-on',
      tooltip: ''
    };

    return createField('input-switch', key, { ...defaults, ...templateOptions }, options);
  }

  /**
   *
   */
  static getEditForm = () => [
    TextField.create('label', {
      label: 'Label',
      placeholder: 'Label',
      required: true
    }),
    TextField.create('tooltip', {
      label: 'Tooltip',
      placeholder: '',
      required: false
    }),
    InputSwitchField.create('required', {
      label: 'Obrigatório?',
      placeholder: 'Obrigatório?',
      required: true
    })
  ];
}
