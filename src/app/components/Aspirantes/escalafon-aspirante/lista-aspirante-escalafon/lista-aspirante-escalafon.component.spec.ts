import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAspiranteEscalafonComponent } from './lista-aspirante-escalafon.component';

describe('ListaAspiranteEscalafonComponent', () => {
  let component: ListaAspiranteEscalafonComponent;
  let fixture: ComponentFixture<ListaAspiranteEscalafonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAspiranteEscalafonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAspiranteEscalafonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
