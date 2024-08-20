import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../service/api.service.js';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeletionComponent } from '../../shared/confirm-deletion/confirm-deletion.component.js';
import { FilterPipe } from '../../shared/filter/filter.pipe.js';
import { FormsModule } from '@angular/forms';
import { CategoriaFormComponent } from '../cat-form/cat-form.component.js';

@Component({
  selector: 'app-cat-table',
  standalone: true,
  templateUrl: './cat-table.component.html',
  styleUrl: './cat-table.component.scss',
  imports: [
    CommonModule,
    HttpClientModule,
    ConfirmDeletionComponent,
    FilterPipe,
    FormsModule,
  ],
  providers: [ApiService],
})
export class CategoriasTableComponent {
  @Input() categorias!: any[];
  @Output() categoriaDeleted = new EventEmitter();
  filterRows = '';

  constructor(private apiService: ApiService, private modalService: NgbModal) {}

  editCategoria(categoria: any): void {
    const modalRef = this.modalService.open(CategoriaFormComponent, {
      size: 'l',
      centered: true,
    });
    modalRef.componentInstance.title = 'Editar Categoría';
    modalRef.componentInstance.currentCategoriaId = categoria.id;
  }

  deleteCategoria(categoria: any): void {
    const modalRef = this.modalService.open(ConfirmDeletionComponent);
    modalRef.componentInstance.title = 'Eliminar categoria';
    modalRef.componentInstance.message = `¿Está seguro de que desea eliminar la categoria ${categoria.nombre}?`;

    modalRef.result.then(
      (result) => {
        if (result) {
          this.apiService
            .delete('categorias', Number(categoria.id))
            .subscribe((response: any) => {
              this.categoriaDeleted.emit(categoria.id);
            });
        }
      },
      () => {}
    );
  }
}
