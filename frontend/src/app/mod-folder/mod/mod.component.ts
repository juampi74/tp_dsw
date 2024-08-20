import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../service/api.service.js';
import { ModelosTableComponent } from '../mod-table/mod-table.component.js';
import { ModeloCreatedOrModifiedService } from '../mod-created-or-modified/mod.service.js';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModeloFormComponent } from '../mod-form/mod-form.component.js';

@Component({
  selector: 'app-mod',
  standalone: true,
  templateUrl: './mod.component.html',
  styleUrl: './mod.component.scss',
  imports: [CommonModule, HttpClientModule, ModelosTableComponent],
  providers: [ApiService],
})
export class ModelosComponent implements OnInit {
  modelos: any[] = [];
  private subscription?: Subscription;

  constructor(
    private apiService: ApiService,
    private modeloCreatedOrModifiedService: ModeloCreatedOrModifiedService,
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

  onModeloDeleted(modeloId: number): void {
    this.modelos = this.modelos.filter((modelo) => modelo.id !== modeloId);
  }

  fillData() {
    this.subscription =
      this.modeloCreatedOrModifiedService.modeloCreatedOrModified.subscribe(
        () => {
          this.loadData();
        }
      );

    if (!this.modeloCreatedOrModifiedService.isDataLoaded) {
      this.loadData();
    }
  }

  loadData() {
    this.apiService.getAll('modelos').subscribe((response: any) => {
      this.modelos = response.data;
    });
  }

  newModelo() {
    const modalRef = this.modalService.open(ModeloFormComponent, {
      size: 'l',
      centered: true,
    });
    modalRef.componentInstance.title = 'Nuevo Modelo';
  }
}
