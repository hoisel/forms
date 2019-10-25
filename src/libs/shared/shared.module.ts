import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';
import { TableModule } from 'primeng/table';

import { Components } from './components';

const Primeng = [DragDropModule, TableModule];

@NgModule({
  imports: [CommonModule, Primeng],
  declarations: [...Components],
  exports: [CommonModule, Primeng, Components]
})
export class SharedModule {}
