import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PackageDialogComponent } from '../view/dashboard/packages/package-dialog/package-dialog.component';
import { WorkoutDialogComponent } from '../view/dashboard/worksout/workout-dialog/workout-dialog.component';
import { WorkoutTypeDialogComponent } from '../view/dashboard/worksout/workout-type-dialog/workout-type-dialog.component';
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
      data: { state: state, workout: workout, test: 'te' }
    });
    dialogRef.afterClosed().subscribe(res => console.log("dialog closed"));
  }
}
