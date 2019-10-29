import { Component, ContentChild, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, switchMapTo, take, takeUntil } from 'rxjs/operators';

import { EditModeDirective } from './edit-mode.directive';
import { ViewModeDirective } from './view-mode.directive';

/**
 * Ref: https://netbasal.com/keeping-it-simple-implementing-edit-in-place-in-angular-4fd92c4dfc70
 */
@Component({
  selector: 'editable',
  template: `
    <ng-container *ngTemplateOutlet="currentView"></ng-container>
  `,
  styleUrls: ['./editable.component.scss']
})
export class EditableComponent implements OnInit, OnDestroy {
  private destroyed$$ = new Subject();
  @ContentChild(ViewModeDirective, { static: false }) viewModeTpl: ViewModeDirective;
  @ContentChild(EditModeDirective, { static: false }) editModeTpl: EditModeDirective;
  @Output() update = new EventEmitter();

  editMode = new Subject();
  editMode$ = this.editMode.asObservable();

  mode: 'view' | 'edit' = 'view';

  constructor(private host: ElementRef) {}

  ngOnInit() {
    this.viewModeHandler();
    this.editModeHandler();
  }

  ngOnDestroy() {
    this.destroyed$$.next();
    this.destroyed$$.complete();
  }

  toViewMode() {
    this.update.next();
    this.mode = 'view';
  }

  toEditMode() {
    this.mode = 'edit';
    this.editMode.next(true);
  }

  private get element() {
    return this.host.nativeElement;
  }

  private viewModeHandler() {
    fromEvent(this.element, 'dblclick')
      .pipe(takeUntil(this.destroyed$$))
      .subscribe(() => this.toEditMode());
  }

  private editModeHandler() {
    const clickOutside$ = fromEvent(document, 'click').pipe(
      filter(({ target }) => this.element.contains(target) === false),
      take(1)
    );

    this.editMode$
      .pipe(
        switchMapTo(clickOutside$),
        takeUntil(this.destroyed$$)
      )
      .subscribe(event => this.toViewMode());
  }

  get currentView() {
    return this.mode === 'view' ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
  }
}
