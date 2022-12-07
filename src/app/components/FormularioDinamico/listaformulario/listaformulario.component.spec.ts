import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaformularioComponent } from './listaformulario.component';

describe('ListaformularioComponent', () => {
  let component: ListaformularioComponent;
  let fixture: ComponentFixture<ListaformularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaformularioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaformularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
