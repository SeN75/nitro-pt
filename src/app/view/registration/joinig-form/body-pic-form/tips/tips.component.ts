import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss']
})
export class TipsComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<TipsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) { }
  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
