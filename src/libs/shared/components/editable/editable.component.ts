import {
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, switchMapTo, take, takeUntil } from 'rxjs/operators';

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

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[viewMode]'
})
export class ViewModeDirective {
  constructor(public tpl: TemplateRef<any>) {}
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[editMode]'
})
export class EditModeDirective {
  constructor(public tpl: TemplateRef<any>) {}
}

@Component({
  selector: 'editable',
  template: `
    <ng-container *ngTemplateOutlet="currentView"></ng-container>
  `,
  styleUrls: ['./editable.component.scss']
})
export class EditableComponent implements OnInit, OnDestroy {
  @ContentChild(ViewModeDirective, { static: false }) viewModeTpl: ViewModeDirective;
  @ContentChild(EditModeDirective, { static: false }) editModeTpl: EditModeDirective;
  @Output() update = new EventEmitter();
  destroyed$$ = new Subject();

  private readonly editMode = new Subject();
  readonly editMode$ = this.editMode.asObservable();

  mode: 'view' | 'edit' = 'view';

  /**
   *
   */
  get currentView() {
    return this.mode === 'view' ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
  }

  /**
   *
   */
  constructor(private host: ElementRef) {}

  /**
   *
   */
  ngOnInit() {
    this.viewModeHandler();
    this.editModeHandler();
  }

  /**
   *
   */
  ngOnDestroy() {}

  /**
   *
   */
  toViewMode() {
    this.update.next();
    this.mode = 'view';
  }

  /**
   *
   */
  private get element() {
    return this.host.nativeElement;
  }

  /**
   *
   */
  private viewModeHandler() {
    fromEvent(this.element, 'dblclick')
      .pipe(takeUntil(this.destroyed$$))
      .subscribe(() => {
        this.mode = 'edit';
        this.editMode.next(true);
      });
  }

  /**
   *
   */
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
}
