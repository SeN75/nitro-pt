import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Counrties } from 'src/app/_common/counties';
import { ConfirmPasswordValidator } from './../../../_helpers/confirm-password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  hidePassword = true;
  countriesCode = Counrties;
  constructor(private formBuilder: FormBuilder) {
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
    console.log(this.registerForm)
  }

}
