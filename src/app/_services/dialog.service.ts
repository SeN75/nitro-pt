import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesDialogComponent } from '../view/dashboard/categories/categories-dialog/categories-dialog.component';
import { CategoryTypeDialogComponent } from '../view/dashboard/categories/category-type-dialog/category-type-dialog.component';
import { PackageDialogComponent } from '../view/dashboard/packages/package-dialog/package-dialog.component';
import { WorkoutDialogComponent } from '../view/dashboard/worksout/workout-dialog/workout-dialog.component';
import { WorkoutTypeDialogComponent } from '../view/dashboard/worksout/workout-type-dialog/workout-type-dialog.component';
import { TipsComponent } from '../view/registration/joinig-form/body-pic-form/tips/tips.component';
import { DialogComponent } from './../view/components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '250px',
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(res => console.log("dialog closed"));
  }

  openPackageDialog(state?: string, pack?: any) {
    const dialogRef = this.dialog.open(PackageDialogComponent, {
      height: 'auto',
      minWidth: '450px',
      maxWidth: "750px",
      width: 'auto',
      data: { state: state, package: pack }
    });
    dialogRef.afterClosed().subscribe(res => console.log("dialog closed"));
  }

  openWorkoutTypeDialog(state?: string, workout?: any) {
    const dialogRef = this.dialog.open(WorkoutTypeDialogComponent, {
      height: 'auto',
      minWidth: '450px',
      maxWidth: "750px",
      width: 'auto',
      data: { state: state, workout: workout }
    });
    dialogRef.afterClosed().subscribe(res => console.log("dialog closed"));
  }
  openWorkoutDialog(state?: string, workout?: any) {
    const dialogRef = this.dialog.open(WorkoutDialogComponent, {
      height: 'auto',
      minWidth: '450px',
      maxWidth: "750px",
      width: 'auto',
      data: { state: state, workout: workout }
    });
    dialogRef.afterClosed().subscribe(res => console.log("dialog closed"));
  }
  openCategoryTypeDialog(state?: string, cate?: any) {
    const dialogRef = this.dialog.open(CategoryTypeDialogComponent, {
      height: 'auto',
      minWidth: '450px',
      maxWidth: "750px",
      width: 'auto',
      data: { state: state, cate: cate }
    });
    dialogRef.afterClosed().subscribe(res => console.log("dialog closed"));
  }
  openCategoryDialog(state?: string, cate?: any) {
    const dialogRef = this.dialog.open(CategoriesDialogComponent, {
      height: 'auto',
      minWidth: '450px',
      maxWidth: "750px",
      width: 'auto',
      data: { state: state, cate: cate }
    });
    dialogRef.afterClosed().subscribe(res => console.log("dialog closed"));
  }
  openSubscribersDialog(state?: string, cate?: any) {
    const dialogRef = this.dialog.open(CategoriesDialogComponent, {
      height: 'auto',
      minWidth: '450px',
      maxWidth: "750px",
      width: 'auto',
      data: { state: state, cate: cate }
    });
    dialogRef.afterClosed().subscribe(res => console.log("dialog closed"));
  }
  openTipsDialog() {
    const dialogRef = this.dialog.open(TipsComponent, {
      height: 'auto',
      minWidth: '450px',
      maxWidth: "750px",
      minHeight: '60vh',
      id: "picDialog",
      direction: "rtl",
      width: 'auto',
    });
    dialogRef.afterClosed().subscribe(res => console.log("dialog closed"));
  }
}
