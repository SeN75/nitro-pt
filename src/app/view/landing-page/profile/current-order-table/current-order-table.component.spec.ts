import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentOrderTableComponent } from './current-order-table.component';

describe('CurrentOrderTableComponent', () => {
  let component: CurrentOrderTableComponent;
  let fixture: ComponentFixture<CurrentOrderTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentOrderTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentOrderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
