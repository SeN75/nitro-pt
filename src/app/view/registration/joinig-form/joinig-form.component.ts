import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Subscription } from 'src/app/_common/types';
import * as imoment from 'moment-hijri';
import { LoggerService } from 'src/app/_services/logger.service';
@Component({
  selector: 'app-joinig-form',
  templateUrl: './joinig-form.component.html',
  styleUrls: ['./joinig-form.component.scss']
})
export class JoinigFormComponent implements OnInit {
  clientInfo = {
    name_ar: "محمد",
    name: "mehmed"
  }
  subscription: Subscription;
  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "rtl": false,
    "dots": true,
    "infinite": false,
    "centerPadding": '0',
    "arrows": false,
    "draggable": false,
    "focusOnSelect": false,
    "centerMode": true,
    "adaptiveHeight": false,
    "variableWidth": false,
    "variableHeight": false,
    "touchMove": false,
    "swipe": false,
    "responsive": [
      {
        "breakpoint": 578,
        "settings": {
          "centerPadding": '20px',

        }
      },
    ]
  };
  isFormValid = false;
  caurselPos = 0;
  @ViewChild('slickModal')
  slickModal!: SlickCarouselComponent;

  next() {
    this.caurselPos++;
    if (this.caurselPos != 3)
      this.isFormValid = false;
    this.slickModal.slickNext();
  }

  prev() {
    this.caurselPos--;
    this.slickModal.slickPrev();

  }
  constructor(
    private logger: LoggerService
  ) {
    this.subscription = {}
  }

  ngOnInit(): void {
  }
  slickInit(e: any) {
    console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }
  output(event: any) {
    console.log(event)
    this.isFormValid = event.valid;
    if (this.caurselPos == 0) {
      this.subscription.birthday_Gregorian = event.data.birthDate;
      this.subscription.birthday_Hiri = imoment(event.data.birthDate).toString();
      this.subscription.social_status = event.data.social_status;
      this.subscription.city = event.data.city;
      this.subscription.height = event.data.height;
      this.subscription.weight = event.data.weight;
      this.logger.log('subscription 1:', this.subscription)
    }
    else if (this.caurselPos == 1) {
      this.subscription.nature_of_daily_stress = event.data.workNature;
      this.subscription.health_problems = event.data.healthProblems;
      this.subscription.supplement_use = event.data.supplements;
      this.subscription.goal = event.data.goalProblems;
      this.subscription.sleep_hours = event.data.sleepHours;
      this.subscription.bed_time = event.data.bedTime;
      this.subscription.wakeup_time = event.data.weakupTime;
      this.subscription.current_diet_program = event.data.ditePlan;
      this.subscription.number_of_meals = event.data.numberMeals;
      this.subscription.Allergens_food = event.data.allergen;
      this.subscription.unfavorable_food = event.data.unlike;
      this.subscription.surgeries_history = event.data.operations;
      this.logger.log('subscription 2:', this.subscription)
    }
    else if (this.caurselPos == 2) {

      this.subscription.calf = event.data.calves
      this.subscription.chest_circumrefence = event.data.upperChest;
      this.subscription.lower_chest = event.data.lowerChest;
      this.subscription.waist = event.data.hips;
      this.subscription.humerus = event.data.biceps;
      this.subscription.belly = event.data.abs;
      this.subscription.thigh = event.data.quadriceps;
      this.subscription.buttocks = event.data.hamstrings;
      this.logger.log('subscription 3:', this.subscription)
    }
    else if (this.caurselPos == 3) {
      this.subscription.front_image = event.data.front;
      this.subscription.back_image = event.data.back;
      this.subscription.right_image = event.data.right;
      this.subscription.left_image = event.data.left;
      this.logger.log('subscription 4:', this.subscription)
    }
    else if (this.caurselPos == 4) {
      this.subscription.payment_invoice = event.data.payment_invoice;
      this.logger.log('subscription 5:', this.subscription)

    }
  }
}
// bankName: ['', Validators.required],
// accountHolder: ['', Validators.required],
// iban: ['', Validators.required],
// recipt: ['',]
