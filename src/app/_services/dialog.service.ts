import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
}
