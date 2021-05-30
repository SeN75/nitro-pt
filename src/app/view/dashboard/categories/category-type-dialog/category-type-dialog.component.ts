import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-category-type-dialog',
  templateUrl: './category-type-dialog.component.html',
  styleUrls: ['./category-type-dialog.component.scss']
})
export class CategoryTypeDialogComponent implements OnInit {
  cateType: FormControl = new FormControl('', Validators.required)
  constructor(public dialogRef: MatDialogRef<CategoryTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    if (this.data.state == 'edit')
      this.cateType.setValue(this.data.cate.catType);
  }
  action() {

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
