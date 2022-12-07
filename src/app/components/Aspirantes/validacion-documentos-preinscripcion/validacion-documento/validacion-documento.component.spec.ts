import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionDocumentoComponent } from './validacion-documento.component';

describe('ValidacionDocumentoComponent', () => {
  let component: ValidacionDocumentoComponent;
  let fixture: ComponentFixture<ValidacionDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidacionDocumentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidacionDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
