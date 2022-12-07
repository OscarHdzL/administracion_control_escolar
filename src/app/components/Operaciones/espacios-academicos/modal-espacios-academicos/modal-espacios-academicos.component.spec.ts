import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEspaciosAcademicosComponent } from './modal-espacios-academicos.component';

describe('ModalEspaciosAcademicosComponent', () => {
  let component: ModalEspaciosAcademicosComponent;
  let fixture: ComponentFixture<ModalEspaciosAcademicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEspaciosAcademicosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEspaciosAcademicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
