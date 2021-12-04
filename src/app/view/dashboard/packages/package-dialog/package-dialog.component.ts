import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { DialogService } from 'src/app/_services/dialog.service';
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
  offerObj: any;
  toDayDate = new Date();
  minDate = new Date();
  maxDate = new Date();
  durations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  isSend = false;
  constructor(
    public dialogRef: MatDialogRef<PackageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private logger: LoggerService,
    public lang: LanguageService,
    public bankSrv: BankAccountsService,
    private dialogSrv: DialogService,
    private offerSrv: OffersService,
    private datePipe: DatePipe,
    public packSrv: PackagesService) {
    this.packForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern("[A-Za-z0-9 ]+")]],
      name_ar: ['', [Validators.required, Validators.pattern("^[\u0621-\u064A\u0660-\u0669-\u0900-\u097F ]+$")]],
      description: ['', [Validators.required, Validators.pattern("[A-Za-z0-9 ]+")]],
      description_ar: ['', [Validators.required, Validators.pattern("^[\u0621-\u064A\u0660-\u0669-\u0900-\u097F ]+$")]],
      period: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('([0-9]{1,4}\.[0-9]{0,2})')]],
      iban_id: ['', Validators.required],
      discountAmount: [''],
      attach_required: [false],
      attachment_id: [{ value: '', disabled: true }],
      showInWebsite: [false]
    })
    this.logger.log('attach: ', this.packSrv.attachmentList)
    this.packForm.get("attach_required")?.valueChanges.subscribe((value: boolean) => {
      this.logger.log('value:', value)
      if (value)
        this.packForm.get('attachment_id')?.enable()
      else
        this.packForm.get('attachment_id')?.disable()

    })
    this.offerForm = this.formBuilder.group({
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      offer_value: ['', Validators.required],
      package_id: [''],
      type: ['', Validators.required],
    })
    this.minDate.setDate(this.toDayDate.getDate() - 0)
    this.logger.log('minDate: ', this.minDate)
    this.offerForm.get('type').valueChanges.subscribe((e: any) => this.logger.log('type: ', e))
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
      this.getOffer(this.data.package.external_id)
      if (this.packForm.get('attach_required')?.value == true) {

        this.logger.log("attach: ", this.packForm.get('attachment_id')?.value)
        this.logger.log("attach: ", this.data.package)
        this.packForm.get('attachment_id')?.setValue(this.data.package.required_attachment.id)
      }

    }
    this.logger.log("test: ", this.offerForm)
    console.log(this.data)
  }
  getOffer(id: string) {
    this.offerSrv.___getOfferByPackageId(id).subscribe((s: any) => {
      this.offerObj = s;
      this.withOffer = true;
      this.offerForm.get('start_date')?.setValue(s.start_date);
      // this.offerForm.get('start_date')?.disable();
      this.offerForm.get('end_date')?.setValue(s.end_date);
      this.offerForm.get('offer_value')?.setValue(s.offer_value);
      this.offerForm.get('type')?.setValue(s.type);
    })
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  delete() {
    this.dialogSrv.deleteDialog({ name: 'pack', id: this.data.package.external_id, dialog: this.dialogRef })
  }
  action() {
    this.isSend = true;
    let data: any = { ...this.packForm.value };
    delete data.discountAmount;
    delete data.showInWebsite;
    if (this.data.state == 'edit') {

      this.logger.log('edit pack: ', this.packForm.value);
      this.logger.log('edit pack: ', this.data.package);
      if (!this.packForm.get('name')?.dirty)
        delete data.name
      if (!this.packForm.get('name_ar')?.dirty)
        delete data.name_ar
      this.packSrv.updatePackageById(data, this.data.package.external_id)
      if (this.withOffer) {
        let offer = { ...this.offerForm.value }
        delete offer.package_id;
        offer.end_date = this.replaceNumber(moment(offer.end_date).format('yyyy-MM-D'))
        offer.start_date = this.replaceNumber(moment(offer.start_date).format('yyyy-MM-D'))
        if (this.offerForm.get('end_date')?.dirty)
          delete offer.end_date
        if (this.offerForm.get('start_date')?.dirty)
          delete offer.start_date
        this.offerSrv.updateOfferByPackageId(offer, this.data.package.external_id)
      }
      this.onNoClick();
    }
    else {
      this.logger.log('add pack: ', this.packForm.value);
      this.packSrv.createPackage(this.packForm.value, (this.offerForm.valid ? this.offerForm.value : undefined))
      this.onNoClick();
    }
  }
  replaceNumber(str: string) {
    return str
      .replace(/٠/g, '0')
      .replace(/١/g, '1')
      .replace(/٢/g, '2')
      .replace(/٣/g, '3')
      .replace(/٤/g, '4')
      .replace(/٥/g, '5')
      .replace(/٦/g, '6')
      .replace(/٧/g, '7')
      .replace(/٨/g, '8')
      .replace(/٩/g, '9')
  }

}
