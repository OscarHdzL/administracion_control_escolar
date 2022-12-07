import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaciosAcademicosComponent } from './espacios-academicos.component';

describe('EspaciosAcademicosComponent', () => {
  let component: EspaciosAcademicosComponent;
  let fixture: ComponentFixture<EspaciosAcademicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaciosAcademicosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaciosAcademicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
