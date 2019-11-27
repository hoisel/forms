import { ID } from '@datorama/akita';
import { FormlyFieldConfig } from '@ngx-formly/core';

export interface Form {
  id: ID;
  name: string;
  published: boolean;
  fields: FormlyFieldConfig[];
}

export interface Setor {
  guid: ID;
  nome: string;
  sigla: string;
  nomeCurto: string;
  tipoUnidade: {
    id: number;
    descricao: string;
  };
  unidadePai: {
    guid: string;
    nome: string;
    sigla: string;
    nomeCurto: string;
  };
}

export interface FormUI {
  id: ID;
  isLoading: boolean;
}

/**
 * A factory function that creates Forms
 */
export function createForm(params: Partial<Form>) {
  return {} as Form;
}
