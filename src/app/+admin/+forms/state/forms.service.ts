import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { arrayAdd, arrayRemove, arrayUpdate, guid, ID } from '@datorama/akita';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { tap } from 'rxjs/operators';

import { Form } from './form.model';
import { FormsQuery } from './forms.query';
import { FormsStore } from './forms.store';

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
  /**
   *
   */
  constructor(private query: FormsQuery, private store: FormsStore, private http: HttpClient) {}

  get() {
    return this.http.get<Form[]>('https://api.com').pipe(
      tap(entities => {
        this.store.set(entities);
      })
    );
  }

  add(form: Form) {
    this.store.add(form);
  }

  update(id, form: Partial<Form>) {
    this.store.update(id, form);
  }

  remove(id: ID) {
    this.store.remove(id);
  }

  setActive(id: ID) {
    this.store.setActive(id);
  }

  addField(id: ID, field: FormlyFieldConfig) {
    this.store.update(id, entity => ({
      fields: arrayAdd(entity.fields, {
        id: guid(),
        ...field
      })
    }));
  }

  removeField(id: ID, field: FormlyFieldConfig) {
    this.store.update(id, entity => ({
      fields: arrayRemove(entity.fields, f => f.id === field.id)
    }));
  }

  updateField(id: ID, field: FormlyFieldConfig) {
    this.store.update(id, entity => ({
      fields: arrayUpdate(entity.fields, f => f.id === field.id, field)
    }));
  }

  removeAllFields(id: ID) {
    this.update(id, { fields: [] });
  }

  clearForm(id: ID) {
    this.update(id, { fields: [], name: '' });
  }

  deleteForm(id: ID) {
    this.remove(id);
  }

  publishForm(id: ID) {
    this.update(id, { published: true });
  }

  cloneForm(id: ID) {
    const toCopy = this.query.getEntity(id);
    this.add({
      ...toCopy,
      ...{
        id: guid(),
        published: false,
        name: `Cópia de ${toCopy.name}`
      }
    });
  }
}
