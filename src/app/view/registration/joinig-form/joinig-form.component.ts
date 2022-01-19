import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Subscription } from 'src/app/_common/types';
import * as imoment from 'moment-hijri';
import { LoggerService } from 'src/app/_services/logger.service';
import { IdentityService } from 'src/app/_services/identity/identity.service';
import { SubscriptionsService } from 'src/app/_services/subscriptions/subscriptions.service';
import { Router } from '@angular/router';
import { PackagesService } from 'src/app/_services/financial/packages.service';
import { DatepickerService } from 'src/app/_services/datepicker.service';
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
  isMove = false;
  caurselPos = 0;
  @ViewChild('slickModal')
  slickModal!: SlickCarouselComponent;

  next() {
    this.isMove = true;
    if (this.subscription.gender == 2 && this.caurselPos == 2) {
      this.caurselPos += 2;
      this.slickModal.slickNext();
      setTimeout(() => {
        this.slickModal.slickNext();
        this.isMove = false;
      }, 500)

    }
    else {
      this.caurselPos++;
      this.slickModal.slickNext();
      setTimeout(() => this.isMove = false, 500);
      if (this.caurselPos != 2)
        this.isFormValid = false;
    }

  }

  prev() {
    this.isMove = true;
    if (this.subscription.gender == 2 && this.caurselPos == 4) {
      this.caurselPos -= 2;
      this.slickModal.slickPrev();
      setTimeout(() => {
        this.slickModal.slickPrev();
        this.isMove = false;
      }, 500)
    } else {
      this.caurselPos--;
      this.slickModal.slickPrev();
      setTimeout(() => this.isMove = false, 500)
    }


  }
  constructor(
    private logger: LoggerService,
    public identitySrv: IdentityService,
    public subSrv: SubscriptionsService,
    public packageSrv: PackagesService,
    private router: Router,
    private dateSrv: DatepickerService
  ) {
    this.subscription = {}
    this.logger.log('packageId: ', this.subSrv.packageId)
    if (this.subSrv.packageId == '')
      this.router.navigateByUrl('/register/join_program')
    this.subscription.package_id = this.subSrv.packageId;
    this.packageSrv.getPackageById(this.subscription.package_id);
    this.logger.log('subscription: ', this.subscription)
    this.identitySrv.getUserProfileByJWT()
    this.logger.log('convert: ', this.replaceNumber('٠١٢٣٤٥٦٧٨٩'))
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
      let birthDate: string = event.data.birthDate
      let isDateHijri = this.dateSrv.isDateHijri(birthDate);

      this.subscription.birthday_Gregorian = isDateHijri ? this.dateSrv.gergorianToString(birthDate, '-') : this.dateSrv.replaceNumber(imoment(birthDate).format('YYYY-MM-DD'));
      this.subscription.birthday_Hiri = isDateHijri ? this.dateSrv.replaceNumber(imoment(birthDate).format('YYYY-MM-DD')) : this.dateSrv.hijriToString(birthDate, '-');
      this.subscription.social_status = event.data.social_status;
      this.subscription.city = event.data.city;
      this.subscription.height = event.data.height;
      this.subscription.weight = event.data.weight;
      this.subscription.gender = event.data.gender;
      this.logger.log('subscription 1:', this.subscription)
    }
    else if (this.caurselPos == 1) {
      this.subscription.nature_of_daily_stress = event.data.workNature == 'office' ? 'مكتبي' : event.data.workNature == 'field' ? 'ميداني' : event.data.workNature;
      this.subscription.health_problems = event.data.healthProblems == 'no' ? 'لايوجد' : event.data.healthProblems;
      this.subscription.supplement_use = event.data.supplements == 'no' ? 'لايوجد' : event.data.supplements;
      this.subscription.goal = event.data.goalProblems;
      this.subscription.sleep_hours = event.data.sleepHours;
      this.subscription.bed_time = event.data.bedTime.replace(" AM", '').replace(" PM", '');
      this.subscription.wakeup_time = event.data.weakupTime.replace(" AM", '').replace(" PM", '');
      this.subscription.current_diet_program = event.data.ditePlan == 'no' ? 'لايوجد' : event.data.ditePlan;
      this.subscription.number_of_meals = event.data.numberMeals == 'no' ? 'لايوجد' : event.data.numberMeals;
      this.subscription.Allergens_food = event.data.allergen == 'no' ? 'لايوجد' : event.data.allergen;
      this.subscription.unfavorable_food = event.data.unlike == 'no' ? 'لايوجد' : event.data.unlike;
      this.subscription.surgeries_history = event.data.operations == 'no' ? 'لايوجد' : event.data.operations;
      this.logger.log('subscription 2:', this.subscription)
    }
    else if (this.caurselPos == 2) {
      let data = { ...event.data }
      this.subscription.method_measurement = data.method_measurement;
      if (this.subscription.method_measurement == 2) {
        this.subscription.calf = data.calves
        this.subscription.chest_circumrefence = data.upperChest;
        this.subscription.lower_chest = data.lowerChest;
        this.subscription.waist = data.hips;
        this.subscription.humerus = data.biceps;
        this.subscription.belly = data.abs;
        this.subscription.thigh = data.quadriceps;
        this.subscription.buttocks = data.hamstrings;
        delete this.subscription.inbody_attachment
      } else {
        delete this.subscription.calf;
        delete this.subscription.chest_circumrefence;
        delete this.subscription.lower_chest;
        delete this.subscription.waist;
        delete this.subscription.humerus;
        delete this.subscription.belly;
        delete this.subscription.thigh;
        delete this.subscription.buttocks;
        this.subscription.inbody_attachment = data.inbody_attachment
      }
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
      this.subscription.payment_invoice = event.data.recipt;
      if (this.packageSrv.package.attach_required)
        this.subscription.other_attachment = event.data.attach

      this.logger.log('subscription 5:', this.subscription)
      this.logger.log('event.send: ', event.send)
      if (event.send)
        this.subSrv.createNewSubscriptionRequest(this.subscription)

    }
  }

  replaceNumber(str: string) {
    return str
      .replace(/٠/g, '0')
      .replace(/١/g, '1')
      .replace(/٢/g, '2')
      .replace(/٣/g, '3')
      .replace(/٤/g, '4')
      .replace(/٥/g, '5')
      .replace(/٦/g, '6')
      .replace(/٧/g, '7')
      .replace(/٨/g, '8')
      .replace(/٩/g, '9')
  }
}
// bankName: ['', Validators.required],
// accountHolder: ['', Validators.required],
// iban: ['', Validators.required],
// recipt: ['',]
