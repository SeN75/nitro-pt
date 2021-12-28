import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntriesAndRemainingComponent } from './entries-and-remaining.component';

describe('EntriesAndRemainingComponent', () => {
  let component: EntriesAndRemainingComponent;
  let fixture: ComponentFixture<EntriesAndRemainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntriesAndRemainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntriesAndRemainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
