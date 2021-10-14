import { Component, OnInit, ViewChildren, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { LoggerService } from 'src/app/_services/logger.service';
import { IdentityService } from 'src/app/_services/identity/identity.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {
  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  countDownCount = 0;
  seconds = 0;
  minutes = 0;
  otpForm: FormGroup;
  @ViewChildren('formRow') rows: any;
  constructor(
    private logger: LoggerService,
    private identitySrv: IdentityService
  ) {
    this.otpForm = this.toFormGroup(this.formInput)
    this.countDown()
    this.identitySrv.getUserProfileByJWT();

  }


  ngOnInit(): void {
  }
  toFormGroup(elements: any) {
    const group: any = {};
    elements.forEach((key: any) => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }
  keyUpEvent(event: any, index: number) {
    let pos = index;
    console.log(event)
    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1;
    } else {
      pos = index + 1;
    }
    if (pos > -1 && pos < this.formInput.length) {
      this.rows._results[pos].nativeElement.focus();
    }
  }
  countDown() {
    if (this.countDownCount == 0) {
      this.seconds = 0;
      this.minutes = 2
      this.countDownCount++;
      setInterval(() => {
        if ((this.minutes - 1) >= 0 && this.seconds <= 0) {
          this.minutes--
          this.seconds = 59;
        } else if (this.minutes >= 0 && this.seconds <= 59 && this.seconds > 0) {
          this.seconds--;
        } else {
          clearInterval()
        }
      }, 1000)
    }
  }


  submit() {
    if (this.otpForm.valid) {
      let code = '';
      this.formInput.forEach(e => code += this.otpForm.get(e)?.value)
      this.identitySrv.verifyOTP({ otp: code, phone_number: this.identitySrv.userData.phone_number });
      this.logger.log('otp: ', code)
    }
  }
}
