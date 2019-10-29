import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

import { CheckboxTemplateOptions, createField } from '../helpers';
import { InputSwitchField } from './input-switch';
import { TextField } from './text';

@Component({
  selector: 'formly-field-primeng-checkbox',
  template: `
    <p-checkbox
      [class.ng-dirty]="showError"
      binary="true"
      [label]="to.label"
      [formControl]="formControl"
      [formlyAttributes]="field"
      (onChange)="to.change && to.change(field, $event)"
    >
    </p-checkbox>
  `
})
// tslint:disable-next-line:component-class-suffix
export class CheckboxField extends FieldType {
  public static create(key: string, templateOptions?: CheckboxTemplateOptions, options?: any): FormlyFieldConfig {
    const defaults = {
      icon: 'fa-check-square'
    };

    return createField('checkbox', key, { ...defaults, ...templateOptions }, options);
  }

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
