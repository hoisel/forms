import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { clone } from '@edocsforms/core';
import {
  CalendarField,
  CheckboxField,
  EmailField,
  FieldTypeName,
  InputField,
  InputSwitchField,
  PasswordField,
  RadioField,
  SelectField,
  SetorField,
  TextareaField,
  TextField,
  ToggleButtonField
} from '@edocsforms/shared';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';

@Component({
  selector: 'edit-field',
  templateUrl: './edit-field.component.html',
  styleUrls: ['./edit-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditFieldComponent implements OnInit {
  model = {};
  form = new FormGroup({});
  fields: FormlyFieldConfig[];

  /**
   *
   */
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {}

  /**
   *
   */
  ngOnInit() {
    // clone avoid mutate original object and commit only whe submit button is clicked
    this.model = clone(this.config.data);
    this.fields = [
      {
        ...TextField.create('key', {
          label: 'Name',
          placeholder: 'name',
          tooltip: 'Nome do campo que será submetido no formulário',
          required: true
        }),
        className: 'name-field'
      },
      {
        key: 'templateOptions',
        fieldGroupClassName: 'lg',
        fieldGroup: [...this.createFields(this.config.data.type)]
      }
    ];
  }

  /**
   *
   */
  submit() {
    if (this.form.valid) {
      this.ref.close(this.model);
    }
  }

  /**
   *
   */
  private createFields = (type: FieldTypeName) => {
    if (type === 'calendar') {
      return CalendarField.getEditForm();
    } else if (type === 'password') {
      return PasswordField.getEditForm();
    } else if (type === 'textarea') {
      return TextareaField.getEditForm();
    } else if (type === 'input-switch') {
      return InputSwitchField.getEditForm();
    } else if (type === 'input') {
      return InputField.getEditForm();
    } else if (type === 'email') {
      return EmailField.getEditForm();
    } else if (type === 'checkbox') {
      return CheckboxField.getEditForm();
    } else if (type === 'radio') {
      return RadioField.getEditForm();
    } else if (type === 'select') {
      return SelectField.getEditForm();
    } else if (type === 'toggle-button') {
      return ToggleButtonField.getEditForm();
    } else if (type === 'setor') {
      return SetorField.getEditForm();
    }
  };
}
