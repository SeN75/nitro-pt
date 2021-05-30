import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-workout-dialog',
  templateUrl: './workout-dialog.component.html',
  styleUrls: ['./workout-dialog.component.scss']
})
export class WorkoutDialogComponent implements OnInit {
  exerciseForm: FormGroup | any;
  constructor(public dialogRef: MatDialogRef<WorkoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.exerciseForm = this.formBuilder.group({
      name: [''],
      link: ['']
    });
    if (this.data.workout) {
      this.exerciseForm.get('name').setValue(this.data.workout.name);
      this.exerciseForm.get('link').setValue(this.data.workout.link);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  action() {

  }
}
