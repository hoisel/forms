import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import {
  CalendarField,
  CheckboxField,
  EmailField,
  InputSwitchField,
  PasswordField,
  RadioField,
  SelectField,
  TextareaField,
  TextField,
  ToggleButtonField
} from '@edocsforms/shared';
import { FormlyFieldConfig } from '@ngx-formly/core';

import { Form } from './form.model';

export interface FormsState extends EntityState<Form>, ActiveState {
  availableFields: FormlyFieldConfig[];
}

const initialState = {
  active: null,
  availableFields: [
    CalendarField.create('data', {
      label: 'Data',
      placeholder: 'Data',
      required: true,
      inline: false
    }),
    TextField.create('texto', {
      label: 'Texto',
      required: true
    }),
    EmailField.create('email', {
      label: 'Email',
      placeholder: 'Digite seu email',
      required: true
    }),
    ToggleButtonField.create('toggleButton', {
      label: 'Toggle Button',
      required: true
    }),
    InputSwitchField.create('inputSwitch', {
      label: 'Input Switch',
      required: true
    }),
    PasswordField.create('password', {
      label: 'Senha',
      placeholder: 'Digite sua senha',
      required: true
    }),
    SelectField.create('select', {
      label: 'Lista',
      required: true
    }),
    TextareaField.create('textarea', {
      label: 'Textarea',
      placeholder: '',
      required: true
    }),
    RadioField.create('radio', {
      label: 'Radio Button',
      required: true
    }),
    CheckboxField.create('checkbox', {
      label: 'Checkbox',
      required: true
    })
  ]
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'forms' })
export class FormsStore extends EntityStore<FormsState> {
  constructor() {
    super(initialState);
  }
}
