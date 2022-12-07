import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalpreguntaComponent } from './modalpregunta.component';

describe('ModalpreguntaComponent', () => {
  let component: ModalpreguntaComponent;
  let fixture: ComponentFixture<ModalpreguntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalpreguntaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalpreguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
