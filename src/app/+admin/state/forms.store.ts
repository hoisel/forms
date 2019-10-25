import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { Form } from './form.model';

export interface FormsState extends EntityState<Form> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'forms' })
export class FormsStore extends EntityStore<FormsState> {
  constructor() {
    super();
  }
}
