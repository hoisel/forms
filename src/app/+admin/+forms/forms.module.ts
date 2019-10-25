import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@edocsforms/shared';

import { CreateFormComponent } from './containers/create-form/create-form.component';
import { FormsRoutingModule } from './forms-routing.module';

@NgModule({
  imports: [FormsRoutingModule, CommonModule, SharedModule],
  declarations: [CreateFormComponent]
})
export class FormsModule {}
