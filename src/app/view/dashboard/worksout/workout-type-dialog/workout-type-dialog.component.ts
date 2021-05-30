import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-workout-type-dialog',
  templateUrl: './workout-type-dialog.component.html',
  styleUrls: ['./workout-type-dialog.component.scss']
})
export class WorkoutTypeDialogComponent implements OnInit {
  workoutType: FormControl = new FormControl('', Validators.required)
  constructor(public dialogRef: MatDialogRef<WorkoutTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  action() {

  }
}
