import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutTypeDialogComponent } from './workout-type-dialog.component';

describe('WorkoutTypeDialogComponent', () => {
  let component: WorkoutTypeDialogComponent;
  let fixture: ComponentFixture<WorkoutTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutTypeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkoutTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
