import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/_services/language.service';
import { LoggerService } from 'src/app/_services/logger.service';

@Component({
  selector: 'joining-health-info',
  templateUrl: './health-info.component.html',
  styleUrls: ['./health-info.component.scss']
})
export class HealthInfoComponent implements OnInit {
  @Output() healthInfo: any = new EventEmitter<any>();
  healthInfoForm: FormGroup | any;
  value = {
    valid: false,
    data: {}
  }
  constructor(
    private formBuilder: FormBuilder,
    private logger: LoggerService,
    public lang: LanguageService,

  ) {
    this.healthInfoForm = this.formBuilder.group({
      workNature: ['', [Validators.required, Validators.pattern('^[\u0621-\u064A\u0660-\u0669-\u0900-\u097F ]+$')]],
      healthProblems: ['لا يوجد', [Validators.required, Validators.pattern('^[\u0621-\u064A\u0660-\u0669-\u0900-\u097F-0-9 ]+$')]],
      supplements: ['لا يوجد', [Validators.required,]],
      goalProblems: ['', [Validators.required, Validators.pattern('^[\u0621-\u064A\u0660-\u0669-\u0900-\u097F-0-9 ]+$')]],
      // Validators.pattern('[0-2]{1}[0-9]{1}')
      sleepHours: ['', [Validators.required,]],
      bedTime: ['', Validators.required],
      weakupTime: ['', Validators.required],
      ditePlan: ['لا يوجد', [Validators.required, Validators.pattern('^[\u0621-\u064A\u0660-\u0669-\u0900-\u097F-0-9 ]+$')]],
      numberMeals: ['', Validators.required],
      allergen: ['لا يوجد', [Validators.required, Validators.pattern('^[\u0621-\u064A\u0660-\u0669-\u0900-\u097F-0-9 ]+$')]],
      unlike: ['لا يوجد', [Validators.required, Validators.pattern('^[\u0621-\u064A\u0660-\u0669-\u0900-\u097F-0-9 ]+$')]],
      operations: ['لا يوجد', [Validators.required, Validators.pattern('^[\u0621-\u064A\u0660-\u0669-\u0900-\u097F-0-9 ]+$')]],
    })
    this.healthInfoForm.valueChanges.subscribe(() => {
      console.log("change2")
      setTimeout(() => this.output(), 600)
    });

  }

  ngOnInit(): void {


  }
  output() {
    console.log('fdafafadfd')
    this.value.data = this.healthInfoForm.value;
    this.value.valid = this.healthInfoForm.valid;
    this.healthInfo.emit(this.value)
    this.logger.log('form value2: ', this.value)
  }
}
