import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

import { createField, TextTemplateOptions } from '../helpers';

export class TextField extends FieldType {
  static create(key: string, templateOptions?: TextTemplateOptions, options?: any): FormlyFieldConfig {
    const defaults = {
      icon: 'fa fa-font'
    };
    return createField('input', key, { ...defaults, ...templateOptions }, options);
  }
}
