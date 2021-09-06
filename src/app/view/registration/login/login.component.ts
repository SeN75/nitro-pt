import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IdentityService } from 'src/app/_services/identity/identity.service';
import { LoggerService } from 'src/app/_services/logger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;
  constructor(
    private identitySrv: IdentityService,
    private logger: LoggerService,
    private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required]],
    })
    console.log(this.loginForm.controls)
  }
  get loginFormControl() { return this.loginForm };
  ngOnInit(): void {
  }
  _login() {
    this.identitySrv.login(this.loginForm.value)
  }
}
