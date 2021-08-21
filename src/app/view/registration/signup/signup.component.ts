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
      firstName: ['', Validators.required],
      fatherName: ['', Validators.required],
      familyName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      counterCode: ['966', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
      {
        validator: ConfirmPasswordValidator('password', 'confirmPassword')
      }
    )

  }
  get registerFormControl() { return this.registerForm }
  ngOnInit(): void {
  }

  _signup() {
    let data = {
      "username": this.registerForm.get("userName")?.value,
      "email": this.registerForm.get("email")?.value,
      "phone_number": this.registerForm.get('counterCode')?.value + this.registerForm.get('phoneNumber')?.value,
      "password": this.registerForm.get('password')?.value,
      "re_password": this.registerForm.get('password')?.value,
      "role": "member",
      "first_name": this.registerForm.get('firstName')?.value,
      "first_name_ar": this.registerForm.get('firstName')?.value,
      "middle_name": this.registerForm.get('fatherName')?.value,
      "middle_name_ar": this.registerForm.get('fatherName')?.value,
      "last_name": this.registerForm.get('familyName')?.value,
      "last_name_ar": this.registerForm.get('familyName')?.value
    }
    this.logger.log('sign up: ', data)
    this.identitySrv.postCreateUser(data);
  }

}
