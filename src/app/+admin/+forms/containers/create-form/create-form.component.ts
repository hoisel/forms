import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  CalendarField,
  CheckboxField,
  EmailField,
  InputSwitchField,
  PasswordField,
  RadioField,
  SelectField,
  TextareaField,
  TextField,
  ToggleButtonField
} from '@edocsforms/shared';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DialogService, MessageService } from 'primeng/api';

import { EditFieldComponent } from '../../components';

const cloneField = (field: FormlyFieldConfig) => ({
  ...field,
  templateOptions: { ...field.templateOptions }
});

class SelectableField {
  guid: symbol;
  item: FormlyFieldConfig;

  static create(field: FormlyFieldConfig) {
    return {
      guid: Symbol(),
      // !important: deepclone
      item: cloneField(field)
    };
  }
}

interface Form {
  name: string;
  fields: FormlyFieldConfig[];
}

const mockedFields: FormlyFieldConfig[] = [
  CalendarField.create('data', {
    label: 'Data',
    placeholder: 'Data',
    required: true,
    inline: false
  }),
  TextField.create('texto', {
    label: 'Texto',
    required: true
  }),
  EmailField.create('email', {
    label: 'Email',
    placeholder: 'Digite seu email',
    required: true
  }),
  ToggleButtonField.create('toggleButton', {
    label: 'Toggle Button',
    required: true
  }),
  InputSwitchField.create('inputSwitch', {
    label: 'Input Switch',
    required: true
  }),
  PasswordField.create('password', {
    label: 'Senha',
    placeholder: 'Digite sua senha',
    required: true
  }),
  SelectField.create('select', {
    label: 'Lista',
    required: true
  }),
  TextareaField.create('textarea', {
    label: 'Textarea',
    placeholder: 'Textarea',
    required: true
  }),
  RadioField.create('radio', {
    label: 'Radio Button',
    required: true
  }),
  CheckboxField.create('checkbox', {
    label: 'Checkbox',
    required: true
  })
];

@Component({
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService, MessageService]
})
export class CreateFormComponent implements OnInit {
  form = new FormGroup({});
  model = {};
  selectedFields: SelectableField[];
  availableFields: SelectableField[] = mockedFields.map(field => SelectableField.create(field));
  dragged: SelectableField;
  get fields(): FormlyFieldConfig[] {
    return this.selectedFields.map(f => f.item);
  }

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
    private cd: ChangeDetectorRef
  ) {}

  /**
   *
   */
  ngOnInit() {
    this.removeAll();
  }

  /**
   *
   */
  dragStart(event, field: SelectableField) {
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
      const selected = SelectableField.create(this.dragged.item);
      const alreadySelected = this.selectedFields.find(f => f.item.key === selected.item.key);
      if (!alreadySelected) {
        this.selectedFields = [...this.selectedFields, SelectableField.create(this.dragged.item)];
      } else {
        this.messageService.add({ severity: 'warn', summary: `Já existe um campo ${selected.item.key}` });
      }

      this.dragged = null;
    }
  }

  /**
   *
   */
  select(field: SelectableField) {
    this.dragged = field;
    this.drop();
  }

  /**
   *
   */
  remove(field: SelectableField) {
    this.selectedFields = this.selectedFields.filter(f => f.guid !== field.guid);
  }

  /**
   *
   */
  removeAll() {
    this.selectedFields = [];
  }

  /**
   *
   */
  editField(field: SelectableField) {
    const label = field.item.templateOptions.label;

    const ref = this.dialogService.open(EditFieldComponent, {
      header: `Editar campo ${label}`,
      width: '70%',
      data: cloneField(field.item),
      style: { 'max-width': '800px' },
      contentStyle: { 'max-width': '800px', 'min-height': '800px', overflow: 'auto' }
    });

    ref.onClose.subscribe((edited: FormlyFieldConfig) => {
      if (edited) {
        this.replaceField(field.guid, edited);

        if (field.item.key !== edited.key) {
          this.model = {};
        }

        this.messageService.add({ severity: 'info', summary: label, detail: 'Campo atualizado' });
        this.cd.detectChanges();
      }
    });
  }

  /**
   * Replace item with specified guid with new field config
   */
  private replaceField = (guid: symbol, field: FormlyFieldConfig) => {
    // tslint:disable-next-line:no-shadowed-variable
    const indexOldElement = this.selectedFields.findIndex(({ guid }) => guid === guid);
    this.selectedFields = Object.assign([...this.selectedFields], {
      [indexOldElement]: { guid, item: field }
    });
  };
}
