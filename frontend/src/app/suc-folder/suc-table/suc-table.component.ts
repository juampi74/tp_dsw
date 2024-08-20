import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../service/api.service.js';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeletionComponent } from '../../shared/confirm-deletion/confirm-deletion.component.js';
import { FilterPipe } from '../../shared/filter/filter.pipe.js';
import { FormsModule } from '@angular/forms';
import { SucursalFormComponent } from '../suc-form/suc-form.component.js';

@Component({
  selector: 'app-suc-table',
  standalone: true,
  templateUrl: './suc-table.component.html',
  styleUrl: './suc-table.component.scss',
  imports: [
    CommonModule,
    HttpClientModule,
    ConfirmDeletionComponent,
    FilterPipe,
    FormsModule,
  ],
  providers: [ApiService],
})
export class SucursalesTableComponent {
  @Input() sucursales!: any[];
  @Output() sucursalDeleted = new EventEmitter();
  filterRows = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  editSucursal(sucursal: any): void {
    const modalRef = this.modalService.open(SucursalFormComponent, {
      size: 'l',
      centered: true,
    });
    modalRef.componentInstance.title = 'Editar Sucursal';
    modalRef.componentInstance.currentSucursalId = sucursal.id;
  }

  deleteSucursal(sucursal: any): void {
    const modalRef = this.modalService.open(ConfirmDeletionComponent);
    modalRef.componentInstance.title = 'Eliminar sucursal';
    modalRef.componentInstance.message = `¿Está seguro de que desea eliminar la sucursal ${sucursal.nombre}?`;

    modalRef.result.then(
      (result) => {
        if (result) {
          this.apiService
            .delete('sucursales', Number(sucursal.id))
            .subscribe((response: any) => {
              this.sucursalDeleted.emit(sucursal.id);
            });
        }
      },
      () => {}
    );
  }
}
