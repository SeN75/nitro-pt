import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuringMethodComponent } from './measuring-method.component';

describe('MeasuringMethodComponent', () => {
  let component: MeasuringMethodComponent;
  let fixture: ComponentFixture<MeasuringMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasuringMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasuringMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
