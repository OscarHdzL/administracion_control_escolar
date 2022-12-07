import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMateriaComponent } from './modal-materia.component';

describe('ModalMateriaComponent', () => {
  let component: ModalMateriaComponent;
  let fixture: ComponentFixture<ModalMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMateriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
