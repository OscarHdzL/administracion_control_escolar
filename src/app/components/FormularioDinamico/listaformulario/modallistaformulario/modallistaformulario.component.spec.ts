import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModallistaformularioComponent } from './modallistaformulario.component';

describe('ModallistaformularioComponent', () => {
  let component: ModallistaformularioComponent;
  let fixture: ComponentFixture<ModallistaformularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModallistaformularioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModallistaformularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
