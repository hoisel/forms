import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-primeng-datetime',
  template: `
    <p-calendar
      [class.ng-dirty]="showError"
      [formControl]="formControl"
      [formlyAttributes]="field"
      pInputTextarea
    ></p-calendar>
  `
})
// tslint:disable-next-line:component-class-suffix
export class FormlyFieldCalendar extends FieldType {}
