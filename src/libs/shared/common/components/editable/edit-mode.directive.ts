import { Directive, TemplateRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[editMode]'
})
export class EditModeDirective {
  constructor(public tpl: TemplateRef<any>) {}
}
