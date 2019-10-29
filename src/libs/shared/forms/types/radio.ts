import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

import { createField, RadioTemplateOptions } from '../helpers';
import { InputSwitchField } from './input-switch';
import { TextField } from './text';

@Component({
  selector: 'formly-field-primeng-radio',
  template: `
    <p-radioButton
      *ngFor="let option of to.options | formlySelectOptions: field | async"
      [class.ng-dirty]="showError"
      [name]="field.name || id"
      [formControl]="formControl"
      [label]="option.label"
      [value]="option.value"
    >
    </p-radioButton>
  `
})
// tslint:disable-next-line:component-class-suffix
export class RadioField extends FieldType {
  public static create(key: string, templateOptions?: RadioTemplateOptions, options?: any): FormlyFieldConfig {
    const defaults = {
      options: [],
      icon: 'fa-check-circle'
    };
    return createField('radio', key, { ...defaults, ...templateOptions }, options);
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
