import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorFormComponent } from './col-form.component.js';

describe('ColorFormComponent', () => {
  let component: ColorFormComponent;
  let fixture: ComponentFixture<ColorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
