import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarAspirantesPosgradoComponent } from './seleccionar-aspirantes-posgrado.component';

describe('SeleccionarAspirantesPosgradoComponent', () => {
  let component: SeleccionarAspirantesPosgradoComponent;
  let fixture: ComponentFixture<SeleccionarAspirantesPosgradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarAspirantesPosgradoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarAspirantesPosgradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
