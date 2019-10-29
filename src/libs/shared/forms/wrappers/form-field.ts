import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-primeng-form-field',
  template: `
    <div class="mx-2 my-2">
      <div *ngIf="to.label && to.hideLabel !== true" class="ui-widget">
        <label [for]="id">
          {{ to.label }}
          <span *ngIf="to.required && to.hideRequiredMarker !== true">*</span>
        </label>
        <div *ngIf="to.tooltip" class="float-right" [pTooltip]="to.tooltip"><i class="far fa-question-circle"></i></div>
      </div>
      <div>
        <ng-container #fieldComponent></ng-container>
      </div>
      <div class="ui-message ui-messages-error" *ngIf="showError">
        <formly-validation-message [field]="field"></formly-validation-message>
      </div>
    </div>
  `,
  styles: [
    `
      .ui-messages-error {
        margin: 0;
        margin-top: 4px;
      }
    `
  ]
})
// tslint:disable-next-line:component-class-suffix
export class FormlyWrapperFormField extends FieldWrapper {}
