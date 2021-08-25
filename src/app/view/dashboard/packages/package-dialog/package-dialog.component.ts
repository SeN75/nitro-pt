import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PackagesService } from 'src/app/_services/financial/packages.service';
import { LoggerService } from 'src/app/_services/logger.service';

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
    private formBuilder: FormBuilder,
    private logger: LoggerService,
    private packSrv: PackagesService) {
    this.packForm = this.formBuilder.group({
      name: ['', Validators.required],
      name_ar: ['', [Validators.required, Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$")]],
      description: ['', Validators.required],
      description_ar: ['', [Validators.required, Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$")]],
      period: ['', Validators.required],
      price: ['', Validators.required],
      iban_id: ['5e4b3655-9de3-4085-be5e-6de910fa9e1d'],
      discountAmount: [''],
      attach_required: [false],
      attachments_ids: [[1]],
      showInWebsite: [false]
    })
  }

  ngOnInit(): void {

    if (this.data.package) {
      this.packForm.get('name')?.setValue(this.data.package.name);
      this.packForm.get('name_ar')?.setValue(this.data.package.name_ar);
      this.packForm.get('description')?.setValue(this.data.package.description);
      this.packForm.get('description_ar')?.setValue(this.data.package.description_ar);
      this.packForm.get('period')?.setValue(this.data.package.period);
      this.packForm.get('price')?.setValue(this.data.package.price);
      this.packForm.get('attachments_ids')?.setValue(this.data.package.attachments_ids);
      this.packForm.get('attach_required')?.setValue(this.data.package.attach_required);
      this.packForm.get('showInWebsite')?.setValue(this.data.package.showOnWebsite);
    }
    console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  delete() {
    this.packSrv.deletePackageById(this.data.package.id)
  }
  action() {
    let data: any = this.packForm.value;
    delete data.discountAmount;
    delete data.showInWebsite;
    if (this.data.state == 'edit') {
      this.logger.log('edit pack: ', this.packForm.value);
      this.logger.log('edit pack: ', this.data.package);
      this.packSrv.updatePackageById(this.packForm.value, this.data.package.external_id)
      this.onNoClick();
    }
    else {
      this.logger.log('add pack: ', this.packForm.value);
      this.packSrv.createPackage(this.packForm.value)
      this.onNoClick();

    }
  }
}
