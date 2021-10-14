import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Counrties } from 'src/app/_common/counties';
import { ConfirmPasswordValidator } from './../../../_helpers/confirm-password.validator';
import { IdentityService } from 'src/app/_services/identity/identity.service';
import { LoggerService } from 'src/app/_services/logger.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  hidePassword = true;
  countriesCode = Counrties;
  counterCode: FormControl = new FormControl('966');
  phoneNumber: FormControl = new FormControl('', [Validators.required, Validators.minLength(9)])
  constructor(
    private formBuilder: FormBuilder,
    private identitySrv: IdentityService,
    private logger: LoggerService
  ) {
    this.registerForm = this.formBuilder.group({
      first_name_ar: ['', [Validators.required, Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$")]],
      middle_name_ar: ['', [Validators.required, Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$")]],
      last_name_ar: ['', [Validators.required, Validators.pattern("^[\u0621-\u064A\u0660-\u0669 ]+$")]],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      // phone_number: ['', [Validators.required, Validators.minLength(9)]],
      // Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")
      password: ['', [Validators.required, Validators.minLength(8)]],
      re_password: ['', Validators.required],
    },
      {
        validator: ConfirmPasswordValidator('password', 're_password')
      }
    )

  }
  get registerFormControl() { return this.registerForm }
  ngOnInit(): void {
  }

  _signup() {
    let data: any = this.registerForm.value;
    data.phone_number = "+" + this.counterCode.value + this.phoneNumber.value;
    data.role = "member";
    data.first_name = 'dd';
    data.middle_name = 'dd';
    data.last_name = 'dd';
    this.logger.log('sign up: ', data)
    this.identitySrv.postCreateUser(this.registerForm.value);

  }

}
