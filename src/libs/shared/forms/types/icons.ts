import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

import { createField, SelectTemplateOptions } from '../helpers';
import { InputSwitchField } from './input-switch';
import { TextField } from './text';

const primeicons = [
  { label: 'pi pi-align-justify', value: 'pi pi-align-justify' },
  { label: 'pi pi-align-left', value: 'pi pi-align-left' },
  { label: 'pi pi-align-right', value: 'pi pi-align-right' },
  { label: 'pi pi-android', value: 'pi pi-android' },
  { label: 'pi pi-angle-double-down', value: 'pi pi-angle-double-down' },
  { label: 'pi pi-angle-double-left', value: 'pi pi-angle-double-left' },
  { label: 'pi pi-angle-double-right', value: 'pi pi-angle-double-right' },
  { label: 'pi pi-angle-double-up', value: 'pi pi-angle-double-up' },
  { label: 'pi pi-angle-down', value: 'pi pi-angle-down' },
  { label: 'pi pi-angle-left', value: 'pi pi-angle-left' },
  { label: 'pi pi-angle-right', value: 'pi pi-angle-right' },
  { label: 'pi pi-angle-up', value: 'pi pi-angle-up' },
  { label: 'pi pi-apple', value: 'pi pi-apple' },
  { label: 'pi pi-arrow-circle-down', value: 'pi pi-arrow-circle-down' },
  { label: 'pi pi-arrow-circle-left', value: 'pi pi-arrow-circle-left' },
  { label: 'pi pi-arrow-circle-right', value: 'pi pi-arrow-circle-right' },
  { label: 'pi pi-arrow-circle-up', value: 'pi pi-arrow-circle-up' },
  { label: 'pi pi-arrow-down', value: 'pi pi-arrow-down' },
  { label: 'pi pi-arrow-left', value: 'pi pi-arrow-left' },
  { label: 'pi pi-arrow-right', value: 'pi pi-arrow-right' },
  { label: 'pi pi-arrow-up', value: 'pi pi-arrow-up' },
  { label: 'pi pi-ban', value: 'pi pi-ban' },
  { label: 'pi pi-bars', value: 'pi pi-bars' },
  { label: 'pi pi-bell', value: 'pi pi-bell' },
  { label: 'pi pi-bookmark', value: 'pi pi-bookmark' },
  { label: 'pi pi-briefcase', value: 'pi pi-briefcase' },
  { label: 'pi pi-calendar-minus', value: 'pi pi-calendar-minus' },
  { label: 'pi pi-calendar-plus', value: 'pi pi-calendar-plus' },
  { label: 'pi pi-calendar', value: 'pi pi-calendar' },
  { label: 'pi pi-calendar-times', value: 'pi pi-calendar-times' },
  { label: 'pi pi-camera', value: 'pi pi-camera' },
  { label: 'pi pi-caret-down', value: 'pi pi-caret-down' },
  { label: 'pi pi-caret-left', value: 'pi pi-caret-left' },
  { label: 'pi pi-caret-right', value: 'pi pi-caret-right' },
  { label: 'pi pi-caret-up', value: 'pi pi-caret-up' },
  { label: 'pi pi-chart-bar', value: 'pi pi-chart-bar' },
  { label: 'pi pi-check-circle', value: 'pi pi-check-circle' },
  { label: 'pi pi-check', value: 'pi pi-check' },
  { label: 'pi pi-chevron-circle-down', value: 'pi pi-hevron-circle-down' },
  { label: 'pi pi-chevron-circle-left', value: 'pi pi-hevron-circle-left' },
  { label: 'pi pi-chevron-circle-right', value: 'pi pi-hevron-circle-right' },
  { label: 'pi pi-chevron-circle-up', value: 'pi pi-hevron-circle-up' },
  { label: 'pi pi-chevron-down', value: 'pi pi-chevron-down' },
  { label: 'pi pi-chevron-left', value: 'pi pi-chevron-left' },
  { label: 'pi pi-chevron-right', value: 'pi pi-chevron-right' },
  { label: 'pi pi-chevron-up', value: 'pi pi-chevron-up' },
  { label: 'pi pi-clock', value: 'pi pi-clock' },
  { label: 'pi pi-clone', value: 'pi pi-clone' },
  { label: 'pi pi-cloud-download', value: 'pi pi-cloud-download' },
  { label: 'pi pi-cloud', value: 'pi pi-cloud' },
  { label: 'pi pi-cloud-upload', value: 'pi pi-cloud-upload' },
  { label: 'pi pi-cog', value: 'pi pi-cog' },
  { label: 'pi pi-comments', value: 'pi pi-comments' },
  { label: 'pi pi-comment', value: 'pi pi-comment' },
  { label: 'pi pi-copy', value: 'pi pi-copy' },
  { label: 'pi pi-dollar', value: 'pi pi-dollar' },
  { label: 'pi pi-download', value: 'pi pi-download' },
  { label: 'pi pi-eject', value: 'pi pi-eject' },
  { label: 'pi pi-ellipsis-h', value: 'pi pi-ellipsis-h' },
  { label: 'pi pi-ellipsis-v', value: 'pi pi-ellipsis-v' },
  { label: 'pi pi-envelope', value: 'pi pi-envelope' },
  { label: 'pi pi-exclamation-triangle', value: 'pi pi-exclamation-triangle' },
  { label: 'pi pi-external-link', value: 'pi pi-external-link' },
  { label: 'pi pi-eye-slash', value: 'pi pi-eye-slash' },
  { label: 'pi pi-eye', value: 'pi pi-eye' },
  { label: 'pi pi-file', value: 'pi pi-file' },
  { label: 'pi pi-filter', value: 'pi pi-filter' },
  { label: 'pi pi-folder-open', value: 'pi pi-folder-open' },
  { label: 'pi pi-folder', value: 'pi pi-folder' },
  { label: 'pi pi-globe', value: 'pi pi-globe' },
  { label: 'pi pi-google', value: 'pi pi-google' },
  { label: 'pi pi-heart', value: 'pi pi-heart' },
  { label: 'pi pi-home', value: 'pi pi-home' },
  { label: 'pi pi-images', value: 'pi pi-images' },
  { label: 'pi pi-image', value: 'pi pi-image' },
  { label: 'pi pi-inbox', value: 'pi pi-inbox' },
  { label: 'pi pi-info-circle', value: 'pi pi-info-circle' },
  { label: 'pi pi-info', value: 'pi pi-info' },
  { label: 'pi pi-key', value: 'pi pi-key' },
  { label: 'pi pi-list', value: 'pi pi-list' },
  { label: 'pi pi-lock-open', value: 'pi pi-lock-open' },
  { label: 'pi pi-lock', value: 'pi pi-lock' },
  { label: 'pi pi-map-marker', value: 'pi pi-map-marker' },
  { label: 'pi pi-microsoft', value: 'pi pi-microsoft' },
  { label: 'pi pi-minus-circle', value: 'pi pi-minus-circle' },
  { label: 'pi pi-minus', value: 'pi pi-minus' },
  { label: 'pi pi-mobile', value: 'pi pi-mobile' },
  { label: 'pi pi-money-bill', value: 'pi pi-money-bill' },
  { label: 'pi pi-paperclip', value: 'pi pi-paperclip' },
  { label: 'pi pi-pencil', value: 'pi pi-pencil' },
  { label: 'pi pi-plus-circle', value: 'pi pi-plus-circle' },
  { label: 'pi pi-plus', value: 'pi pi-plus' },
  { label: 'pi pi-power-off', value: 'pi pi-power-off' },
  { label: 'pi pi-print', value: 'pi pi-print' },
  { label: 'pi pi-question-circle', value: 'pi pi-question-circle' },
  { label: 'pi pi-question', value: 'pi pi-question' },
  { label: 'pi pi-radio-off', value: 'pi pi-radio-off' },
  { label: 'pi pi-radio-on', value: 'pi pi-radio-on' },
  { label: 'pi pi-refresh', value: 'pi pi-refresh' },
  { label: 'pi pi-replay', value: 'pi pi-replay' },
  { label: 'pi pi-save', value: 'pi pi-save' },
  { label: 'pi pi-share-alt', value: 'pi pi-share-alt' },
  { label: 'pi pi-shopping-cart', value: 'pi pi-shopping-cart' },
  { label: 'pi pi-sign-in', value: 'pi pi-sign-in' },
  { label: 'pi pi-sign-out', value: 'pi pi-sign-out' },
  { label: 'pi pi-sitemap', value: 'pi pisitemap' },
  { label: 'pi pi-sort-down', value: 'pi pi-sort-down' },
  { label: 'pi pi-sort', value: 'pi pi-sort' },
  { label: 'pi pi-sort-up', value: 'pi pi-sort-up' },
  { label: 'pi pi-spinner', value: 'pi pi-spinner' },
  { label: 'pi pi-star-o', value: 'pi pi-star-o' },
  { label: 'pi pi-star', value: 'pi pi-star' },
  { label: 'pi pi-step-backward', value: 'pi pi-step-backward' },
  { label: 'pi pi-step-forward', value: 'pi pi-step-forward' },
  { label: 'pi pi-table', value: 'pi pi-table' },
  { label: 'pi pi-tablet', value: 'pi pi-tablet' },
  { label: 'pi pi-tags', value: 'pi pi-tags' },
  { label: 'pi pi-tag', value: 'pi pi-tag' },
  { label: 'pi pi-th-large', value: 'pi pi-th-large' },
  { label: 'pi pi-times-circle', value: 'pi pi-times-circle' },
  { label: 'pi pi-times', value: 'pi pi-times' },
  { label: 'pi pi-trash', value: 'pi pi-trash' },
  { label: 'pi pi-unlock', value: 'pi pi-unlock' },
  { label: 'pi pi-upload', value: 'pi pi-upload' },
  { label: 'pi pi-user-minus', value: 'pi pi-user-minus' },
  { label: 'pi pi-user-plus', value: 'pi pi-user-plus' },
  { label: 'pi pi-users', value: 'pi pi-users' },
  { label: 'pi pi-user', value: 'pi pi-user' },
  { label: 'pi pi-video', value: 'pi pi-video' },
  { label: 'pi pi-volume-down', value: 'pi pi-volume-down' },
  { label: 'pi pi-volume-off', value: 'pi pi-volume-off' },
  { label: 'pi pi-volume-up', value: 'pi pi-volume-up' },
  { label: 'pi pi-wifi', value: 'pi pi-wifi' },
  { label: 'pi pi-window-maximize', value: 'pi pi-window-maximize' },
  { label: 'pi pi-window-minimize', value: 'pi pi-window-minimize' }
];

@Component({
  selector: 'formly-field-primeng-icon',
  styles: [
    `
      .pi {
        font-size: 2rem;
      }
    `
  ],
  template: `
    <p-dropdown
      [class.ng-dirty]="showError"
      [placeholder]="to.placeholder"
      [options]="to.options"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [showClear]="!to.required"
      (onChange)="to.change && to.change(field, $event)"
    >
      <ng-template let-icon pTemplate="selectedItem">
        <i class="pi {{ icon.value }}"></i>
      </ng-template>
      <ng-template let-icon pTemplate="item">
        <i class="pi {{ icon.value }}"></i>
      </ng-template>
    </p-dropdown>
  `
})
// tslint:disable-next-line:component-class-suffix
export class IconField extends FieldType {
  public static create(key: string, templateOptions?: SelectTemplateOptions, options?: any): FormlyFieldConfig {
    const defaults = {
      placeholder: 'Selecione...',
      tooltip: '',
      icon: 'fa-caret-square-down',
      options: primeicons
    };
    return createField('icon', key, { ...defaults, ...templateOptions }, options);
  }

  static getEditForm = () => [
    TextField.create('label', {
      label: 'Label',
      placeholder: 'Label',
      required: false
    }),
    TextField.create('placeholder', {
      label: 'Placeholder',
      placeholder: 'Placeholder',
      required: false
    }),
    TextField.create('tooltip', {
      label: 'Tooltip',
      placeholder: '',
      required: false
    }),
    InputSwitchField.create('required', {
      label: 'Obrigatório?',
      placeholder: 'Obrigatório?',
      required: true
    })
  ];
}
