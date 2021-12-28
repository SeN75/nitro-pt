import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Counrties } from 'src/app/_common/counties';
import { IdentityService } from './../../../_services/identity/identity.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  emailControl: FormControl = new FormControl('', [Validators.required, Validators.email])
  constructor(private identitySrv: IdentityService) {

  }
  ngOnInit(): void {
  }
  resetPassword() {
    this.identitySrv.resetPassword({ email: this.emailControl.value })
  }

}
