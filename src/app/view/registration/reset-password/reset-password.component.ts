import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Counrties } from 'src/app/_common/counties';
import { IdentityService } from './../../../_services/identity/identity.service';
import { ConfirmPasswordValidator } from './../../../_helpers/confirm-password.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPassword: FormGroup;
  countriesCode: any[] = Counrties;
  filteredCountriesCode: Observable<string[]> | any;
  hidePassword = true;
  constructor(private identitySrv: IdentityService, private formBuilder: FormBuilder) {
    this.resetPassword = this.formBuilder.group({
      countryCode: ['966', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validator: ConfirmPasswordValidator("password", "confirmPassword")
    })
    this.filteredCountriesCode = this.resetPassword.get("countryCode")?.valueChanges.pipe(
      startWith('+966'),
      map(value => this._filterCountriesCode(value))

    )
  }
  test() {
    console.log(this.resetPassword)

  }
  get resetPasswordControl() { return this.resetPassword }
  ngOnInit(): void {
  }
  private _filterCountriesCode(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.countriesCode.filter((option) => option.phone_code.includes(filterValue));
  }

}
