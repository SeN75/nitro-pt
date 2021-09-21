import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { LanguageService } from 'src/app/_services/language.service';
import { LoggerService } from 'src/app/_services/logger.service';
import { cities } from './../../../../_common/cities';

@Component({
  selector: 'joining-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  @Output() personalInfo: any = new EventEmitter<any>();
  cities = cities;
  personalInfoForm: FormGroup;
  birthDateDay: FormControl = new FormControl({ value: '', disabled: true }, Validators.required);
  birthDateMonth: FormControl = new FormControl('', Validators.required);
  birthDateYear: FormControl = new FormControl('', Validators.required);
  numberDaysInMonth: any = 0;
  value = {
    valid: false,
    data: {}
  }
  constructor(
    private formBuilder: FormBuilder,
    private logger: LoggerService,
    public lang: LanguageService) {
    this.personalInfoForm = this.formBuilder.group({
      birthDate: ['', Validators.required],
      social_status: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      gender: ['male', Validators.required],
      city: ['', Validators.required]
    })
    this.personalInfoForm.valueChanges.subscribe(() => { this.isValid() })
  }

  ngOnInit(): void {
  }
  daysInMonth(month: any, year: any) {
    return new Date(year, month, 0).getDate();
  }

  /**
   * return with new Array of number
   */
  counter(i: number) {
    return new Array(i);
  }
  setNumberDaysInMonth() {
    if (this.birthDateMonth.value && this.birthDateYear.valid) {
      this.birthDateDay.enable()
      this.numberDaysInMonth = this.daysInMonth(this.birthDateMonth.value, this.birthDateYear.value)
    }
  }
  setBirthDate() {
    if (this.birthDateDay.valid && this.birthDateMonth.valid && this.birthDateYear.valid) {
      let date = this.birthDateMonth.value + "/" + this.birthDateDay.value + "/" + this.birthDateYear.value
      this.personalInfoForm.get('birthDate')?.setValue(new Date(date))
      this.logger.log('personalInfoForm:', this.personalInfoForm.value)
      this.logger.log('date:', date)
    }
  }
  getYears() {
    let listYears = [];
    const CURRENT_YEAR: any = (new Date().getFullYear());
    for (let index = CURRENT_YEAR; index >= CURRENT_YEAR - 40; index--) {
      listYears.push(index);
    }
    return listYears;
  }

  isValid() {
    console.log("change")
    this.value.valid = this.personalInfoForm.valid;
    this.value.data = this.personalInfoForm.value;
    this.personalInfo.emit(this.value);
    this.logger.log('form value: ', this.value)
  }
}
