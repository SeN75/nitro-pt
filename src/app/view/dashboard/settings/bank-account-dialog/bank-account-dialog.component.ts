import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BankAccountsService } from 'src/app/_services/financial/bank-accounts.service';
import { LanguageService } from 'src/app/_services/language.service';
import { LoggerService } from 'src/app/_services/logger.service';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-bank-account-dialog',
  templateUrl: './bank-account-dialog.component.html',
  styleUrls: ['./bank-account-dialog.component.scss']
})
export class BankAccountDialogComponent implements OnInit {
  bankForm: FormGroup | any;
  constructor(
    private logger: LoggerService,
    public bankSrv: BankAccountsService,
    public lang: LanguageService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<BankAccountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.bankForm = this.formBuilder.group({
      iban: ['', [Validators.required]],
      bank_id: ['', [Validators.required]],
    })

  }

  ngOnInit(): void {
    if (this.data.account) {
      this.bankForm.get('iban')?.setValue(this.data.account.iban)
    }
  }
  delete() {
    this.bankSrv.deleteBankAccountById(this.data.account.external_id)
    this.onNoClick()
  }
  onNoClick() {
    this.dialogRef.close()
  }
  action() {
    if (this.data.state == 'edit') {
      this.bankSrv.updateBankAccountById(this.bankForm.value, this.data.account.external_id)
      this.onNoClick()

    } else {
      this.bankSrv.createBankAccount(this.bankForm.value)
      this.onNoClick()

    }
  }
}
