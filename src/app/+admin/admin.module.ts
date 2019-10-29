import { NgModule } from '@angular/core';
import { SharedModule } from '@edocsforms/shared';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

@NgModule({
  imports: [SharedModule, AdminRoutingModule],
  declarations: [AdminComponent]
})
export class AdminModule {}
