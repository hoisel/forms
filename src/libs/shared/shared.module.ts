import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { CalendarModule } from 'primeng/calendar';
import { DragDropModule } from 'primeng/dragdrop';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';

import { FormsConfig, FormTypes } from './forms/forms.config';

const Primeng = [DragDropModule, TableModule, CalendarModule, DynamicDialogModule, ToastModule];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    Primeng,
    FormlyModule.forRoot(),
    FormlyModule.forChild(FormsConfig),
    /**
     * - Bootstrap:    FormlyBootstrapModule
     * - Material2:    FormlyMaterialModule
     * - Ionic:        FormlyIonicModule
     * - PrimeNG:      FormlyPrimeNGModule
     * - Kendo:        FormlyKendoModule
     * - NativeScript: FormlyNativescriptModule
     */
    FormlyPrimeNGModule
  ],
  declarations: [...FormTypes],
  exports: [CommonModule, ...Primeng, FormlyModule]
})
export class SharedModule {}
