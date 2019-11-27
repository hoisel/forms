import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

import { createField, PasswordTemplateOptions } from '../helpers';
import { InputSwitchField } from './input-switch';
import { TextField } from './text';

@Component({
  selector: 'formly-field-primeng-password',
  template: `
    <input
      type="password"
      pPassword
      [formControl]="formControl"
      [formlyAttributes]="field"
      [class.ng-dirty]="showError"
      [promptLabel]="to.promptLabel"
      [weakLabel]="to.weakLabel"
      [mediumLabel]="to.mediumLabel"
      [strongLabel]="to.strongLabel"
      [feedback]="to.feedback"
      [showPassword]="to.showPassword"
      data-lpignore="true"
    />
  `
})
// tslint:disable-next-line:component-class-suffix
export class PasswordField extends FieldType {
  public static create(key: string, templateOptions?: PasswordTemplateOptions, options?: any): FormlyFieldConfig {
    const defaults = {
      label: 'Password',
      type: 'password',
      placeholder: 'Digite sua senha',
      minLength: 3,
      required: true,
      tooltip: '',
      icon: 'fa fa-lock',

      // primeng
      weakLabel: 'Fraco',
      mediumLabel: 'Médio',
      strongLabel: 'Forte',
      promptLabel: 'Digite sua senha',
      feedback: true,
      showPassword: false
    };

    return createField('password', key, { ...defaults, ...templateOptions }, options);
  }

  /**
   *
   */
  static getEditForm = () => [
    TextField.create('label', {
      label: 'Label',
      placeholder: 'Label',
      required: false
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
    TextField.create('weakLabel', {
      label: 'Senha fraca (label)',
      placeholder: '',
      required: true
    }),
    TextField.create('mediumLabel', {
      label: 'Senha média (label)',
      placeholder: '',
      required: true
    }),
    TextField.create('strongLabel', {
      label: 'Senha forte (label)',
      placeholder: '',
      required: true
    }),
    InputSwitchField.create('required', {
      label: 'Obrigatório?',
      placeholder: 'Obrigatório?',
      required: true
    }),
    InputSwitchField.create('feedback', {
      label: 'Exibir feedback?',
      placeholder: '',
      required: false
    }),
    InputSwitchField.create('showPassword', {
      label: 'Exibir senha?',
      placeholder: '',
      required: false
    }),
    InputSwitchField.create('promptLabel', {
      label: 'Exibir prompt?',
      placeholder: '',
      required: false
    })
  ];
}
