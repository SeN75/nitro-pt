import { Component, OnInit, ViewChildren, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { LoggerService } from 'src/app/_services/logger.service';
import { IdentityService } from 'src/app/_services/identity/identity.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  mobile = '';
  type = '';
  autoInput: FormControl = new FormControl('', [Validators.maxLength(6)]);
  constructor(
    private logger: LoggerService,
    private Router: Router,
    private identitySrv: IdentityService,
    private activeRoute: ActivatedRoute
  ) {
    this.otpForm = this.toFormGroup(this.formInput)
    this.countDown()
    let phone_number = this.Router.url.replace('register/otp_verify/%2B', '');
    // this.identitySrv.getUserProfileByJWT();
    this.logger.log('test', phone_number.replace('/', ''))
    this.activeRoute.queryParams.subscribe(root => {
      if (root.p)
        this.mobile = root.p;
      if (root.t)
        this.type = root.t;

      this.mobile = this.mobile.trim();
      this.type = this.type.trim();

      this.logger.log("mobile: ", this.mobile);
      this.logger.log('type: ', this.type)
    })
    this.autoInput.valueChanges.subscribe(value => {
      if (value.length == this.formInput.length)
        for (let i = 0; i < value.length; i++) {
          this.otpForm.get(`input${i + 1}`)?.setValue(value[i]);
        }
    })
  }


  ngOnInit(): void {
    this.otpRequest();
  }
  async otpRequest() {
    if ('OTPCredential' in window) {
      const abortController = new AbortController();
      let timer = setTimeout(() => {
        abortController.abort();
      }, 10 * 1000);

      let o: any = {
        otp: { transport: ['sms'] },
        signal: abortController.signal
      };

      const content = await window.navigator['credentials'].get(o);
      this.autoInput.setValue(content);
      //do what ever you want to do with the received code, probably send it to server
    }
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
      this.identitySrv.verifyOTP({ otp: this.autoInput.value, phone_number: '+' + this.mobile.trim() }, this.type);
      this.logger.log('otp: ', code)
    }
  }
}
