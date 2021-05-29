import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PackageDialogComponent } from '../view/dashboard/packages/package-dialog/package-dialog.component';
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
}
