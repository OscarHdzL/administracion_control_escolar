import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDeportesEspecialidadComponent } from './modal-deportes-especialidad.component';

describe('ModalDeportesEspecialidadComponent', () => {
  let component: ModalDeportesEspecialidadComponent;
  let fixture: ComponentFixture<ModalDeportesEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDeportesEspecialidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDeportesEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
