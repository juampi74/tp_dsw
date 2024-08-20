import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalesTableComponent } from './suc-table.component.js';

describe('SucursalesTableComponent', () => {
  let component: SucursalesTableComponent;
  let fixture: ComponentFixture<SucursalesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SucursalesTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SucursalesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
