import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { LoggerService } from 'src/app/_services/logger.service';
import { ExercisesCategoriesService } from './../../../../_services/gym/exercises-categories.service';

@Component({
  selector: 'app-workout-type-dialog',
  templateUrl: './workout-type-dialog.component.html',
  styleUrls: ['./workout-type-dialog.component.scss']
})
export class WorkoutTypeDialogComponent implements OnInit {
  workoutType: FormControl = new FormControl('', Validators.required)
  exerciseCategroyForm: FormGroup | any;
  constructor(public dialogRef: MatDialogRef<WorkoutTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private logger: LoggerService,
    private exerciseCatgroySrv: ExercisesCategoriesService) {
    this.exerciseCategroyForm = this.formBuilder.group({
      name: ['', Validators.required],
      name_ar: ['', [Validators.required, Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$")]],
    })
    if (this.data.workout) {
      this.exerciseCategroyForm.get('name')?.setValue(this.data.workout.name)
      this.exerciseCategroyForm.get('name_ar')?.setValue(this.data.workout.name_ar)
    }
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  delete() {
    this.exerciseCatgroySrv.deleteExerciseCategoryById(this.data.workout.id)
    this.onNoClick();
  }
  action() {
    if (this.exerciseCategroyForm.valid) {
      if (this.data.state == 'edit') {
        this.exerciseCatgroySrv.updateExercisesCategoryById(this.exerciseCategroyForm.value, this.data.workout.id)
        this.onNoClick();
      }
      else {
        this.logger.log('cate value: ', this.exerciseCategroyForm.value)
        this.exerciseCatgroySrv.createExercisesCategory(this.exerciseCategroyForm.value)
        this.onNoClick();
      }

    }
  }
}
