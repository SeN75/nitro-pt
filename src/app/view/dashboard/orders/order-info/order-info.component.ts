import { AfterViewInit, Component, OnInit } from '@angular/core';
import { LoggerService } from 'src/app/_services/logger.service';
import { SubscriptionsService } from 'src/app/_services/subscriptions/subscriptions.service';
import { RequestDetails, Subscription, HealthInfo, BodyInfo, FinanceInfo } from './../../../../_common/types';
import { PersonalDetails } from 'src/app/_common/types';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent implements OnInit, AfterViewInit {

  body_info!: BodyInfo;
  finance_info!: FinanceInfo;
  health_info!: HealthInfo;
  media!: Subscription;
  personal_info!: PersonalDetails;
  request_info!: Subscription;
  counter = 0;
  info = {
    personalData: {
      name: "محمد شلبي",
      phone_number: "0551594683",
      birthday_Gregorian: "2020-02-21",
      social_status: "اعزب",
      gender: "ذكر",
      height: 180,
      weight: 80,
      city: 0
    },
    subscriber: {
      Allergens_food: '',
      bed_time: '',
      current_diet_program: '',
      goal: '',
      health_problems: '',
      nature_of_daily_stress: '',
      number_of_meals: 0,
      sleep_hours: 0,
      supplement_use: '',
      surgeries_history: '',
      unfavorable_food: '',
      wakeup_time: '',
    },
    bodyMeasurements: {
      chest_circumrefence: 0,
      lower_chest: 0,
      waist: 0,
      belly: 0,
      thigh: 0,
      buttocks: 0,
      calf: 0,
      humerus: 0,
      weight: 0

    },
    bodyImg: {
      back_image: '',
      front_image: '',
      left_image: '',
      right_image: ''
    },
    request_info: {
      created_date: "",
      request_id: 0,
      request_type: "",
      status: "",
    },
    finance_info: {
      account_owner: '',
      bank: '',
      iban: '',
      package: '',
      price: 0
    }
  }

  requestDetails!: RequestDetails

  constructor(
    private subscriptionSrv: SubscriptionsService,
    private logger: LoggerService) { }
  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    setTimeout(() => this.checkData(), 800)
  }
  checkData() {
    this.requestDetails = this.subscriptionSrv.requestDetails;
    this.info.personalData = this.requestDetails.personal_info;
    this.info.subscriber = this.requestDetails.health_info;
    this.info.bodyMeasurements = this.requestDetails.body_info;
    this.info.bodyMeasurements.weight = this.info.personalData.weight;
    this.info.request_info = this.requestDetails.request_info;
    this.info.finance_info = this.requestDetails.finance_info;
    this.info.bodyImg = this.requestDetails.media;
    this.logger.log('requestDetails', this.requestDetails)
  }

  sendRequest(isApproved: boolean) {
    this.subscriptionSrv.createApproveOrDenayRequest({ is_approved: isApproved, request_id: this.info.request_info.request_id, comment: '' })
  }
}
