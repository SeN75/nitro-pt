import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dietplan-temp-dialog',
  templateUrl: './dietplan-temp-dialog.component.html',
  styleUrls: ['./dietplan-temp-dialog.component.scss']
})
export class DietplanTempDialogComponent implements OnInit {
  dietForm: FormGroup | any;
  PERCENT = 100;
  constructor(
    public dialogRef: MatDialogRef<DietplanTempDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.dietForm = new FormGroup({
      program_name: new FormControl('', [Validators.required, Validators.pattern("[A-Za-z]+")]),
      program_name_ar: new FormControl('', [Validators.required, Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$")]),
      total_calories: new FormControl('', [Validators.required]),
      calories_to_protein: new FormControl('', [Validators.required,]),
      calories_to_fat: new FormControl('', [Validators.required]),
      calories_to_carp: new FormControl('', [Validators.required]),

    })

  }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close()
  }
  delete() {

  }
  action() {
    this.onNoClick()
  }
}
