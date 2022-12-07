import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOfertaEducativaComponent } from './modal-oferta-educativa.component';

describe('ModalOfertaEducativaComponent', () => {
  let component: ModalOfertaEducativaComponent;
  let fixture: ComponentFixture<ModalOfertaEducativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOfertaEducativaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalOfertaEducativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
