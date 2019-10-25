import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'edit-field',
  templateUrl: './edit-field.component.html',
  styleUrls: ['./edit-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditFieldComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
