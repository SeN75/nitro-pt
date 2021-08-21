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
  healthInfoForm: FormGroup;
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
      workNature: ['', Validators.required],
      healthProblems: ['no', Validators.required],
      supplements: ['no', Validators.required],
      goalProblems: ['', Validators.required],
      sleepHours: ['', Validators.required],
      bedTime: ['', Validators.required],
      weakupTime: ['', Validators.required],
      ditePlan: ['no', Validators.required],
      numberMeals: ['', Validators.required],
      allergen: ['no', Validators.required],
      unlike: ['no', Validators.required],
      operations: ['no', Validators.required],
    })
    this.healthInfoForm.valueChanges.subscribe(() => {
      console.log("change2")
      this.value.data = this.healthInfoForm.value;
      this.value.valid = this.healthInfoForm.valid;
      this.healthInfo.emit(this.value)
      this.logger.log('form value2: ', this.value)
    })
  }

  ngOnInit(): void {
  }

}
