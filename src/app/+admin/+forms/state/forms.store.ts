import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, EntityUIStore, ID, StoreConfig } from '@datorama/akita';
import { executeDelayed } from '@edocsforms/core';
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
import { Observable, OperatorFunction } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { Form, FormUI } from './form.model';

export interface FormsState extends EntityState<Form>, ActiveState {
  availableFields: FormlyFieldConfig[];
}

export interface FormUIState extends EntityState<FormUI> {}

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
      })
    ]
  };
};

/**
 *
 */
export type DelayedEntityActionOperator = <T>(id?: ID, delay?: number) => OperatorFunction<T, T>;

/**
 * Creates a ToggleLoading operator
 */
export const createToggleLoading = <S>(store: BaseStore<S>): DelayedEntityActionOperator => {
  return <T>(id?: ID, delay: number = 0): OperatorFunction<T, T> => {
    return (source: Observable<T>): Observable<T> => {
      return source.pipe(
        executeDelayed(() => store.setLoadingEntity(true, id), delay),
        finalize(() => {
          store.setLoadingEntity(false, id);
        })
      );
    };
  };
};

export class BaseStore<S> extends EntityStore<S> {
  setLoadingEntity(isLoading: boolean, id?: ID): void {
    this.ui.update(id, { isLoading });
  }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'forms' })
export class FormsStore extends BaseStore<FormsState> {
  ui: EntityUIStore<FormUIState>;

  /**
   *
   */
  constructor() {
    super(createInitialState());
    this.createUIStore().setInitialEntityState({ isLoading: false });
  }
}
