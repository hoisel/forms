import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

import { createField, SelectTemplateOptions } from '../helpers';
import { InputSwitchField } from './input-switch';
import { TextField } from './text';

@Component({
  selector: 'formly-field-primeng-select',
  template: `
    <p-dropdown
      [class.ng-dirty]="showError"
      [placeholder]="to.placeholder"
      [options]="to.options | formlySelectOptions: field | async"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [showClear]="!to.required"
      (onChange)="to.change && to.change(field, $event)"
    >
    </p-dropdown>
  `
})
// tslint:disable-next-line:component-class-suffix
export class SelectField extends FieldType {
  public static create(key: string, templateOptions?: SelectTemplateOptions, options?: any): FormlyFieldConfig {
    const defaults = {
      options: [],
      placeholder: 'Selecione...',
      tooltip: '',
      icon: 'fa-caret-square-down'
    };
    return createField('select', key, { ...defaults, ...templateOptions }, options);
  }

  static getEditForm = () => [
    TextField.create('label', {
      label: 'Label',
      placeholder: 'Label',
      required: true
    }),
    TextField.create('placeholder', {
      label: 'Placeholder',
      placeholder: 'Placeholder',
      required: false
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
