import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModallistapreguntasComponent } from './modallistapreguntas.component';

describe('ModallistapreguntasComponent', () => {
  let component: ModallistapreguntasComponent;
  let fixture: ComponentFixture<ModallistapreguntasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModallistapreguntasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModallistapreguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
