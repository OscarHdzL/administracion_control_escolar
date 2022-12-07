import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RamaComponent } from './rama.component';

describe('RamaComponent', () => {
  let component: RamaComponent;
  let fixture: ComponentFixture<RamaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RamaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
