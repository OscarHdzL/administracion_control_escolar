import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoAdmisionComponent } from './proceso-admision.component';

describe('ProcesoAdmisionComponent', () => {
  let component: ProcesoAdmisionComponent;
  let fixture: ComponentFixture<ProcesoAdmisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcesoAdmisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcesoAdmisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
