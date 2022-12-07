import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfigurarPeriodoEscolarComponent } from './modal-configurar-periodo-escolar.component';

describe('ModalConfigurarPeriodoEscolarComponent', () => {
  let component: ModalConfigurarPeriodoEscolarComponent;
  let fixture: ComponentFixture<ModalConfigurarPeriodoEscolarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConfigurarPeriodoEscolarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConfigurarPeriodoEscolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
