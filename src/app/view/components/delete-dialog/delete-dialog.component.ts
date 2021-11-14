import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FoodCategoriesService } from 'src/app/_services/dite/food-categories.service';
import { FoodItemsService } from 'src/app/_services/dite/food-items.service';
import { PackagesService } from 'src/app/_services/financial/packages.service';
import { ExercisesCategoriesService } from 'src/app/_services/gym/exercises-categories.service';
import { ExercisesService } from './../../../_services/gym/exercises.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private packSrv: PackagesService,
    private workoutSrv: ExercisesService,
    private foodCatSrv: FoodCategoriesService,
    private foodItemsSrv: FoodItemsService,
    private exercisSrv: ExercisesCategoriesService) { }

  ngOnInit(): void {
    console.log(this.data)
    console.log(this.data.name)
  }
  onNoClick() {
    this.dialogRef.close();
  }
  action() {
    if (this.data.name == 'pack')
      this.packSrv.deletePackageById(this.data.id)
    else if (this.data.name == 'exercise type2' || this.data.name == 'exercise type1')
      this.exercisSrv.deleteExerciseCategoryById(this.data.id)
    else if (this.data.name == 'exercise')
      this.workoutSrv.deleteExercisesById(this.data.id)
    else if (this.data.name == 'food category2' || this.data.name == 'food category1')
      this.foodCatSrv.deleteFoodCategoriesById(this.data.id)
    else if (this.data.name == 'exercise')
      this.workoutSrv.deleteExercisesById(this.data.id)
    else if (this.data.name == 'food item')
      this.foodItemsSrv.deleteFoodItemById(this.data.id)
    this.data.dialog.close()
    this.onNoClick()
  }
}
