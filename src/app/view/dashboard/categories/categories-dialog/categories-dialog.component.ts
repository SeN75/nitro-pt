import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { measuring_units } from 'src/app/_common/globle';
import { DialogService } from 'src/app/_services/dialog.service';
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
  img = "../../../../../assets/images/uploader.svg";
  isSend = false;
  unitt: any = {
    name: '',
    name_ar: ''
  };
  file: File | any;
  constructor(public dialogRef: MatDialogRef<CategoriesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public lang: LanguageService,
    private formBuilder: FormBuilder,
    private logger: LoggerService,
    private dialgoSrv: DialogService,
    public foodUnitsSrv: FoodUnitsService,
    private foodItemSrv: FoodItemsService) {
    this.cateForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("[A-Za-z0-9 ]+")]],
      name_ar: ['', [Validators.required, Validators.pattern("^[\u0621-\u064A\u0660-\u0669-\u0900-\u097F ]+$")]],
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
  selectImg(event: any) {
    let file: File = <File>event.target.files[0];
    this.file = file;
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      this.logger.log('upload in:', e.target.result)
      this.logger.log('value: ', this.cateForm.value)
      this.img = e.target.result;
    }
  }

  action() {
    this.isSend = true;
    console.log(this.cateForm)

    let data: any = { ...this.cateForm.value };
    data.category = this.data.cate.categoryid;

    if (this.data.state != 'edit') {
      this.foodItemSrv.createFoodItem(data, this.file)
      this.onNoClick();
    }
    else {
      if (!this.cateForm.get('name')?.dirty)
        delete data.name;
      if (!this.cateForm.get('name_ar')?.dirty)
        delete data.name_ar;
      this.logger.log('data: ', data)
      this.foodItemSrv.updateFoodItemById(data, this.data.cate.id)
      this.onNoClick();
    }
    this.logger.log('value: ', this.cateForm)

  }
  delete() {
    this.dialgoSrv.deleteDialog({ name: 'food item', id: this.data.cate.id, dialog: this.dialogRef })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
