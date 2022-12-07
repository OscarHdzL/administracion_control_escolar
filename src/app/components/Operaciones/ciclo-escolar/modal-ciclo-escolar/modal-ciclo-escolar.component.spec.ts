import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCicloEscolarComponent } from './modal-ciclo-escolar.component';

describe('ModalCicloEscolarComponent', () => {
  let component: ModalCicloEscolarComponent;
  let fixture: ComponentFixture<ModalCicloEscolarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCicloEscolarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCicloEscolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
