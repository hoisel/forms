import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';

import { Form } from './form.model';
import { FormsStore } from './forms.store';

@Injectable({ providedIn: 'root' })
export class FormsService {
  constructor(private formsStore: FormsStore, private http: HttpClient) {}

  get() {
    return this.http.get<Form[]>('https://api.com').pipe(
      tap(entities => {
        this.formsStore.set(entities);
      })
    );
  }

  add(form: Form) {
    this.formsStore.add(form);
  }

  update(id, form: Partial<Form>) {
    this.formsStore.update(id, form);
  }

  remove(id: ID) {
    this.formsStore.remove(id);
  }
}
