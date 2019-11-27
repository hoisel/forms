import { NgModule } from '@angular/core';
import { SharedModule } from '@edocsforms/shared';
import { DialogService } from 'primeng/api';

import { Components, EntryComponents } from './components';
import { Containers } from './containers';
import { FormsRoutingModule } from './forms-routing.module';

@NgModule({
  imports: [SharedModule, FormsRoutingModule],
  declarations: [...Containers, ...Components, ...EntryComponents],
  entryComponents: [...EntryComponents],
  providers: [DialogService] // ! mesmo module onde são definidos entryComponents usados por DialogService
})
export class FormsModule {}
