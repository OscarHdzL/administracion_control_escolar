import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRamaComponent } from './modal-rama.component';

describe('ModalRamaComponent', () => {
  let component: ModalRamaComponent;
  let fixture: ComponentFixture<ModalRamaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRamaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
