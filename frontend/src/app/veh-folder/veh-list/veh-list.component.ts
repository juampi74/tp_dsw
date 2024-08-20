import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { VehicleCardComponent } from '../veh-card/veh-card.component.js';
import { ApiService } from '../../service/api.service.js';

@Component({
  selector: 'app-veh-list',
  standalone: true,
  templateUrl: './veh-list.component.html',
  styleUrl: './veh-list.component.scss',
  imports: [CommonModule, HttpClientModule, VehicleCardComponent],
  providers: [ApiService],
})
export class VehicleListComponent implements OnInit {
  response: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fillData();
  }

  fillData() {
    this.apiService.getAll('vehiculos').subscribe((response: any) => {
      this.response = response.data;
    });
  }
}
