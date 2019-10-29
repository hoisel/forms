import { Directive, HostBinding } from '@angular/core';

/**
 * ref: https://stackoverflow.com/questions/50145270/hide-last-pass-icon-in-input-fields
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'input,textarea,select'
})
export class IgnoreLastpassDirective {
  @HostBinding('attr.data-lpignore') ignore = true;
}
