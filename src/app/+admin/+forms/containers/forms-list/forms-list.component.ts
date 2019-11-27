import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ID } from '@datorama/akita';
import { memo } from 'helpful-decorators';
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
  ngOnInit() {
    this.forms.load().subscribe();
  }

  /**
   *
   */
  ngOnDestroy() {
    this.destroyed$$.next();
    this.destroyed$$.complete();
  }

  @memo()
  isLoading(id: ID) {
    return this.query.selectLoadingEntity(id);
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
    this.forms.clone(id).subscribe();
  };

  /**
   *
   */
  confirmPublishForm = (form: Form) => {
    this.confirmationService.confirm({
      message: `Deseja mesmo publicar o formulário ${form.name}? Essa ação é irrevesível e bloqueará a edição do formulário`,
      accept: () => {
        this.forms.publish(form.id).subscribe();
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
        this.forms.delete(form.id).subscribe();
      }
    });
  };
}
