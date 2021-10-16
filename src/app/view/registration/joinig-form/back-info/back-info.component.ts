import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PackagesService } from 'src/app/_services/financial/packages.service';
import { LoggerService } from 'src/app/_services/logger.service';

@Component({
  selector: 'joining-back-info',
  templateUrl: './back-info.component.html',
  styleUrls: ['./back-info.component.scss']
})
export class BackInfoComponent implements OnInit {
  bankInfoForm: FormGroup;
  counter = 0;
  @Input() package: any = {
    required_attachments: [],
    attach_required: false
  }
  value = {
    data: {},
    valid: false,
    send: false
  }
  attachRequired = false;
  attachName = '';
  reciept_img = '../../../../../assets/images/uploader.svg';
  attach_img = '../../../../../assets/images/uploader.svg';
  @Output() bankInfo: any = new EventEmitter<any>();



  accountName = new FormControl({ value: '', disabled: true });
  bank = new FormControl({ value: '', disabled: true })
  iban = new FormControl({ value: '', disabled: true })
  constructor(
    private formBuilder: FormBuilder,
    private logger: LoggerService,
    private packageSrv: PackagesService) {
    this.logger.log('pack: ', this.package)
    this.bankInfoForm = this.formBuilder.group({
      recipt: ['',],
      attach: ['']
    })
    if (this.packageSrv.package) {
      this.accountName.setValue(this.package.bank_name_ar)
      this.iban.setValue(this.package.iban)
      this.bank.setValue(this.package.bank_name_ar)
      this.attachRequired = this.package.attach_required;
      if (this.package.required_attachments.length != 0) {
        this.attachName = this.package.required_attachments[0].attach_name_ar
      }
    }

    this.bankInfoForm.valueChanges.subscribe(() => {
      this.value.valid = this.bankInfoForm.valid;
      this.value.data = this.bankInfoForm.value;
      this.bankInfo.emit(this.value)
    })

  }
  selectRecipt(event: any) {
    let file: File = <File>event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      this.logger.log('upload in:', e.target.result)
      this.bankInfoForm.get('recipt')?.setValue(file);
      this.reciept_img = e.target.result;
    }

  }

  selectAttatch(event: any) {
    let file: File = <File>event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      this.logger.log('upload in:', e.target.result)
      this.bankInfoForm.get('attach')?.setValue(file);
      this.attach_img = e.target.result;
    }

  }
  ngOnInit(): void {
  }

}
