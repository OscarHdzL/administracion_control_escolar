import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioHorarioComponent } from './calendario-horario.component';

describe('CalendarioHorarioComponent', () => {
  let component: CalendarioHorarioComponent;
  let fixture: ComponentFixture<CalendarioHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioHorarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
