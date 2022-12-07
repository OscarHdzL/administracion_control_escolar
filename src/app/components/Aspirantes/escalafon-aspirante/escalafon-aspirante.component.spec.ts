import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalafonAspiranteComponent } from './escalafon-aspirante.component';

describe('EscalafonAspiranteComponent', () => {
  let component: EscalafonAspiranteComponent;
  let fixture: ComponentFixture<EscalafonAspiranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscalafonAspiranteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscalafonAspiranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
