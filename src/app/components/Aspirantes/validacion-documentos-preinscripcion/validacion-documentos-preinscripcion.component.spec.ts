import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionDocumentosPreinscripcionComponent } from './validacion-documentos-preinscripcion.component';

describe('ValidacionDocumentosPreinscripcionComponent', () => {
  let component: ValidacionDocumentosPreinscripcionComponent;
  let fixture: ComponentFixture<ValidacionDocumentosPreinscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidacionDocumentosPreinscripcionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidacionDocumentosPreinscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
