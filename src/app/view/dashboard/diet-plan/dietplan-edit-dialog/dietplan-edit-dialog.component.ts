import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dietplan-edit-dialog',
  templateUrl: './dietplan-edit-dialog.component.html',
  styleUrls: ['./dietplan-edit-dialog.component.scss']
})
export class DietplanEditDialogComponent implements OnInit {
  tableForm: FormGroup | any;
  mealForm: FormGroup | any;
  constructor(
    public dialogRef: MatDialogRef<DietplanEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.tableForm = new FormGroup({
      name: new FormControl(''),
      note: new FormControl('')
    })
    this.mealForm = new FormGroup({
      name: new FormControl('')
    });

  }

  ngOnInit(): void {
    if (this.data.state == 'table') {
      this.tableForm.get('name')?.setValue(this.data.data.name)
      this.tableForm.get('note')?.setValue(this.data.data.note)
    }
    else if (this.data.state == 'meal') {
      this.mealForm.get('name')?.setValue(this.data.data.name)

    }
  }

  onNoClick() {
    this.dialogRef.close()
  }
  delete() {

  }
  action() {
    if (this.data.state == 'table') {

    } else if (this.data.state == 'meal') {

    }
    this.onNoClick()
  }
}
