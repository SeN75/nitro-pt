import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoggerService } from 'src/app/_services/logger.service';
import { ExercisesCategoriesService } from 'src/app/_services/gym/exercises-categories.service';
import { LanguageService } from 'src/app/_services/language.service';
import { ExercisesService } from './../../../../_services/gym/exercises.service';
import { DialogService } from 'src/app/_services/dialog.service';

@Component({
  selector: 'app-workout-dialog',
  templateUrl: './workout-dialog.component.html',
  styleUrls: ['./workout-dialog.component.scss']
})
export class WorkoutDialogComponent implements OnInit {
  exerciseForm: FormGroup | any;
  isSend = false;
  selectedFile: any;
  fileUpload: File | any;
  imgUpload = new FormControl('', Validators.required)
  constructor(public dialogRef: MatDialogRef<WorkoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private logger: LoggerService,
    private exerciseSrv: ExercisesService,
    private formBuilder: FormBuilder,
    private dialogSrv: DialogService,
    public lang: LanguageService,
    public exerciseCategorySrv: ExercisesCategoriesService,
  ) {
    this.exerciseForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('[A-Za-z0-9 ]+')]],
      media_link: ['', Validators.required],
      name_ar: ['', [Validators.required, Validators.pattern("^[\u0621-\u064A\u0660-\u0669-\u0900-\u097F ]+$")]],
      category: ['', []],
    });
  }

  ngOnInit(): void {
    this.exerciseForm.valueChanges.subscribe(() => {
      this.logger.log('exerciseForm:', this.exerciseForm.value)
    })
    this.logger.log('data1: ', this.data)
    if (this.data.workout && this.data.workout.name) {
      this.logger.log('data', this.data.workout)
      this.exerciseForm.get('name').setValue(this.data.workout.name);
      this.exerciseForm.get('name_ar').setValue(this.data.workout.name_ar);
      this.exerciseForm.get('category').setValue(this.exerciseCategorySrv.exerciseCategory.id);
      this.exerciseForm.get('media_link').setValue(this.data.workout.media_link);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete() {
    this.dialogSrv.deleteDialog({ name: "exercise", id: this.data.workout.id, dialog: this.dialogRef })
  }
  action() {
    this.isSend = true;
    this.fileUpload = this.exerciseForm.get('media_link').value;
    let data: any = this.exerciseForm.value;
    data.medit_link = this.imgUpload.value;
    this.logger.log('data: ', data);
    if (this.data.state == 'edit') {
      this.exerciseSrv.updateExercisesById(data, this.data.workout.id, this.exerciseForm, this.fileUpload)
        .then(s => this.onNoClick()).catch(e => e)
    } else {
      data.category = this.data.workout.category;
      this.logger.log('data: ', data);

      this.exerciseSrv.createExercises(data, this.fileUpload, this.exerciseForm)
        .then(s => this.onNoClick()).catch(e => e)

    }

  }
  getVideo(eve: any) {
    this.logger.log('v: ', eve);
    this.exerciseForm.get('media_link').setValue(eve)
  }
  upload(event: any) {
    // this.exerciseForm.get('media_link')?.setValue(event.target.files[0]);
    this.imgUpload.setValue(event.target.files[0])
    this.fileUpload = <File>event.target.files[0];
    this.logger.log("img: ", this.imgUpload.value)
    this.exerciseForm.get('media_link').setValue(this.imgUpload.value);


  }
}
