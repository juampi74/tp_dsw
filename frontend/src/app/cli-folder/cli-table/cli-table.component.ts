import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../service/api.service.js';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeletionComponent } from '../../shared/confirm-deletion/confirm-deletion.component.js';
import { FilterPipe } from '../../shared/filter/filter.pipe.js';
import { FormsModule } from '@angular/forms';
import { ClientFormComponent } from '../cli-form/cli-form.component.js';

@Component({
  selector: 'app-cli-table',
  standalone: true,
  templateUrl: './cli-table.component.html',
  styleUrl: './cli-table.component.scss',
  imports: [
    CommonModule,
    HttpClientModule,
    ConfirmDeletionComponent,
    FilterPipe,
    FormsModule,
  ],
  providers: [ApiService],
})
export class ClientsTableComponent {
  @Input() clients!: any[];
  @Output() clientDeleted = new EventEmitter();
  filterRows = '';

  constructor(private apiService: ApiService, private modalService: NgbModal) {}

  formatBirthDate(fechaNacimientoDB: string): string {
    let fechaNacimientoTable: string = '${day}/${month}/${year}';
    fechaNacimientoTable = fechaNacimientoTable.replace(
      '${month}',
      fechaNacimientoDB.substring(5, 7)
    );
    fechaNacimientoTable = fechaNacimientoTable.replace(
      '${day}',
      fechaNacimientoDB.substring(8, 10)
    );
    fechaNacimientoTable = fechaNacimientoTable.replace(
      '${year}',
      fechaNacimientoDB.substring(0, 4)
    );
    return fechaNacimientoTable;
  }

  editClient(client: any): void {
    const modalRef = this.modalService.open(ClientFormComponent, {
      size: 'l',
      centered: true,
    });
    modalRef.componentInstance.title = 'Editar Cliente';
    modalRef.componentInstance.currentClientId = client.id;
  }

  deleteClient(client: any): void {
    const modalRef = this.modalService.open(ConfirmDeletionComponent);
    modalRef.componentInstance.title = 'Eliminar cliente';
    modalRef.componentInstance.message = `¿Está seguro de que desea eliminar al cliente ${client.apellido}, ${client.nombre}?`;

    modalRef.result.then(
      (result) => {
        if (result) {
          this.apiService
            .delete('clientes', Number(client.id))
            .subscribe((response: any) => {
              this.clientDeleted.emit(client.id);
            });
        }
      },
      () => {}
    );
  }
}
