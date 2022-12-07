import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioGrupoComponent } from './calendario-grupo.component';

describe('CalendarioGrupoComponent', () => {
  let component: CalendarioGrupoComponent;
  let fixture: ComponentFixture<CalendarioGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioGrupoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
