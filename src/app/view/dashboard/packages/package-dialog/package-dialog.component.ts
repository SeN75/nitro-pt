import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BankAccountsService } from 'src/app/_services/financial/bank-accounts.service';
import { OffersService } from 'src/app/_services/financial/offers.service';
import { PackagesService } from 'src/app/_services/financial/packages.service';
import { LanguageService } from 'src/app/_services/language.service';
import { LoggerService } from 'src/app/_services/logger.service';

@Component({
  selector: 'app-package-dialog',
  templateUrl: './package-dialog.component.html',
  styleUrls: ['./package-dialog.component.scss']
})
export class PackageDialogComponent implements OnInit {
  packForm: FormGroup | any;
  offerForm: FormGroup | any;
  withOffer = false;
  toDayDate = new Date();
  minDate = new Date();
  maxDate = new Date();
  durations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  constructor(
    public dialogRef: MatDialogRef<PackageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private logger: LoggerService,
    public lang: LanguageService,
    public bankSrv: BankAccountsService,
    private offerSrv: OffersService,
    private datePipe: DatePipe,
    public packSrv: PackagesService) {
    this.packForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("[A-Za-z]+")]],
      name_ar: ['', [Validators.required, Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$")]],
      description: ['', [Validators.required, Validators.pattern("[A-Za-z]+")]],
      description_ar: ['', [Validators.required, Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$")]],
      period: ['', Validators.required],
      price: ['', Validators.required],
      iban_id: ['', Validators.required],
      discountAmount: [''],
      attach_required: [false],
      attachments_ids: [{ value: [], disabled: true }],
      showInWebsite: [false]
    })
    this.packForm.get("attach_required")?.valueChanges.subscribe((value: boolean) => {
      this.logger.log('value:', value)
      if (value)
        this.packForm.get('attachments_ids')?.enable()
      else
        this.packForm.get('attachments_ids')?.disable()

    })
    this.offerForm = this.formBuilder.group({
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      offer_value: ['', Validators.required],
      package_id: [''],
      type: [''],
    })
    this.minDate.setDate(this.toDayDate.getDate() - 0)
    this.logger.log('minDate: ', this.minDate)
  }

  ngOnInit(): void {

    if (this.data.package) {
      this.packForm.get('name')?.setValue(this.data.package.name);
      this.packForm.get('name_ar')?.setValue(this.data.package.name_ar);
      this.packForm.get('description')?.setValue(this.data.package.description);
      this.packForm.get('description_ar')?.setValue(this.data.package.description_ar);
      this.packForm.get('period')?.setValue(this.data.package.period);
      this.packForm.get('price')?.setValue(this.data.package.price);
      this.packForm.get('iban_id')?.setValue(this.data.package.bank_account_id);
      this.packForm.get('attach_required')?.setValue(this.data.package.attach_required);
      this.packForm.get('showInWebsite')?.setValue(this.data.package.showOnWebsite);
      this.offerSrv.getOfferByPackageId(this.data.package.external_id)
      if (this.packForm.get('attach_required')?.value == true) {
        let ids = []
        this.logger.log("attach: ", this.packForm.get('attachments_ids')?.value)
        this.logger.log("attach: ", this.data.package.attachments_ids)
        for (let i = 0; i < this.data.package.required_attachments.length; i++)
          ids.push(this.data.package.required_attachments[i].id)
        this.logger.log("ids: ", ids)

        this.packForm.get('attachments_ids')?.setValue(ids)
      }

    }
    console.log(this.data)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  delete() {
    this.packSrv.deletePackageById(this.data.package.external_id)
    this.onNoClick();
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
      this.packSrv.createPackage(this.packForm.value, (this.offerForm.valid ? this.offerForm.value : undefined))
      this.onNoClick();

    }
  }
}
