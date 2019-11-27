import { Injectable } from '@angular/core';
import { EntityUIQuery, filterNil, ID, QueryEntity } from '@datorama/akita';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { cloneField } from './forms.service';
import { FormsState, FormsStore, FormUIState } from './forms.store';

@Injectable({ providedIn: 'root' })
export class FormsQuery extends QueryEntity<FormsState> {
  ui: EntityUIQuery<FormUIState>;

  /**
   *
   */
  selectAvailableFields = () => this.select(s => s.availableFields);

  /**
   *
   */
  selectLoadingEntity(id: ID): Observable<boolean> {
    return this.ui.selectEntity(id, 'isLoading');
  }

  // !important: Sem clonar não funciona, não sei pq ainda
  selectActiveForm = () =>
    this.selectActive().pipe(
      filterNil,
      map(f => ({ ...f, fields: f.fields.map(cloneField) }))
    );

  /**
   *
   */
  constructor(protected store: FormsStore) {
    super(store);
    this.createUIQuery();
  }
}
