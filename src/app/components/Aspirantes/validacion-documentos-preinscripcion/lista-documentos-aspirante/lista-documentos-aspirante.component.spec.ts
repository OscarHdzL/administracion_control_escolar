import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDocumentosAspiranteComponent } from './lista-documentos-aspirante.component';

describe('ListaDocumentosAspiranteComponent', () => {
  let component: ListaDocumentosAspiranteComponent;
  let fixture: ComponentFixture<ListaDocumentosAspiranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDocumentosAspiranteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDocumentosAspiranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
