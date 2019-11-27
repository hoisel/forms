import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

import { createField, EmailTemplateOptions } from '../helpers';
import { InputSwitchField } from './input-switch';
import { TextField } from './text';

export class EmailField extends FieldType {
  static create(key: string, templateOptions?: EmailTemplateOptions, options?: any): FormlyFieldConfig {
    const defaults = {
      type: 'email',
      label: 'Email',
      placeholder: 'Digite seu email',
      icon: 'fa-at',
      tooltip: ''
    };

    return createField('input', key, { ...defaults, ...templateOptions }, options);
  }

  static getEditForm = () => [
    TextField.create('label', {
      label: 'Label',
      placeholder: 'Label',
      required: false
    }),
    TextField.create('tooltip', {
      label: 'Tooltip',
      placeholder: '',
      required: false
    }),
    TextField.create('placeholder', {
      label: 'Placeholder',
      placeholder: 'Placeholder',
      required: false
    }),
    InputSwitchField.create('required', {
      label: 'Obrigatório?',
      placeholder: 'Obrigatório?',
      required: true
    })
  ];
}
