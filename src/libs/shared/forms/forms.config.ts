import { ConfigOption } from '@ngx-formly/core';

import {
  CalendarField,
  CheckboxField,
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
  // wrappers
  FormlyWrapperFormField
];

export const FormsConfig: ConfigOption = {
  wrappers: [{ name: 'form-field', component: FormlyWrapperFormField }],
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
      name: 'setor',
      component: SetorField,
      wrappers: ['form-field']
    }
  ]
};
