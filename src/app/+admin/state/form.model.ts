import { ID } from '@datorama/akita';

export interface SetorField {}
export interface DateField {}
export interface ApproveField {}

export interface Form {
  id: ID;
}

/**
 * A factory function that creates Forms
 */
export function createForm(params: Partial<Form>) {
  return {} as Form;
}
