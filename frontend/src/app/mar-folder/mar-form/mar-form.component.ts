import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../service/api.service.js';
import { MarcaCreatedOrModifiedService } from '../mar-created-or-modified/mar.service.js';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mar-form',
  standalone: true,
  templateUrl: './mar-form.component.html',
  styleUrls: ['./mar-form.component.scss'],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  providers: [ApiService],
})
export class MarcaFormComponent implements OnInit {
  @Input() title: string = '';
  @Input() currentMarcaId: number = -1;
  action: string = '';

  constructor(
    private apiService: ApiService, // Servicio para interactuar con la API
    private marcaCreatedOrModifiedService: MarcaCreatedOrModifiedService,
    public activeModal: NgbActiveModal
  ) {}

  marcaForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.marcaCreatedOrModifiedService.isDataLoaded = false;

    // Se ejecuta al inicializar el componente
    if (this.currentMarcaId != -1) {
      // Si hay un ID en los parámetros, es una edición
      this.apiService
        .getOne('marcas', Number(this.currentMarcaId)) // Obtiene los datos de la marca por ID
        .subscribe((response: any) => {
          this.marcaForm.patchValue(response.data);
        });
      this.action = 'Edit'; // Establece la acción como 'Edit'
    } else {
      this.action = 'Create'; // Establece la acción como 'Create' si no hay ID
    }
  }

  onSubmit() {
    this.activeModal.close();
    if (this.action === 'Create') {
      // Si la acción es 'Create', llama al servicio para crear una nueva marca
      this.apiService
        .create('marcas', this.marcaForm.value)
        .subscribe((response: any) => {
          this.marcaCreatedOrModifiedService.notifyMarcaCreatedOrModified();
        });
    } else if (this.action === 'Edit') {
      // Si la acción es 'Edit', llama al servicio para actualizar la marca existente
      this.apiService
        .update('marcas', this.currentMarcaId, this.marcaForm.value)
        .subscribe((response: any) => {
          this.marcaCreatedOrModifiedService.notifyMarcaCreatedOrModified();
        });
    }
    this.marcaCreatedOrModifiedService.isDataLoaded = true;
  }
}
