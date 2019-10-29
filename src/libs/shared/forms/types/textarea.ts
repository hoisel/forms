import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

import { createField, TextAreaTemplateOptions } from '../helpers';
import { InputSwitchField } from './input-switch';
import { TextField } from './text';

@Component({
  selector: 'formly-field-primeng-textarea',
  template: `
    <textarea
      [class.ng-dirty]="showError"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [autoResize]="to.autoResize"
      pInputTextarea
    ></textarea>
  `
})
// tslint:disable-next-line:component-class-suffix
export class TextareaField extends FieldType {
  public static create(key: string, templateOptions?: TextAreaTemplateOptions, options?: any): FormlyFieldConfig {
    const defaults = {
      rows: 3,
      autoResize: false,
      icon: 'fa fa-align-left'
    };
    return createField('textarea', key, { ...defaults, ...templateOptions }, options);
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
    InputSwitchField.create('autoResize', {
      label: 'Auto redimensionável?',
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
