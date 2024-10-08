import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsTableComponent } from './cli-table.component.js';

describe('ClientsTableComponent', () => {
  let component: ClientsTableComponent;
  let fixture: ComponentFixture<ClientsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
