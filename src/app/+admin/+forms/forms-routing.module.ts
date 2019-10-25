import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateFormComponent } from './containers/create-form/create-form.component';

const routes: Routes = [
  {
    path: '',
    component: CreateFormComponent,
    data: { title: 'Admin | Criar Formulário' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule {}
