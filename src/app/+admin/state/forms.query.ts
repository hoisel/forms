import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { filter, map } from 'rxjs/operators';

import { cloneField } from './forms.service';
import { FormsState, FormsStore } from './forms.store';

@Injectable({ providedIn: 'root' })
export class FormsQuery extends QueryEntity<FormsState> {
  availableFields$ = this.select(s => s.availableFields);

  // TODO !important: sem clona não funciona, nã sei pq
  activeForm$ = this.selectActive().pipe(
    filter(f => !!f),
    map(f => ({ ...f, fields: f.fields.map(cloneField) }))
  );

  /**
   *
   */
  constructor(protected store: FormsStore) {
    super(store);
  }
}
