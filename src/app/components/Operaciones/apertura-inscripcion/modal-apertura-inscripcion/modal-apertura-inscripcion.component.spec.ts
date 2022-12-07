import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAperturaInscripcionComponent } from './modal-apertura-inscripcion.component';

describe('ModalAperturaInscripcionComponent', () => {
  let component: ModalAperturaInscripcionComponent;
  let fixture: ComponentFixture<ModalAperturaInscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAperturaInscripcionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAperturaInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
