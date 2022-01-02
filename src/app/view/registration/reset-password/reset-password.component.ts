import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Counrties } from 'src/app/_common/counties';
import { ConfirmPasswordValidator } from 'src/app/_helpers/confirm-password.validator';
import { IdentityService } from './../../../_services/identity/identity.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  emailControl: FormControl = new FormControl('', [Validators.required, Validators.email]);
  resetPasswordForm: any;
  hidePassword = true;
  constructor(
    private identitySrv: IdentityService,
    private formBuilder: FormBuilder,
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      new_password: ['', [Validators.required]],
      re_new_password: ['', [Validators.required]],
      current_password: ['', [Validators.required]],
    }, {
      validator: ConfirmPasswordValidator("new_password", "re_new_password")

    })
  }
  ngOnInit(): void {
  }
  resetPassword() {
    this.identitySrv.resetPassword({ email: this.emailControl.value })
  }

}


