import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateFormComponent } from './containers/create-form/create-form.component';
import { FormsListComponent } from './containers/forms-list/forms-list.component';

const routes: Routes = [
  {
    path: '',
    component: FormsListComponent,
    data: { title: 'Admin | Formulários' }
  },
  {
    path: 'novo',
    component: CreateFormComponent,
    data: { title: 'Admin | Criar Formulário' }
  },
  {
    path: 'editar/:id',
    component: CreateFormComponent,
    data: { title: 'Admin | Editar Formulário' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule {}
