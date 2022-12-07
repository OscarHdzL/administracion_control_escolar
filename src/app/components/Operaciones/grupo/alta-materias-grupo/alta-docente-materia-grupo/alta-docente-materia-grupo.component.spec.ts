import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaDocenteMateriaGrupoComponent } from './alta-docente-materia-grupo.component';

describe('AltaDocenteMateriaGrupoComponent', () => {
  let component: AltaDocenteMateriaGrupoComponent;
  let fixture: ComponentFixture<AltaDocenteMateriaGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaDocenteMateriaGrupoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaDocenteMateriaGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
