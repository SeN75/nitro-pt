import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateHijriComponent } from './date-hijri.component';

describe('DateHijriComponent', () => {
  let component: DateHijriComponent;
  let fixture: ComponentFixture<DateHijriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateHijriComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateHijriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
