import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { measuring_units } from 'src/app/_common/globle';

@Component({
  selector: 'app-categories-dialog',
  templateUrl: './categories-dialog.component.html',
  styleUrls: ['./categories-dialog.component.scss']
})
export class CategoriesDialogComponent implements OnInit {
  cateForm: FormGroup | any;
  constructor(public dialogRef: MatDialogRef<CategoriesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) { }
  units = measuring_units;
  get cate() { return this.cateForm }
  get calculationMethod() { return this.cateForm.controls.calculationMethod.value }
  ngOnInit(): void {
    console.log(this.units);
    this.cateForm = this.formBuilder.group({
      categoryType: [''],
      categoryName: [''],
      calculationMethod: ['gram'],
      calories: [''],
      fat: [''],
      carp: [''],
      protein: ['']

    })
  }
  action() {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
