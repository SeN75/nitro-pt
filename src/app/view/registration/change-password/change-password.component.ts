import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Counrties } from 'src/app/_common/counties';
import { ConfirmPasswordValidator } from 'src/app/_helpers/confirm-password.validator';
import { IdentityService } from 'src/app/_services/identity/identity.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  resetPassword: FormGroup;
  countriesCode: any[] = Counrties;
  filteredCountriesCode: Observable<string[]> | any;
  hidePassword = true;
  emailControl: FormControl = new FormControl('', [Validators.required, Validators.email])
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
