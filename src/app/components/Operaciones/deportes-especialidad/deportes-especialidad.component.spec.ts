import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeportesEspecialidadComponent } from './deportes-especialidad.component';

describe('DeportesEspecialidadComponent', () => {
  let component: DeportesEspecialidadComponent;
  let fixture: ComponentFixture<DeportesEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeportesEspecialidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeportesEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
