import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AperturaInscripcionComponent } from './apertura-inscripcion.component';

describe('AperturaInscripcionComponent', () => {
  let component: AperturaInscripcionComponent;
  let fixture: ComponentFixture<AperturaInscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AperturaInscripcionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AperturaInscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
