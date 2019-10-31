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
  SetorField,
  TextareaField,
  TextField,
  ToggleButtonField
} from '@edocsforms/shared';
import { FormlyFieldConfig } from '@ngx-formly/core';

import { Form } from './form.model';

export interface FormsState extends EntityState<Form>, ActiveState {
  availableFields: FormlyFieldConfig[];
}

const createInitialState = () => {
  return {
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
      }),
      SetorField.create('setor', {
        label: 'Setor',
        required: true
      })
    ]
  };
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'forms' })
export class FormsStore extends EntityStore<FormsState> {
  constructor() {
    super(createInitialState());

    this.set([
      {
        id: '2ca6ff4394',
        name: 'Formulário Teste',
        published: true,
        fields: [
          {
            id: 'c5801c4b8a',
            type: 'input',
            key: 'texto',
            templateOptions: {
              icon: 'fa fa-font',
              label: 'Nome',
              required: true,
              placeholder: 'Digite seu nome...',
              disabled: false
            },
            wrappers: ['form-field'],
            hooks: {},
            modelOptions: {}
          },
          {
            id: '97dcb443aa',
            type: 'input',
            key: 'email',
            templateOptions: {
              type: 'email',
              label: 'Email do funcionário',
              placeholder: 'Digite seu email...',
              icon: 'fa-at',
              required: true,
              disabled: false
            },
            wrappers: ['form-field']
          }
        ]
      },
      {
        id: '2ca6ff1111',
        name: 'Fomulário 4x4x1',
        published: false,
        fields: [
          {
            id: 'c5801c4b8a',
            type: 'input',
            key: 'texto',
            templateOptions: {
              icon: 'fa fa-font',
              label: 'Nome',
              required: true,
              placeholder: 'Digite seu nome...',
              disabled: false
            },
            wrappers: ['form-field'],
            hooks: {},
            modelOptions: {}
          },
          {
            id: '97dcb443aa',
            type: 'input',
            key: 'email',
            templateOptions: {
              type: 'email',
              label: 'Email do funcionário',
              placeholder: 'Digite seu email...',
              icon: 'fa-at',
              required: true,
              disabled: false
            },
            wrappers: ['form-field']
          }
        ]
      }
    ]);
  }
}
