import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../service/api.service.js';
import { MarcasTableComponent } from '../mar-table/mar-table.component.js';
import { MarcaCreatedOrModifiedService } from '../mar-created-or-modified/mar.service.js';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarcaFormComponent } from '../mar-form/mar-form.component.js';

@Component({
  selector: 'app-mar',
  standalone: true,
  templateUrl: './mar.component.html',
  styleUrls: ['./mar.component.scss'],
  imports: [CommonModule, HttpClientModule, MarcasTableComponent],
  providers: [ApiService],
})
export class MarcasComponent implements OnInit {
  marcas: any[] = []; // Lista de marcas a mostrar en la vista
  private subscription?: Subscription;

  constructor(
    private apiService: ApiService, // Servicio para interactuar con la API
    private marcaCreatedOrModifiedService: MarcaCreatedOrModifiedService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    // Se ejecuta al inicializar el componente
    this.fillData(); // Llama al método para llenar los datos de marcas
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onMarcaDeleted(marcaId: number): void {
    // Maneja la eliminación de una marca
    this.marcas = this.marcas.filter((marca) => marca.id !== marcaId);
    // Filtra la lista de marcas para eliminar la marca cuyo ID coincide con marcaId
  }

  fillData() {
    this.subscription =
      this.marcaCreatedOrModifiedService.marcaCreatedOrModified.subscribe(
        () => {
          this.loadData();
        }
      );

    if (!this.marcaCreatedOrModifiedService.isDataLoaded) {
      this.loadData();
    }
  }

  loadData() {
    this.apiService.getAll('marcas').subscribe((response: any) => {
      this.marcas = response.data;
    });
  }

  newMarca() {
    const modalRef = this.modalService.open(MarcaFormComponent, {
      size: 'l',
      centered: true,
    });
    modalRef.componentInstance.title = 'Nueva Marca';
  }
}
