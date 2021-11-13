import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from 'src/app/_services/dialog.service';
import { FoodItemsService } from 'src/app/_services/dite/food-items.service';
import { FoodCategoriesService } from './../../../../_services/dite/food-categories.service';

@Component({
  selector: 'app-category-type-dialog',
  templateUrl: './category-type-dialog.component.html',
  styleUrls: ['./category-type-dialog.component.scss']
})
export class CategoryTypeDialogComponent implements OnInit {
  categoryForm: FormGroup | any;
  isSend = false;
  constructor(public dialogRef: MatDialogRef<CategoryTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogSrv: DialogService,
    private categorySrv: FoodCategoriesService,
    private categoryItemSrv: FoodItemsService,
    private formBuilder: FormBuilder) {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("[A-Za-z0-9 ]+")]],
      name_ar: ['', [Validators.required, Validators.pattern("^[\u0621-\u064A\u0660-\u0669-\u0900-\u097F ]+$")]],
    })
  }
  ngOnInit(): void {
    if (this.data.cate) {
      this.categoryForm.get('name')?.setValue(this.data.cate.name)
      this.categoryForm.get('name_ar')?.setValue(this.data.cate.name_ar)
    }
  }
  delete() {

    if (this.categoryItemSrv.getItemsWithSameCategory(this.data.cate.name).length > 0)
      this.dialogSrv.deleteDialog({ name: 'food category2', id: this.data.cate.id, dialog: this.dialogSrv })
    else
      this.dialogSrv.deleteDialog({ name: 'food category1', id: this.data.cate.id, dialog: this.dialogSrv })

  }
  action() {
    this.isSend = true;
    let data = { ...this.categoryForm.value }
    if (this.data.state == 'edit') {
      if (!this.categoryForm.get('name')?.dirty)
        delete data.name
      if (!this.categoryForm.get('name_ar')?.dirty)
        delete data.name_ar
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
