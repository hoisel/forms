import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlySelectModule } from '@ngx-formly/core/select';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { DragDropModule } from 'primeng/dragdrop';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from 'primeng/password';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TooltipModule } from 'primeng/tooltip';

import { Components, Directives } from './common';
import { FormsConfig, FormTypes } from './forms/forms.config';

const Primeng = [
  SelectButtonModule,
  DragDropModule,
  InputSwitchModule,
  CalendarModule,
  DynamicDialogModule,
  ToggleButtonModule,
  ToastModule,
  ButtonModule,
  CheckboxModule,
  RadioButtonModule,
  DropdownModule,
  PasswordModule,
  InputTextareaModule,
  TooltipModule
];

const Formly = [FormlyModule, FormlySelectModule];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ...Primeng,
    ...Formly,
    FormlyModule.forRoot(),
    FormlyModule.forChild(FormsConfig)
  ],
  declarations: [...FormTypes, ...Directives, ...Components],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, ...Directives, ...Components, ...Primeng, ...Formly]
})
export class SharedModule {}
