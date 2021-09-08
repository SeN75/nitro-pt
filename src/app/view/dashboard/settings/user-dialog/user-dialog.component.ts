import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Counrties } from 'src/app/_common/counties';
import { ConfirmPasswordValidator } from 'src/app/_helpers/confirm-password.validator';
import { IdentityService } from 'src/app/_services/identity/identity.service';
import { LanguageService } from 'src/app/_services/language.service';
import { LoggerService } from 'src/app/_services/logger.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  userDataForm: FormGroup;
  hidePassword = true;
  countriesCode = Counrties;
  constructor(
    private formbuilder: FormBuilder,
    public lang: LanguageService,
    private logger: LoggerService,
    private identitySrv: IdentityService,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
    this.userDataForm = this.formbuilder.group({
      first_name_ar: ['', [Validators.required, Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$")]],
      middle_name_ar: ['', [Validators.required, Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$")]],
      last_name_ar: ['', [Validators.required, Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$")]],
      first_name: ['', [Validators.required, Validators.pattern("[A-Za-z]")]],
      middle_name: ['', [Validators.required, Validators.pattern("[A-Za-z]")]],
      last_name: ['', [Validators.required, Validators.pattern("[A-Za-z]")]],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      counterCode: ['966', Validators.required],
      phone_number: ['', [Validators.required, Validators.minLength(9)]],
      // Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
      password: ['', [Validators.required, Validators.minLength(8)]],
      re_password: ['', Validators.required],
    },
      {
        validator: ConfirmPasswordValidator('password', 're_password')

      })
  }

  ngOnInit(): void {
    if (this.data.user) {
      this.userDataForm.get('first_name_ar')?.setValue(this.data.user.first_name_ar)
      this.userDataForm.get('first_name')?.setValue(this.data.user.first_name)
      this.userDataForm.get('middle_name_ar')?.setValue(this.data.user.middle_name_ar)
      this.userDataForm.get('middle_name')?.setValue(this.data.user.middle_name)
      this.userDataForm.get('last_name_ar')?.setValue(this.data.user.last_name_ar)
      this.userDataForm.get('last_name')?.setValue(this.data.user.last_name)
      this.userDataForm.get('email')?.setValue(this.data.user.email)
      this.userDataForm.get('username')?.setValue(this.data.user.last_name)
      this.userDataForm.get('phone_number')?.setValue(this.data.user.phone_number.split('+966')[1])
      this.userDataForm.get('password')?.setValue('123456798')
      this.userDataForm.get('re_password')?.setValue('123456798')
    }
  }
  onNoClick() {
    this.dialogRef.close()
  }
  delete() {

  }
  action() {
    if (this.data.state == 'edit') {
      let data = this.userDataForm.value;
      delete data.password;
      delete data.re_password;
      delete data.username;
      data.phone_number = "+" + data.counterCode + data.phone_number;

      this.identitySrv.updateDataUserDataById(data, this.data.user.external_id)
    } else {
      let data = this.userDataForm.value;
      data.role = this.data.path;
      data.phone_number = "+" + data.counterCode + data.phone_number;
      this.identitySrv.postCreateUser(this.userDataForm.value)
    }
  }
}
