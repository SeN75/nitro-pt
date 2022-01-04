import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Counrties } from 'src/app/_common/counties';
import { LoggerService } from './../../../_services/logger.service';
import { IdentityService } from 'src/app/_services/identity/identity.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  countriesCode = Counrties;
  phoneNumber: FormControl = new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)])
  counterCode: FormControl = new FormControl('966', Validators.required)
  constructor(
    private logger: LoggerService,
    private identitySrv: IdentityService
  ) { }

  ngOnInit(): void {
  }
  action() {
    let mobile = "+" + this.counterCode.value + this.phoneNumber.value;
    this.identitySrv.generateOTP({ phone_number: mobile });
  }
}
