import { FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';

export const ptBR = {
  firstDayOfWeek: 0,
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  dayNamesMin: ['Do', 'Se', 'Te', 'Qa', 'Qi', 'Se', 'Sa'],
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  today: 'Hoje',
  clear: 'Limpar'
};

export type FieldTypeName =
  | 'calendar'
  | 'setor'
  | 'approval'
  | 'input'
  | 'text'
  | 'password'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'email'
  | 'icon'
  | 'toggle-button'
  | 'input-switch';

export type TextTemplateOptions = Pick<FormlyTemplateOptions, 'label' | 'placeholder' | 'required' | 'disabled'> & {
  tooltip?: string;
};
export type EmailTemplateOptions = TextTemplateOptions;
export type PasswordTemplateOptions = TextTemplateOptions;
export type SelectTemplateOptions = TextTemplateOptions & { options?: { label: string; value: any }[] };
export type SetorTemplateOptions = TextTemplateOptions & { options?: { label: string; value: any }[] };
export type RadioTemplateOptions = TextTemplateOptions;
export type TextAreaTemplateOptions = TextTemplateOptions;
export type ToggleButtonTemplateOptions = TextTemplateOptions;
export type InputSwitchTemplateOptions = TextTemplateOptions;
export type CalendarTemplateOptions = TextTemplateOptions & {
  // primeng properties
  // ver: https://www.primefaces.org/primeng/#/calendar
  yearNavigator?: boolean;
  minDate?: Date;
  maxDate?: Date;
  yearRange?: string;
  inline?: boolean;
  showIcon?: boolean;
  dateFormat?: string;
  showButtonBar?: boolean;
};
export type CheckboxTemplateOptions = TextTemplateOptions;

export type TemplateOptions =
  | TextTemplateOptions
  | EmailTemplateOptions
  | PasswordTemplateOptions
  | SelectTemplateOptions
  | RadioTemplateOptions
  | TextAreaTemplateOptions
  | CalendarTemplateOptions
  | CheckboxTemplateOptions
  | ToggleButtonTemplateOptions
  | InputSwitchTemplateOptions;

/**
 *
 */
export const createField = (
  type: FieldTypeName,
  key: string,
  templateOptions?: FormlyTemplateOptions,
  options?: any
): FormlyFieldConfig => {
  return {
    type,
    key,
    templateOptions,
    ...options
  };
};
