import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

import { CalendarTemplateOptions, createField, ptBR } from '../helpers';
import { InputSwitchField } from './input-switch';
import { TextField } from './text';

@Component({
  selector: 'formly-field-primeng-calendar',
  template: `
    <p-calendar
      [class.ng-dirty]="showError"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [placeholder]="to.placeholder"
      [minDate]="to.minDate"
      [maxDate]="to.maxDate"
      [yearNavigator]="to.yearNavigator"
      [yearRange]="to.yearRange"
      [inline]="to.inline"
      [showIcon]="to.showIcon"
      [dateFormat]="to.dateFormat"
      [locale]="to.locale"
      [showButtonBar]="to.showButtonBar"
      pInputTextarea
    ></p-calendar>
  `
})
// tslint:disable-next-line:component-class-suffix
export class CalendarField extends FieldType {
  static create(key: string, templateOptions?: CalendarTemplateOptions, options?: any): FormlyFieldConfig {
    const today = new Date();
    const year = today.getFullYear();

    const defaults = {
      dateFormat: 'dd/mm/yy',
      yearRange: `${year}:${year + 3}`,
      minDate: today,
      maxDate: new Date(today.getFullYear() + 3, today.getMonth(), today.getDate()),
      yearNavigator: false,
      showButtonBar: true,
      showIcon: true,
      inline: false,
      locale: ptBR,
      tooltip: '',
      icon: 'fa-calendar-alt'
    };
    return createField('calendar', key, { ...defaults, ...templateOptions }, options);
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
    TextField.create('yearRange', {
      label: 'Intervalo de anos',
      placeholder: '{1999:2010}',
      required: true
    }),
    CalendarField.create('minDate', {
      label: 'De',
      placeholder: 'Data mínima',
      required: true
    }),
    CalendarField.create('maxDate', {
      label: 'Até',
      placeholder: 'Data máxima',
      required: true
    }),
    InputSwitchField.create('required', {
      label: 'Obrigatório?',
      placeholder: 'Obrigatório?',
      required: true
    }),
    InputSwitchField.create('showIcon', {
      label: 'Exibir ícone?',
      placeholder: 'Exibir ícone?',
      required: false
    }),
    InputSwitchField.create('inline', {
      label: 'Inline?',
      placeholder: 'Inline?',
      required: false
    }),
    InputSwitchField.create('yearNavigator', {
      label: 'Ano selecionável?',
      placeholder: 'Ano selecionável',
      required: false
    }),
    InputSwitchField.create('showButtonBar', {
      label: 'Exibir botões?',
      placeholder: 'Exibir botões?',
      required: false
    })
  ];
}
