import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-inactive-dialog',
  templateUrl: './inactive-dialog.component.html',
  styleUrls: ['./inactive-dialog.component.scss']
})
export class InactiveDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<InactiveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
