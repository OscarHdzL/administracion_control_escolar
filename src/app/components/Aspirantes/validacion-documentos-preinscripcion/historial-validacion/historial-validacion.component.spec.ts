import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialValidacionComponent } from './historial-validacion.component';

describe('HistorialValidacionComponent', () => {
  let component: HistorialValidacionComponent;
  let fixture: ComponentFixture<HistorialValidacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialValidacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialValidacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
