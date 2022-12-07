import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMateriaOptativaComponent } from './modal-materia-optativa.component';

describe('ModalMateriaOptativaComponent', () => {
  let component: ModalMateriaOptativaComponent;
  let fixture: ComponentFixture<ModalMateriaOptativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMateriaOptativaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMateriaOptativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
