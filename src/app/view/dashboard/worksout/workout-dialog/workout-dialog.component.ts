import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoggerService } from 'src/app/_services/logger.service';
import { ExercisesCategoriesService } from 'src/app/_services/gym/exercises-categories.service';
import { LanguageService } from 'src/app/_services/language.service';
import { ExercisesService } from './../../../../_services/gym/exercises.service';

@Component({
  selector: 'app-workout-dialog',
  templateUrl: './workout-dialog.component.html',
  styleUrls: ['./workout-dialog.component.scss']
})
export class WorkoutDialogComponent implements OnInit {
  exerciseForm: FormGroup | any;
  selectedFile: any;
  imgUpload = new FormControl({ value: '', disabled: true }, Validators.required)
  constructor(public dialogRef: MatDialogRef<WorkoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private logger: LoggerService,
    private exerciseSrv: ExercisesService,
    private formBuilder: FormBuilder,
    public lang: LanguageService,
    public exerciseCategorySrv: ExercisesCategoriesService,
  ) {
    this.exerciseForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      media_link: [{ value: '', disabled: true }],
      name_ar: ['', [Validators.required, Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$")]],
      category: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {

    this.logger.log('data1: ', this.data)
    if (this.data.workout && this.data.workout.name) {
      this.exerciseForm.get('name').setValue(this.data.workout.name);
      this.exerciseForm.get('name_ar').setValue(this.data.workout.name_ar);
      this.exerciseForm.get('category').setValue(this.data.workout.category);
      this.exerciseForm.get('media_link').setValue(this.data.workout.media_link);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  action() {
    let data: any = this.exerciseForm.value;
    data.medit_link = this.imgUpload.value;
    this.logger.log('data: ', data);
    if (this.data.state == 'edit') {
      this.exerciseSrv.updateExercisesById(data, this.data.workout.id)
    } else {
      data.category = this.data.workout.category;
      this.logger.log('data: ', data);

      this.exerciseSrv.createExercises(data)
    }

  }
  upload(event: any) {
    // this.exerciseForm.get('media_link')?.setValue(event.target.files[0]);
    this.imgUpload.setValue(event.target.files[0])
    this.logger.log("img: ", this.imgUpload.value)

  }
}
