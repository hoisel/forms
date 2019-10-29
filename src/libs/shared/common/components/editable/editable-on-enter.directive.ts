import { Directive, HostListener } from '@angular/core';

import { EditableComponent } from './editable.component';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[editableOnEnter]'
})
export class EditableOnEnterDirective {
  constructor(private editable: EditableComponent) {}

  @HostListener('keyup.enter')
  onEnter() {
    this.editable.toViewMode();
  }
}
