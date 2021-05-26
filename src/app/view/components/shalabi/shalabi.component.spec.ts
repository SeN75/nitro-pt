import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShalabiComponent } from './shalabi.component';

describe('ShalabiComponent', () => {
  let component: ShalabiComponent;
  let fixture: ComponentFixture<ShalabiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShalabiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShalabiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
