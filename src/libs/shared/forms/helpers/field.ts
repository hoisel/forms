import { FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';

export const ptBR = {
  firstDayOfWeek: 0,
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
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
  | 'toggle-button'
  | 'input-switch';

export type TextTemplateOptions = Pick<FormlyTemplateOptions, 'label' | 'placeholder' | 'required' | 'disabled'> & {
  tooltip?: string;
};
export type EmailTemplateOptions = TextTemplateOptions;
export type PasswordTemplateOptions = TextTemplateOptions;
export type SelectTemplateOptions = TextTemplateOptions;
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

// export abstract class BaseField {
//   type: FieldType;
//   key: string;
//   templateOptions: TemplateOptions;
// }

// export class EmailField extends FieldType {
//   static create(key: string, templateOptions?: EmailTemplateOptions, options?: any): FieldType {
//     const defaults = {
//       type: 'email',
//       label: 'Email',
//       placeholder: 'Digite seu email'
//     };

//     return createField('input', key, { ...defaults, ...templateOptions }, options);
//   }
// }

// export class ToggleButtonField extends FieldType {
//   static create(key: string, templateOptions?: ToggleButtonTemplateOptions, options?: any): FieldType {
//     const defaults = {
//       onLabel: 'Sim',
//       offLabel: 'Não',
//       onIcon: null,
//       offIcon: null,
//       iconPos: null
//     };

//     return createField('toggle-button', key, { ...defaults, ...templateOptions }, options);
//   }
// }

// export class InputSwitchField extends FieldType {
//   static create(key: string, templateOptions?: InputSwitchTemplateOptions, options?: any): FieldType {
//     const defaults = {
//       label: 'Sim/Não'
//     };

//     return createField('input-switch', key, { ...defaults, ...templateOptions }, options);
//   }
// }

// export class TextField extends FieldType {
//   public static create(key: string, templateOptions?: TextTemplateOptions, options?: any): FieldType {
//     return createField('input', key, templateOptions, options);
//   }
// }

// export class TextareaField extends FieldType {
//   public static create(key: string, templateOptions?: TextAreaTemplateOptions, options?: any): FieldType {
//     const defaults = {
//       rows: 3
//     };
//     return createField('textarea', key, { ...defaults, ...templateOptions }, options);
//   }
// }

// export class SelectField extends FieldType {
//   public static create(key: string, templateOptions?: SelectTemplateOptions, options?: any): FieldType {
//     return createField('select', key, templateOptions, options);
//   }
// }

// export class CheckboxField extends FieldType {
//   public static create(key: string, templateOptions?: CheckboxTemplateOptions, options?: any): FieldType {
//     return createField('checkbox', key, templateOptions, options);
//   }
// }

// export class RadioField extends FieldType {
//   public static create(key: string, templateOptions?: RadioTemplateOptions, options?: any): FieldType {
//     return createField('radio', key, templateOptions, options);
//   }
// }

// export type FormField = TextField | TextareaField | SelectField | CheckboxField | RadioField;
