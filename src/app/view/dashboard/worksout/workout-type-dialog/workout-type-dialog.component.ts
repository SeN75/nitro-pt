import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { LoggerService } from 'src/app/_services/logger.service';
import { ExercisesCategoriesService } from './../../../../_services/gym/exercises-categories.service';
import { ExercisesService } from 'src/app/_services/gym/exercises.service';
import { DialogService } from 'src/app/_services/dialog.service';

@Component({
  selector: 'app-workout-type-dialog',
  templateUrl: './workout-type-dialog.component.html',
  styleUrls: ['./workout-type-dialog.component.scss']
})
export class WorkoutTypeDialogComponent implements OnInit {
  isSend = false;
  workoutType: FormControl = new FormControl('', Validators.required)
  exerciseCategroyForm: FormGroup | any;
  constructor(public dialogRef: MatDialogRef<WorkoutTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private logger: LoggerService,
    public exerciseSrv: ExercisesService,
    private dialogSrv: DialogService,
    private exerciseCatgroySrv: ExercisesCategoriesService) {
    this.exerciseCategroyForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[A-Za-z0-9 ]+')]],
      name_ar: ['', [Validators.required, Validators.pattern("^[\u0621-\u064A\u0660-\u0669-\u0900-\u097F ]+$")]],
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
    if (this.exerciseSrv.getExerciseListOnSameCategory(this.data.workout.name_ar).length > 0)
      this.dialogSrv.deleteDialog({ name: 'exercise type2', id: this.data.workout.id, dialog: this.dialogRef })
    else
      this.dialogSrv.deleteDialog({ name: 'exercise type1', id: this.data.workout.id, dialog: this.dialogRef })
    // this.exerciseCatgroySrv.deleteExerciseCategoryById(this.data.workout.id)
    // this.onNoClick();
  }
  action() {
    this.isSend = true;
    let data = { ...this.exerciseCategroyForm.value }
    if (this.exerciseCategroyForm.valid) {
      if (this.data.state == 'edit') {
        if (!this.exerciseCategroyForm.get('name')?.dirty)
          delete data.name
        if (!this.exerciseCategroyForm.get('name_ar')?.dirty)
          delete data.name_ar
        this.exerciseCatgroySrv.updateExercisesCategoryById(data, this.data.workout.id, this.exerciseCategroyForm).then(s => this.onNoClick()).catch(e => e)

      }
      else {
        this.logger.log('cate value: ', this.exerciseCategroyForm.value)
        this.exerciseCatgroySrv.createExercisesCategory(this.exerciseCategroyForm.value, this.exerciseCategroyForm).then(s => this.onNoClick()).catch(e => e)
          ;
      }

    }
  }
}
