import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FoodCategoriesService } from './../../../../_services/dite/food-categories.service';

@Component({
  selector: 'app-category-type-dialog',
  templateUrl: './category-type-dialog.component.html',
  styleUrls: ['./category-type-dialog.component.scss']
})
export class CategoryTypeDialogComponent implements OnInit {
  categoryForm: FormGroup | any;
  constructor(public dialogRef: MatDialogRef<CategoryTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categorySrv: FoodCategoriesService,
    private formBuilder: FormBuilder) {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      name_ar: ['', [Validators.required, Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$")]],
    })
  }
  ngOnInit(): void {
    if (this.data.cate) {
      this.categoryForm.get('name')?.setValue(this.data.cate.name)
      this.categoryForm.get('name_ar')?.setValue(this.data.cate.name_ar)
    }
  }
  delete() {
    this.categorySrv.deleteFoodCategoriesById(this.data.cate.id);
    this.onNoClick();
  }
  action() {
    if (this.data.state == 'edit') {
      this.categorySrv.updateFoodCategoriesById(this.categoryForm.value, this.data.cate.id)
      this.onNoClick()
    } else {
      this.categorySrv.createFoodCategory(this.categoryForm.value)
      this.onNoClick()
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
