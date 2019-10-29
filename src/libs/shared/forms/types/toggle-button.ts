import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

import { createField, ToggleButtonTemplateOptions } from '../helpers';
import { InputSwitchField } from './input-switch';
import { TextField } from './text';

@Component({
  selector: 'formly-field-primeng-toggle-button',
  template: `
    <p-toggleButton
      [class.ng-dirty]="showError"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [onLabel]="to.onLabel"
      [offLabel]="to.offLabel"
      [onIcon]="to.onIcon"
      [offIcon]="to.offIcon"
      [iconPos]="to.iconPos"
    >
    </p-toggleButton>
  `
})
// tslint:disable-next-line:component-class-suffix
export class ToggleButtonField extends FieldType {
  static create(key: string, templateOptions?: ToggleButtonTemplateOptions, options?: any): FormlyFieldConfig {
    const defaults = {
      onLabel: 'Sim',
      offLabel: 'Não',
      onIcon: null,
      offIcon: null,
      iconPos: null,
      icon: 'fa-square'
    };
    return createField('toggle-button', key, { ...defaults, ...templateOptions }, options);
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
    InputSwitchField.create('required', {
      label: 'Obrigatório?',
      placeholder: 'Obrigatório?',
      required: true
    })
  ];
}
