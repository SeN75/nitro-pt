import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-package-dialog',
  templateUrl: './package-dialog.component.html',
  styleUrls: ['./package-dialog.component.scss']
})
export class PackageDialogComponent implements OnInit {
  packForm: FormGroup | any;

  constructor(
    public dialogRef: MatDialogRef<PackageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.packForm = this.formBuilder.group({
      packName: [''],
      packDuration: [''],
      packValue: [''],
      accountNumber: [''],
      discountAmount: [''],
      isThereAttch: [false],
      attch: [''],
      showInWebsite: [false]
    })
    this.packForm.get('packName')?.setValue(this.data.package.title);
    this.packForm.get('packDuration')?.setValue(this.data.package.month);
    this.packForm.get('packValue')?.setValue(this.data.package.price);
    this.packForm.get('accountNumber')?.setValue(this.data.package.accountNumber);
    this.packForm.get('isThereAttch')?.setValue(this.data.package.haveAttach);
    this.packForm.get('showInWebsite')?.setValue(this.data.package.showOnWebsite);
    console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  action() {
    if (this.data.state == 'edit')
      this.onNoClick();
    else
      this.onNoClick();
  }
}
