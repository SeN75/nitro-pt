import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseOrderTableComponent } from './close-order-table.component';

describe('CloseOrderTableComponent', () => {
  let component: CloseOrderTableComponent;
  let fixture: ComponentFixture<CloseOrderTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseOrderTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseOrderTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
