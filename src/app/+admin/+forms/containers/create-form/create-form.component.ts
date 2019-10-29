import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DialogService, MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Form, FormsQuery, FormsService } from 'src/app/+admin/state';

import { EditFieldComponent } from '../../components';

@Component({
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [DialogService, MessageService]
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
    this.availableFields$ = this.query.availableFields$;
    this.activeForm$ = this.query.activeForm$;

    this.activeForm$.pipe(takeUntil(this.destroyed$$)).subscribe(form => {
      this.formName.setValue(form.name);
    });

    const form = {
      name: '',
      id: '2ca6ff4394',
      fields: [
        {
          id: 'c5801c4b8a',
          type: 'input',
          key: 'texto',
          templateOptions: {
            icon: 'fa fa-font',
            label: 'Nome',
            required: true,
            placeholder: 'Digite seu nome...',
            disabled: false
          },
          wrappers: ['form-field'],
          hooks: {},
          modelOptions: {}
        },
        {
          id: '97dcb443aa',
          type: 'input',
          key: 'email',
          templateOptions: {
            type: 'email',
            label: 'Email do funcionário',
            placeholder: 'Digite seu email...',
            icon: 'fa-at',
            required: true,
            disabled: false
          },
          wrappers: ['form-field']
        }
      ]
    };

    // const form = { name: '', id: guid(), fields: [] };
    this.forms.add(form);
    this.forms.setActive(form.id);
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
      this.forms.addField(this.query.getActiveId(), this.dragged);
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
    this.forms.removeField(this.query.getActiveId(), field);
  }

  /**
   *
   */
  removeAll() {
    this.forms.removeAllFields(this.query.getActiveId());
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
        this.forms.updateField(this.query.getActiveId(), edited);
        this.messageService.add({ severity: 'info', summary: label, detail: 'Campo atualizado' });
        this.cd.detectChanges();
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
    this.forms.clearForm(form.id);
  };
}
