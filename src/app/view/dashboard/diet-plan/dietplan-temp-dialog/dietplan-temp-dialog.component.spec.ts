import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietplanTempDialogComponent } from './dietplan-temp-dialog.component';

describe('DietplanTempDialogComponent', () => {
  let component: DietplanTempDialogComponent;
  let fixture: ComponentFixture<DietplanTempDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DietplanTempDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DietplanTempDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
