import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ID } from '@datorama/akita';
import { ConfirmationService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';

import { Form, FormsQuery, FormsService } from '../../state';

@Component({
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.scss']
})
export class FormsListComponent implements OnInit, OnDestroy {
  private destroyed$$ = new Subject();
  forms$: Observable<Form[]> = this.query.selectAll();

  /**
   *
   */
  constructor(
    private query: FormsQuery,
    private forms: FormsService,
    private router: Router,
    private confirmationService: ConfirmationService
  ) {}

  /**
   *
   */
  ngOnInit() {}

  /**
   *
   */
  ngOnDestroy() {
    this.destroyed$$.next();
    this.destroyed$$.complete();
  }

  /**
   *
   */
  goToForm = (id: ID) => {
    this.forms.setActive(id);
    this.router.navigate(['/admin/formularios/novo']);
  };

  /**
   *
   */
  cloneForm = (id: ID) => {
    this.forms.cloneForm(id);
  };

  /**
   *
   */
  confirmPublishForm = (form: Form) => {
    this.confirmationService.confirm({
      message: `Deseja mesmo excluir o formulário ${form.name}? Essa ação é irrevesível e bloqueará a edição do formulário`,
      accept: () => {
        this.publishForm(form.id);
      }
    });
  };

  /**
   *
   */
  confirmDeleteForm = (form: Form) => {
    this.confirmationService.confirm({
      message: `Deseja mesmo excluir o formulário ${form.name}?`,
      accept: () => {
        this.deleteForm(form.id);
      }
    });
  };

  /**
   *
   */
  private deleteForm = (id: ID) => {
    this.forms.deleteForm(id);
  };

  /**
   *
   */
  private publishForm = (id: ID) => {
    this.forms.publishForm(id);
  };
}
