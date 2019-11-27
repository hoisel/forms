import { ConfigOption } from '@ngx-formly/core';

import {
  CalendarField,
  CheckboxField,
  IconField,
  InputField,
  InputSwitchField,
  PasswordField,
  RadioField,
  SelectField,
  SetorField,
  TextareaField,
  ToggleButtonField
} from './types';
import { FormlyWrapperFormField } from './wrappers';

export const required = (err, field) => {
  return `Obrigatório`;
};

export const minlength = (err, field) => {
  return `No mínimo ${field.templateOptions.minLength} caracteres`;
};

export const maxlength = (err, field) => {
  return `No máximo ${field.templateOptions.maxLength} caracteres`;
};

export const min = (err, field) => {
  return `Valor mínimo ${field.templateOptions.min}`;
};

export const max = (err, field) => {
  return `Valor máximo ${field.templateOptions.max}`;
};

export const ValidationMessages = [
  { name: 'required', message: 'Obrigatório' },
  { name: 'minlength', message: minlength },
  { name: 'maxlength', message: maxlength },
  { name: 'min', message: min },
  { name: 'max', message: max }
];

export const FormTypes = [
  // types
  CalendarField,
  CheckboxField,
  InputField,
  InputSwitchField,
  RadioField,
  SelectField,
  TextareaField,
  ToggleButtonField,
  PasswordField,
  SetorField,
  IconField,
  // wrappers
  FormlyWrapperFormField
];

export const FormsConfig: ConfigOption = {
  wrappers: [{ name: 'form-field', component: FormlyWrapperFormField }],
  validationMessages: ValidationMessages,
  types: [
    {
      name: 'input',
      component: InputField,
      wrappers: ['form-field']
    },
    {
      name: 'password',
      component: PasswordField,
      wrappers: ['form-field']
    },
    {
      name: 'calendar',
      component: CalendarField,
      wrappers: ['form-field']
    },
    {
      name: 'toggle-button',
      component: ToggleButtonField,
      wrappers: ['form-field']
    },
    {
      name: 'input-switch',
      component: InputSwitchField,
      wrappers: ['form-field']
    },
    {
      name: 'checkbox',
      component: CheckboxField,
      wrappers: ['form-field']
    },
    {
      name: 'textarea',
      component: TextareaField,
      wrappers: ['form-field']
    },
    {
      name: 'radio',
      component: RadioField,
      wrappers: ['form-field']
    },
    {
      name: 'select',
      component: SelectField,
      wrappers: ['form-field']
    },
    {
      name: 'icon',
      component: IconField,
      wrappers: ['form-field']
    },
    {
      name: 'setor',
      component: SetorField,
      wrappers: ['form-field']
    }
  ]
};
