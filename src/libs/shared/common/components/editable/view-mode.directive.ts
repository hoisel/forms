import { Directive, TemplateRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[viewMode]'
})
export class ViewModeDirective {
  constructor(public tpl: TemplateRef<any>) {}
}
