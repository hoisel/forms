import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

import { createField, ToggleButtonTemplateOptions } from '../helpers';
import { IconField } from './icons';
import { InputSwitchField } from './input-switch';
import { SelectField } from './select';
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
      [iconPos]="to.iconPos || 'left'"
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
      iconPos: 'left',
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
      required: false
    }),
    TextField.create('onLabel', {
      label: 'On (label)',
      placeholder: 'On (label)',
      required: true
    }),
    TextField.create('offLabel', {
      label: 'Off (label)',
      placeholder: 'Off (label)',
      required: true
    }),
    // SelectField.create('iconCollection', {
    //   label: 'Coleção de ícones',
    //   options: [{ label: 'Primeng', value: 'primenf' }, { label: 'Font Awesome', value: 'fontawesome' }],
    //   required: false
    // }),
    IconField.create('onIcon', {
      label: 'On (ícone)',
      placeholder: 'Selecione...',
      required: false
    }),
    IconField.create('offIcon', {
      label: 'Off (ícone)',
      placeholder: 'Selecione...',
      required: false
    }),
    SelectField.create('iconPos', {
      label: 'Posição do ícone',
      options: [{ label: 'Esquerda', value: 'left' }, { label: 'Direita', value: 'right' }],
      required: false
    }),
    InputSwitchField.create('required', {
      label: 'Obrigatório?',
      placeholder: 'Obrigatório?',
      required: true
    })
  ];
}
