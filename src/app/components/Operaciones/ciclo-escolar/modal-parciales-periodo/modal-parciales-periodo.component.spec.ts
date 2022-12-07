import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalParcialesPeriodoComponent } from './modal-parciales-periodo.component';

describe('ModalParcialesPeriodoComponent', () => {
  let component: ModalParcialesPeriodoComponent;
  let fixture: ComponentFixture<ModalParcialesPeriodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalParcialesPeriodoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalParcialesPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
