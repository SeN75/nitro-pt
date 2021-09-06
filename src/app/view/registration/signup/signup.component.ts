import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      counterCode: ['966', Validators.required],
      phone_number: ['', [Validators.required, Validators.minLength(9)]],
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
    data.phone_number = "+" + data.counterCode + data.phone_number;
    delete data.counterCode;
    data.role = "member";
    data.first_name = data.username;
    data.middle_name = data.username;
    data.last_name = data.username;
    this.logger.log('sign up: ', data)
    this.identitySrv.postCreateUser(data);
  }

}
