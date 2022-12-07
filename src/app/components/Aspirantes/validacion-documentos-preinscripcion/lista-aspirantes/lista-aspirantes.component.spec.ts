import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAspirantesComponent } from './lista-aspirantes.component';

describe('ListaAspirantesComponent', () => {
  let component: ListaAspirantesComponent;
  let fixture: ComponentFixture<ListaAspirantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAspirantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAspirantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
