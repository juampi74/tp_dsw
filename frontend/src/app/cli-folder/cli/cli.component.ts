import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../service/api.service.js';
import { ClientsTableComponent } from '../cli-table/cli-table.component.js';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientFormComponent } from '../cli-form/cli-form.component.js';
import { ClientCreatedOrModifiedService } from '../cli-created-or-modified/cli.service.js';

@Component({
  selector: 'app-cli',
  standalone: true,
  templateUrl: './cli.component.html',
  styleUrl: './cli.component.scss',
  imports: [CommonModule, HttpClientModule, ClientsTableComponent],
  providers: [ApiService],
})
export class ClientsComponent implements OnInit {
  clients: any[] = [];
  private subscription?: Subscription;

  constructor(
    private apiService: ApiService,
    private clientCreatedOrModifiedService: ClientCreatedOrModifiedService,
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

  onClientDeleted(clientId: number): void {
    this.clients = this.clients.filter((client) => client.id !== clientId);
  }

  fillData() {
    this.subscription =
      this.clientCreatedOrModifiedService.clientCreatedOrModified.subscribe(
        () => {
          this.loadData();
        }
      );

    if (!this.clientCreatedOrModifiedService.isDataLoaded) {
      this.loadData();
    }
  }

  loadData() {
    this.apiService.getAll('clientes').subscribe((response: any) => {
      this.clients = response.data;
    });
  }

  newClient() {
    const modalRef = this.modalService.open(ClientFormComponent, {
      size: 'l',
      centered: true,
    });
    modalRef.componentInstance.title = 'Nuevo Cliente';
  }
}
