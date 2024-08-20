import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../service/api.service.js';
import { CategoriasTableComponent } from '../cat-table/cat-table.component.js';
import { CategoriaCreatedOrModifiedService } from '../cat-created-or-modified/cat.service.js';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaFormComponent } from '../cat-form/cat-form.component.js';

@Component({
  selector: 'app-cat',
  standalone: true,
  templateUrl: './cat.component.html',
  styleUrl: './cat.component.scss',
  imports: [CommonModule, HttpClientModule, CategoriasTableComponent],
  providers: [ApiService],
})
export class CategoriasComponent implements OnInit {
  categorias: any[] = [];
  private subscription?: Subscription;

  constructor(
    private apiService: ApiService,
    private categoriaCreatedOrModifiedService: CategoriaCreatedOrModifiedService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.fillData();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onCategoriaDeleted(categoriaId: number): void {
    this.categorias = this.categorias.filter(
      (categoria) => categoria.id !== categoriaId
    );
  }

  fillData() {
    this.subscription =
      this.categoriaCreatedOrModifiedService.categoriaCreatedOrModified.subscribe(
        () => {
          this.loadData();
        }
      );

    if (!this.categoriaCreatedOrModifiedService.isDataLoaded) {
      this.loadData();
    }
  }

  loadData() {
    this.apiService.getAll('categorias').subscribe((response: any) => {
      this.categorias = response.data;
    });
  }

  newCategoria() {
    const modalRef = this.modalService.open(CategoriaFormComponent, {
      size: 'l',
      centered: true,
    });
    modalRef.componentInstance.title = 'Nueva Categoría';
  }
}
