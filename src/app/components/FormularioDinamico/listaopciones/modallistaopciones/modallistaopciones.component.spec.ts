import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModallistaopcionesComponent } from './modallistaopciones.component';

describe('ModallistaopcionesComponent', () => {
  let component: ModallistaopcionesComponent;
  let fixture: ComponentFixture<ModallistaopcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModallistaopcionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModallistaopcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
