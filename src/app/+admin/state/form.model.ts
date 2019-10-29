import { ID } from '@datorama/akita';
import { FormlyFieldConfig } from '@ngx-formly/core';

export interface Form {
  id: ID;
  name: string;
  fields: FormlyFieldConfig[];
}

/**
 * A factory function that creates Forms
 */
export function createForm(params: Partial<Form>) {
  return {} as Form;
}
