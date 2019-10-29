import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[];

  /**
   *
   */
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {}

  /**
   *
   */
  ngOnInit() {
    // console.log(f);
    // this.fields = [...this.createFields(this.config.data.type)];
    // this.model = this.config.data.templateOptions;

    this.model = this.config.data;
    this.fields = [
      {
        ...TextField.create('key', {
          label: 'Name',
          placeholder: 'name',
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
    }
  };
}
