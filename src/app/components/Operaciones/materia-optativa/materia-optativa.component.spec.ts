import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaOptativaComponent } from './materia-optativa.component';

describe('MateriaOptativaComponent', () => {
  let component: MateriaOptativaComponent;
  let fixture: ComponentFixture<MateriaOptativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MateriaOptativaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MateriaOptativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
