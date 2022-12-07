import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarAspirantesComponent } from './seleccionar-aspirantes.component';

describe('SeleccionarAspirantesComponent', () => {
  let component: SeleccionarAspirantesComponent;
  let fixture: ComponentFixture<SeleccionarAspirantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarAspirantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarAspirantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
