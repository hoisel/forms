import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyTemplateOptions } from '@ngx-formly/core';
import { DialogService, MessageService } from 'primeng/api';

import { EditFieldComponent } from '../../components';

// interface InputFsield {
//   id: number;
//   displayName: string;
// }

class SelectableItem<T> {
  guid: symbol;
  item: T;

  static create<T>(item: T) {
    return {
      guid: Symbol(),
      item
    };
  }
}

type FieldType = 'calendar' | 'setor' | 'approval' | 'input' | 'textarea' | 'select' | 'checkbox' | 'radio';

abstract class BaseField {
  type: FieldType;
}

class CalendarField extends BaseField {
  type: 'calendar';
  key: string;
  templateOptions: Pick<FormlyTemplateOptions, 'label' | 'placeholder' | 'required'>;
}

class InputField extends BaseField {
  type: 'input';
  key: string;
  templateOptions: Pick<FormlyTemplateOptions, 'label' | 'placeholder' | 'required'>;
}

class TextareaField extends BaseField {
  type: 'textarea';
  key: string;
  templateOptions: FormlyTemplateOptions;
}

class SelectField extends BaseField {
  type: 'select';
  key: string;
  templateOptions: FormlyTemplateOptions;
}

class CheckboxField extends BaseField {
  type: 'checkbox';
  key: string;
  templateOptions: FormlyTemplateOptions;
}

class RadioField extends BaseField {
  type: 'radio';
  key: string;
  templateOptions: FormlyTemplateOptions;
}

type FormField = CalendarField | InputField | TextareaField | SelectField | CheckboxField | RadioField;

const mockedFields: FormField[] = [
  {
    key: 'acceptDate',
    type: 'calendar',
    templateOptions: {
      label: 'Data',
      placeholder: 'Data de aceite',
      required: true
    }
  },
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      label: 'Nome',
      placeholder: 'Digite seu nome',
      required: true
    }
  },
  {
    key: 'description',
    type: 'textarea',
    templateOptions: {
      label: 'Textarea',
      placeholder: 'Descrição',
      required: true
    }
  },
  {
    key: 'confirm',
    type: 'radio',
    templateOptions: {
      label: 'Radio button',
      placeholder: 'Descrição',
      required: true
    }
  }
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
  model: Date;
  selectedFields: SelectableItem<FormField>[];
  availableFields: SelectableItem<FormField>[] = mockedFields.map(field => SelectableItem.create(field));
  dragged: SelectableItem<FormField>;
  get fields(): FormField[] {
    return this.selectedFields.map(f => f.item);
  }

  /**
   *
   */
  constructor(private dialogService: DialogService, public messageService: MessageService) {}

  /**
   *
   */
  ngOnInit() {
    this.removeAll();
  }

  /**
   *
   */
  dragStart(event, field: SelectableItem<FormField>) {
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
      this.selectedFields = [...this.selectedFields, SelectableItem.create(this.dragged.item)];
      this.dragged = null;
    }
  }

  /**
   *
   */
  select(field: SelectableItem<FormField>) {
    this.dragged = field;
    this.drop();
  }

  /**
   *
   */
  remove(field: SelectableItem<FormlyFieldConfig>) {
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
  editField(field: SelectableItem<FormlyFieldConfig>) {
    const label = field.item.templateOptions.label;

    const ref = this.dialogService.open(EditFieldComponent, {
      header: `Editar ${label}`,
      width: '70%',
      data: field.item,
      style: { 'max-width': '800px' },
      contentStyle: { 'max-width': '800px', overflow: 'auto' }
    });

    ref.onClose.subscribe((edited: FormlyFieldConfig) => {
      if (edited) {
        this.messageService.add({ severity: 'info', summary: label, detail: 'Campo atualizado' });
      }
    });
  }
}
