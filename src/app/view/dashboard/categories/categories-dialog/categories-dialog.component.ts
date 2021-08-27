import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { measuring_units } from 'src/app/_common/globle';
import { FoodItemsService } from 'src/app/_services/dite/food-items.service';
import { FoodUnitsService } from 'src/app/_services/dite/food-units.service';
import { LanguageService } from 'src/app/_services/language.service';
import { LoggerService } from 'src/app/_services/logger.service';

@Component({
  selector: 'app-categories-dialog',
  templateUrl: './categories-dialog.component.html',
  styleUrls: ['./categories-dialog.component.scss']
})
export class CategoriesDialogComponent implements OnInit {
  cateForm: FormGroup | any;


  unitt: any = {
    name: '',
    name_ar: ''
  };
  constructor(public dialogRef: MatDialogRef<CategoriesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public lang: LanguageService,
    private formBuilder: FormBuilder,
    private logger: LoggerService,
    public foodUnitsSrv: FoodUnitsService,
    private foodItemSrv: FoodItemsService) {
    this.cateForm = this.formBuilder.group({
      name: ['', Validators.required],
      name_ar: ['', [Validators.required, Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$")]],
      fat: ['', Validators.required],
      protien: ['', Validators.required],
      carb: ['', Validators.required],
      calories: ['', Validators.required],
      category: ['',],
      unit: ['', Validators.required],
    })
  }

  get cate() { return this.cateForm }
  ngOnInit(): void {
    if (this.data.cate) {
      this.cateForm.get('name').setValue(this.data.cate.name);
      this.cateForm.get('name_ar').setValue(this.data.cate.name_ar);
      this.cateForm.get('fat').setValue(this.data.cate.fat);
      this.cateForm.get('carb').setValue(this.data.cate.carb);
      this.cateForm.get('protien').setValue(this.data.cate.protien);
      this.cateForm.get('calories').setValue(this.data.cate.calories);
      this.cateForm.get('unit').setValue(this.foodUnitsSrv.units.filter((u: any) => {
        return u.name_ar == this.data.cate.unit
      })[0].id)

      this.changeUnit()
    }

  }
  changeUnit() {
    this.unitt = this.foodUnitsSrv.units.filter(u => u.id == this.cateForm.get('unit').value)[0]
  }
  action() {
    let data: any = this.cateForm.value;
    data.category = this.data.cate.categoryid;

    if (this.data.state != 'edit') {
      this.foodItemSrv.createFoodItem(data)
      this.onNoClick();
    }
    else {
      this.foodItemSrv.updateFoodItemById(data, this.data.cate.id)
      this.onNoClick();
    }
    this.logger.log('value: ', this.cateForm)

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
