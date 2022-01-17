import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateGregorianComponent } from './date-gregorian.component';

describe('DateGregorianComponent', () => {
  let component: DateGregorianComponent;
  let fixture: ComponentFixture<DateGregorianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateGregorianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateGregorianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
