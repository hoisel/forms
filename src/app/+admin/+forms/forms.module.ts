import { NgModule } from '@angular/core';
import { SharedModule } from '@edocsforms/shared';

import { Components, EntryComponents } from './components';
import { Containers } from './containers';
import { FormsRoutingModule } from './forms-routing.module';

@NgModule({
  imports: [SharedModule, FormsRoutingModule],
  declarations: [...Containers, ...Components],
  entryComponents: [...EntryComponents]
})
export class FormsModule {}
