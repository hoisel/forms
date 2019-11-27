import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { arrayAdd, arrayRemove, arrayUpdate, guid, ID, withTransaction } from '@datorama/akita';
import { SetorField } from '@edocsforms/shared';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { forkJoin, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Form, Setor } from './form.model';
import { FormsQuery } from './forms.query';
import { createToggleLoading, DelayedEntityActionOperator, FormsStore } from './forms.store';

// toggleLoading operator
let toggleLoading: DelayedEntityActionOperator;

const config = {
  optimistic: false
};

export const cloneField = (field: FormlyFieldConfig) => ({
  key: field.key,
  type: field.type,
  id: field.id,
  wrappers: field.wrappers,
  // ...field,
  templateOptions: { ...field.templateOptions }
});

@Injectable({ providedIn: 'root' })
export class FormsService {
  get baseUrl() {
    return `api`;
  }

  get api() {
    return {
      forms: `${this.baseUrl}/forms`,
      setores: `${this.baseUrl}/setores`
    };
  }

  /**
   *
   */
  constructor(private query: FormsQuery, private store: FormsStore, private http: HttpClient) {
    toggleLoading = createToggleLoading(store);
  }

  /**
   * Load initial data: forms and setores
   * @returns Initial data observable
   */
  load() {
    const getForms$ = this.http.get<Form[]>(this.api.forms);
    const getSetores$ = this.http.get<Setor[]>(this.api.setores);

    return forkJoin(getForms$, getSetores$).pipe(
      toggleLoading(),
      withTransaction(([forms, setores]: [Form[], Setor[]]) => {
        this.store.set(forms);
        this.store.update(state => ({
          availableFields: arrayAdd(
            state.availableFields,
            SetorField.create('setor', {
              label: 'Setor',
              required: true,
              options: setores.map(s => ({
                value: s.guid,
                label: s.nomeCurto
              }))
            })
          )
        }));
      })
    );
  }

  /**
   * Get all forms
   * @returns Forms list observable
   */
  get(): Observable<Form[]> {
    return this.http.get<Form[]>(this.api.forms).pipe(
      toggleLoading(),
      tap(entities => {
        this.store.upsertMany(entities);
      })
    );
  }

  /**
   * Add a form. Optionally, executes opmistically
   *
   * @param form - The form data
   * @param optimistic - Wheter executes opmistically or not
   */
  add(form: Form, optimistic = config.optimistic) {
    // gera id temporário para optimistic insert
    const tempId = guid();

    // optimistic update
    if (optimistic) {
      this.store.add({ ...form, id: tempId });
    }

    return this.http.post<Form>(this.api.forms, form).pipe(
      toggleLoading(tempId),
      catchError(error => {
        // em caso de erro, desfaz optimistic insert e relança o erro
        if (optimistic) {
          this.store.remove(tempId);
        }
        return throwError(error);
      }),
      withTransaction(saved => {
        // em caso de sucesso, transacionalmente faz:
        // 1- substitui optimistic insert por entidade que veio do server
        this.store.remove(tempId);
        this.store.add(saved);
      })
    );
  }

  /**
   * Updates a form. Optionally, executes opmistically
   *
   * @param changes - The changes applied to the form
   * @param optimistic - Wheter executes opmistically or not
   */
  update(changes: Partial<Form>, optimistic = config.optimistic) {
    const current = this.query.getEntity(changes.id);

    // optimistic update
    if (optimistic) {
      this.store.update(changes.id, changes);
    }

    return this.http.put<Form>(`${this.api.forms}/${changes.id}`, changes).pipe(
      toggleLoading(changes.id),
      catchError(error => {
        // em caso de erro, faz rollback
        if (optimistic) {
          this.store.update(current.id, current);
        }
        return throwError(error);
      }),
      // update store with server data
      tap(() => this.store.update(changes.id, changes))
    );
  }

  /**
   * Deletes a form. Optionally, executes opmistically
   *
   * @param id - The form id
   * @param optimistic - Wheter executes opmistically or not
   */
  delete(id: ID, optimistic = config.optimistic) {
    const current = this.query.getEntity(id);

    // optimistic delete
    if (optimistic) {
      this.store.remove(id);
    }

    return this.http.delete<Form>(`${this.api.forms}/${id}`).pipe(
      toggleLoading(id),
      catchError(error => {
        // em caso de erro, faz rollback
        if (optimistic) {
          this.store.add(current);
        }
        return throwError(error);
      }),
      // commit store
      tap(() => {
        if (this.query.hasEntity(id)) {
          this.store.remove(id);
        }
      })
    );
  }

  /**
   * Set the form as published
   *
   * @param id - The form id
   * @returns The updated form
   */
  publish(id: ID): Observable<Form> {
    return this.update({ id, published: true });
  }

  /**
   * Set form as active
   * @param id - The form id
   */
  setActive(id: ID) {
    this.store.setActive(id);
  }

  /**
   * Add a field config to form. Executes locally only (No server trips envolved)
   *
   * @param id - The form id
   * @param field - Field config being added to form
   * @returns Updated form with the new added field config
   */
  addField(id: ID, field: FormlyFieldConfig): Observable<Form> {
    const form = this.query.getEntity(id);
    return this.update({
      id,
      fields: arrayAdd(form.fields, {
        id: guid(),
        ...field
      })
    });
  }

  /**
   * Remove a field config from form. Executes locally only (No server trips envolved)
   *
   * @param id - The form id
   * @param field - Field config being removed from form
   * @returns Updated form with the new removed field config
   */
  removeField(id: ID, field: FormlyFieldConfig): Observable<Form> {
    const form = this.query.getEntity(id);
    return this.update({
      id,
      fields: arrayRemove(form.fields, f => f.id === field.id)
    });
  }

  /**
   * Updates a form field config. Executes locally only (No server trips envolved)
   *
   * @param id - The form id
   * @param field - Field config being updated
   * @returns Updated form with the new updated field config
   */
  updateField(id: ID, field: FormlyFieldConfig): Observable<Form> {
    const form = this.query.getEntity(id);
    return this.update({
      id,
      fields: arrayUpdate(form.fields, f => f.id === field.id, field)
    });
  }

  /**
   * Removes all form fields config. Executes locally only (No server trips envolved)
   * Only remove fields, but does not reset form name.
   *
   * @param id - The form id
   * @returns Updated form
   */
  removeAllFields(id: ID): Observable<Form> {
    return this.update({ id, fields: [] });
  }

  /**
   * Clears the form locally: Removes all form fields config and reset form name.
   * Executes locally only (No server trips envolved)
   *
   * @param id - The form id
   * @returns Updated form
   */
  clear(id: ID): Observable<Form> {
    return this.update({ id, fields: [], name: '' });
  }

  /**
   * Clones the form locally. Executes locally only (No server trips envolved)
   * Generates a copy with new ID in a unpublished state
   *
   * @param id - The form id
   * @returns The new form
   */
  clone(id: ID): Observable<Form> {
    const toCopy = this.query.getEntity(id);
    return this.add({
      ...toCopy,
      ...{
        id: guid(),
        published: false,
        name: `Cópia de ${toCopy.name}`
      }
    });
  }
}
