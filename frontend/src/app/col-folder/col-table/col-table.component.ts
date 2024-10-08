import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Módulo para hacer solicitudes HTTP
import { ApiService } from '../../service/api.service.js'; // Servicio para manejar la API
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeletionComponent } from '../../shared/confirm-deletion/confirm-deletion.component.js';
import { FilterPipe } from '../../shared/filter/filter.pipe.js';
import { FormsModule } from '@angular/forms';
import { ColorFormComponent } from '../col-form/col-form.component.js';

@Component({
  selector: 'app-col-table',
  standalone: true, // Permite que el componente se use sin necesidad de un módulo Angular tradicional
  templateUrl: './col-table.component.html', // Ruta del archivo de plantilla HTML
  styleUrl: './col-table.component.scss', // Ruta del archivo de estilos SCSS
  imports: [
    CommonModule,
    HttpClientModule,
    ConfirmDeletionComponent,
    FilterPipe,
    FormsModule,
  ], // Importaciones necesarias para el componente
  providers: [ApiService], // Proporciona el servicio ApiService a este componente
})
export class ColorsTableComponent {
  @Input() colors!: any[]; // Entrada de datos: lista de colores
  @Output() colorDeleted = new EventEmitter(); // Evento que emite el ID de la marca eliminada
  filterRows = '';

  constructor(
    private apiService: ApiService, // Servicio para interactuar con la API
    private modalService: NgbModal
  ) {}

  // Método para navegar a la página de edición de una marca
  editColor(color: any): void {
    const modalRef = this.modalService.open(ColorFormComponent, {
      size: 'l',
      centered: true,
    });
    modalRef.componentInstance.title = 'Editar Color';
    modalRef.componentInstance.currentColorId = color.id;
  }

  // Método para eliminar una marca
  deleteColor(color: any): void {
    const modalRef = this.modalService.open(ConfirmDeletionComponent);
    modalRef.componentInstance.title = 'Eliminar color';
    modalRef.componentInstance.message = `¿Está seguro de que desea eliminar el color ${color.nombre}?`;

    modalRef.result.then(
      (result) => {
        if (result) {
          this.apiService
            .delete('colores', Number(color.id))
            .subscribe((response: any) => {
              this.colorDeleted.emit(color.id);
            });
        }
      },
      () => {}
    );
  }
}
