import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

interface InputField {
  id: number;
  displayName: string;
}

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

const mockedFields = [
  { id: 1, displayName: 'Setor' },
  { id: 2, displayName: 'Data' },
  { id: 3, displayName: 'Aprovação' }
];

@Component({
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateFormComponent implements OnInit {
  selectedFields: SelectableItem<InputField>[];
  availableFields: SelectableItem<InputField>[] = mockedFields.map(field => SelectableItem.create(field));
  dragged: SelectableItem<InputField>;

  ngOnInit() {
    this.removeAll();
  }

  dragStart(event, field: SelectableItem<InputField>) {
    this.dragged = field;
  }

  dragEnd(event) {
    this.dragged = null;
  }

  drop() {
    if (this.dragged) {
      this.selectedFields = [...this.selectedFields, SelectableItem.create(this.dragged.item)];
      this.dragged = null;
    }
  }

  select(field: SelectableItem<InputField>) {
    this.dragged = field;
    this.drop();
  }

  remove(field: SelectableItem<InputField>) {
    this.selectedFields = this.selectedFields.filter(f => f.guid !== field.guid);
  }

  removeAll() {
    this.selectedFields = [];
  }
}
