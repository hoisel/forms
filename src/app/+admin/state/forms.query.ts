import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { FormsState, FormsStore } from './forms.store';

@Injectable({ providedIn: 'root' })
export class FormsQuery extends QueryEntity<FormsState> {
  constructor(protected store: FormsStore) {
    super(store);
  }
}
