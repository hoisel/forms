import { ConfigOption } from '@ngx-formly/core';

import { FormlyFieldCalendar } from './types';
import { FormlyWrapperFormField } from './wrappers';

export const FormTypes = [
  // types
  FormlyFieldCalendar,

  // wrappers
  FormlyWrapperFormField
];

export const FormsConfig: ConfigOption = {
  wrappers: [{ name: 'form-field', component: FormlyWrapperFormField }],
  types: [
    {
      name: 'calendar',
      component: FormlyFieldCalendar,
      wrappers: ['form-field']
    }
  ]
};
