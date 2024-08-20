import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../service/api.service.js';
import { ColorsTableComponent } from '../col-table/col-table.component.js';
import { ColorCreatedOrModifiedService } from '../col-created-or-modified/col.service.js';
import { Subscription } from 'rxjs';
import { ColorFormComponent } from '../col-form/col-form.component.js';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-col',
  standalone: true,
  templateUrl: './col.component.html',
  styleUrls: ['./col.component.scss'],
  imports: [CommonModule, HttpClientModule, ColorsTableComponent],
  providers: [ApiService],
})
export class ColorsComponent implements OnInit {
  colors: any[] = []; // Lista de colores a mostrar en la vista
  private subscription?: Subscription;

  constructor(
    private apiService: ApiService, // Servicio para interactuar con la API
    private colorCreatedOrModifiedService: ColorCreatedOrModifiedService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    // Se ejecuta al inicializar el componente
    this.fillData(); // Llama al método para llenar los datos de colores
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onColorDeleted(colorId: number): void {
    // Maneja la eliminación de un color
    this.colors = this.colors.filter((color) => color.id !== colorId);
    // Filtra la lista de marcas para eliminar la marca cuyo ID coincide con marcaId
  }

  fillData() {
    this.subscription =
      this.colorCreatedOrModifiedService.colorCreatedOrModified.subscribe(
        () => {
          this.loadData();
        }
      );

    if (!this.colorCreatedOrModifiedService.isDataLoaded) {
      this.loadData();
    }
  }

  loadData() {
    this.apiService.getAll('colores').subscribe((response: any) => {
      this.colors = response.data;
    });
  }

  newColor() {
    const modalRef = this.modalService.open(ColorFormComponent, {
      size: 'l',
      centered: true,
    });
    modalRef.componentInstance.title = 'Nuevo Color';
  }
}
