import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DialogService, MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { EditFieldComponent } from '../../components';
import { Form, FormsQuery, FormsService } from '../../state';

@Component({
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CreateFormComponent implements OnInit, OnDestroy {
  private destroyed$$ = new Subject();
  formName = new FormControl('');
  activeForm$: Observable<Form>;
  availableFields$: Observable<FormlyFieldConfig[]>;
  selectedFields$: Observable<FormlyFieldConfig[]>;
  dragged: FormlyFieldConfig;
  selectedMode = '';
  previewModes = [
    { value: '', title: '1 coluna', icon: 'fas fa-fw fa-stop' },
    { value: 'md', title: '2 colunas', icon: 'fas fa-fw fa-th-large' },
    { value: 'lg', title: '3 colunas', icon: 'fas fa-fw fa-th' }
  ];

  /**
   *
   */
  constructor(
    private dialogService: DialogService,
    public messageService: MessageService,
    private query: FormsQuery,
    private forms: FormsService,
    private cd: ChangeDetectorRef
  ) {}

  /**
   *
   */
  ngOnInit() {
    this.availableFields$ = this.query.selectAvailableFields();
    this.activeForm$ = this.query.selectActiveForm();

    this.activeForm$.pipe(takeUntil(this.destroyed$$)).subscribe(form => {
      this.formName.setValue(form.name);
    });
  }

  ngOnDestroy() {
    this.destroyed$$.next();
    this.destroyed$$.complete();
  }

  /**
   *
   */
  dragStart(event, field: FormlyFieldConfig) {
    this.dragged = field;
  }

  /**
   *
   */
  dragEnd(event) {
    this.dragged = null;
  }

  /**
   *
   */
  drop() {
    if (this.dragged) {
      this.forms.addField(this.query.getActiveId(), this.dragged).subscribe();
      this.dragged = null;
    }
  }

  /**
   *
   */
  select(field: FormlyFieldConfig) {
    this.dragged = field;
    this.drop();
  }

  /**
   *
   */
  remove(field: FormlyFieldConfig) {
    this.forms.removeField(this.query.getActiveId(), field).subscribe();
  }

  /**
   *
   */
  removeAll() {
    this.forms.removeAllFields(this.query.getActiveId()).subscribe();
  }

  /**
   *
   */
  editField(field: FormlyFieldConfig) {
    const label = field.templateOptions.label;

    const ref = this.dialogService.open(EditFieldComponent, {
      header: `Editar campo ${label}`,
      width: '70%',
      data: field,
      style: { 'max-width': '800px' },
      contentStyle: { 'max-width': '800px', 'min-height': '800px', overflow: 'auto' }
    });

    ref.onClose.subscribe((edited: FormlyFieldConfig) => {
      if (edited) {
        this.forms.updateField(this.query.getActiveId(), edited).subscribe(() => {
          this.messageService.add({ severity: 'info', summary: label, detail: 'Campo atualizado' });
          this.cd.detectChanges();
        });
      }
    });
  }

  /**
   *
   */
  saveForm = (form: Form) => {
    console.log(JSON.stringify(this.query.getActive()));
  };

  /**
   *
   */
  clearForm = (form: Form) => {
    this.forms.clear(form.id).subscribe();
  };
}
