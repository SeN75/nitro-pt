import { Injectable } from '@angular/core';
import { API } from 'src/app/_helpers/api.config';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from '../logger.service';
import { ToastService } from '../toast.service';
import { Subscription } from 'src/app/_common/types';

const subApi = API + "sub/"
@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {
  subscrioptionList: any = [];
  requestListl: any = [];
  genderList: any[] = [];
  soucialStatueList: any[] = [];

  subscriper: any;
  request: any;


  constructor(
    private httpClient: HttpClient,
    private translateSrv: TranslateService,
    private toastSrv: ToastService,
    private router: Router,
    private logger: LoggerService
  ) { }

  private _createNewSubscriptionRequest(data: FormData) {
    return this.httpClient.post(subApi + "new", data)
  }
  private _createUpdateDataRequest(data: FormData) {
    return this.httpClient.post(subApi + "update/new", data)
  }
  private _createApproveOrDenayRequest(data: Subscription) {
    return this.httpClient.post(subApi + "approve", data)
  }
  private _getGenderList() {
    return this.httpClient.get(API + 'auth/genders');
  }
  private _getSocialStatusList() {
    return this.httpClient.get(API + 'auth/social_status')
  }
  private _briefSubscriptionsList() {
    return this.httpClient.get(subApi + 'brief/list');
  }
  private _briefRequestsList() {
    return this.httpClient.get(subApi + 'requests/brief/list')
  }
  private _getRequestDetailsById(id: string) {
    return this.httpClient.get(subApi + 'requests/info/' + id);
  }
  private _getSubscriptionDetailsById(id: string) {
    return this.httpClient.get(subApi + "info/?id=" + id)
  }


  public createNewSubscriptionRequest(data: Subscription) {
    const formData = new FormData()
    let front_image: File;
    let back_image: File;
    let left_image: File;
    let right_image: File;
    let payment_invoice: File;
    let other_attachment: File;

    if (data.front_image) {
      front_image = data.front_image;
      formData.append('front_image', front_image)
    }
    if (data.back_image) {
      back_image = data.back_image;
      formData.append('back_image', back_image)
    }
    if (data.left_image) {
      left_image = data.left_image;
      formData.append('left_image', left_image)
    }
    if (data.right_image) {
      right_image = data.right_image;
      formData.append('right_image', right_image)
    }
    if (data.payment_invoice) {
      payment_invoice = data.payment_invoice;
      formData.append('payment_invoice', payment_invoice)
    }
    if (data.other_attachment) {
      other_attachment = data.other_attachment;
      formData.append('other_attachment', other_attachment)
    }
    formData.append('city', data.city + "");
    formData.append('birthday_Hiri', data.birthday_Hiri + "");
    formData.append('birthday_Gregorian', data.birthday_Gregorian + "");
    formData.append('height', data.height + "");
    formData.append('weight', data.weight + "");
    formData.append('nature_of_daily_stressty', data.nature_of_daily_stress + "");
    formData.append('health_problems', data.health_problems + "");
    formData.append('supplement_use', data.supplement_use + "");
    formData.append('goal', data.goal + "");
    formData.append('sleep_hours', data.sleep_hours + "");
    formData.append('wakeup_time', data.wakeup_time + "");
    formData.append('bed_time', data.bed_time + "");
    formData.append('number_of_meals', data.number_of_meals + "");
    formData.append('current_diet_program', data.current_diet_program + "");
    formData.append('unfavorable_food', data.unfavorable_food + "");
    formData.append('chest_circumrefence', data.chest_circumrefence + "");
    formData.append('lower_chest', data.lower_chest + "");
    formData.append('waist', data.waist + "");
    formData.append('belly', data.belly + "");
    formData.append('buttocks', data.buttocks + "");
    formData.append('thigh', data.thigh + "");
    formData.append('calf', data.calf + "");
    formData.append('humerus', data.humerus + "");
    formData.append('package_id', data.package_id + "");
    formData.append('social_status', data.social_status + "");
    formData.append('gender', data.gender + "");
    formData.append('Allergens_food', data.Allergens_food + "");
    formData.append('surgeries_history', data.surgeries_history + "");

    this._createNewSubscriptionRequest(formData).subscribe((success: Subscription) => {
      this.logger.log('create new subscrioption request: ', success)
      this.translateSrv.get('SUCCESS.SUBSCRIOPTION.new').subscribe(msg => this.toastSrv.success(msg))
      this.router.navigateByUrl('/')
    }, (error: HttpErrorResponse) => {
      this.logger.error('create new subscrioption request error: ', error)
      this.translateSrv.get('ERRORS.SUBSCRIOPTION.new').subscribe(msg => this.toastSrv.error(msg))
    })
  }
  createUpdateDataRequest(data: Subscription) {
    const formData = new FormData()
    let front_image: File;
    let back_image: File;
    let left_image: File;
    let right_image: File;
    let payment_invoice: File;
    let other_attachment: File;
    if (data.front_image) {
      front_image = data.front_image;
      formData.append('front_image', front_image)
    }
    if (data.back_image) {
      back_image = data.back_image;
      formData.append('back_image', back_image)
    }
    if (data.left_image) {
      left_image = data.left_image;
      formData.append('left_image', left_image)
    }
    if (data.right_image) {
      right_image = data.right_image;
      formData.append('right_image', right_image)
    }
    if (data.payment_invoice) {
      payment_invoice = data.payment_invoice;
      formData.append('payment_invoice', payment_invoice)
    }
    if (data.other_attachment) {
      other_attachment = data.other_attachment;
      formData.append('other_attachment', other_attachment)
    }
    if (data.city)
      formData.append('city', data.city + "");
    if (data.birthday_Hiri)
      formData.append('birthday_Hiri', data.birthday_Hiri + "");
    if (data.birthday_Gregorian)
      formData.append('birthday_Gregorian', data.birthday_Gregorian + "");
    if (data.height)
      formData.append('height', data.height + "");
    if (data.weight)
      formData.append('weight', data.weight + "");
    if (data.nature_of_daily_stress)
      formData.append('nature_of_daily_stressty', data.nature_of_daily_stress + "");
    if (data.health_problems)
      formData.append('health_problems', data.health_problems + "");
    if (data.supplement_use)
      formData.append('supplement_use', data.supplement_use + "");
    if (data.goal)
      formData.append('goal', data.goal + "");
    if (data.sleep_hours)
      formData.append('sleep_hours', data.sleep_hours + "");
    if (data.wakeup_time)
      formData.append('wakeup_time', data.wakeup_time + "");
    if (data.bed_time)
      formData.append('bed_time', data.bed_time + "");
    if (data.number_of_meals)
      formData.append('number_of_meals', data.number_of_meals + "");
    if (data.current_diet_program)
      formData.append('current_diet_program', data.current_diet_program + "");
    if (data.unfavorable_food)
      formData.append('unfavorable_food', data.unfavorable_food + "");
    if (data.chest_circumrefence)
      formData.append('chest_circumrefence', data.chest_circumrefence + "");
    if (data.lower_chest)
      formData.append('lower_chest', data.lower_chest + "");
    if (data.waist)
      formData.append('waist', data.waist + "");
    if (data.belly)
      formData.append('belly', data.belly + "");
    if (data.buttocks)
      formData.append('buttocks', data.buttocks + "");
    if (data.thigh)
      formData.append('thigh', data.thigh + "");
    if (data.calf)
      formData.append('calf', data.calf + "");
    if (data.humerus)
      formData.append('humerus', data.humerus + "");
    if (data.package_id)
      formData.append('package_id', data.package_id + "");
    if (data.social_status)
      formData.append('social_status', data.social_status + "");
    if (data.gender)
      formData.append('gender', data.gender + "");
    if (data.Allergens_food)
      formData.append('Allergens_food', data.Allergens_food + "");
    if (data.surgeries_history)
      formData.append('surgeries_history', data.surgeries_history + "");

    this._createUpdateDataRequest(formData).subscribe((success: Subscription) => {
      this.logger.log('create update data request: ', success)
      this.translateSrv.get('SUCCESS.SUBSCRIOPTION.update').subscribe(msg => this.toastSrv.success(msg))
    }, (error: HttpErrorResponse) => {
      this.logger.error('create subscrioption request error: ', error)
      this.translateSrv.get('ERRORS.SUBSCRIOPTION.update').subscribe(msg => this.toastSrv.error(msg))
    })
  }
  public createApproveOrDenayRequest(data: Subscription) {
    this._createApproveOrDenayRequest(data).subscribe((success: Subscription) => {
      this.logger.log('create approve or denay request: ', success)
      this.translateSrv.get('SUCCESS.SUBSCRIOPTION.approve').subscribe(msg => this.toastSrv.success(msg))
    }, (error: HttpErrorResponse) => {
      this.logger.log('create approve or denay request error: ', error)
      this.translateSrv.get('ERRORS.SUBSCRIOPTION.approve').subscribe(msg => this.toastSrv.error(msg))
    })
  }

  public briefSubscriptionsLis() {
    this._briefSubscriptionsList().subscribe((success: any) => {
      this.logger.log('briefSubscriptionsLis: ', success)
      this.subscrioptionList = success;
    }, (error: HttpErrorResponse) => {
      this.logger.error('briefSubscriptionsLis: ', error)
    })
  }
  public briefRequestsList() {
    this._briefRequestsList().subscribe((success: any) => {
      this.logger.log('briefRequestsList: ', success)
      this.requestListl = success;
    }, (error: HttpErrorResponse) => {
      this.logger.error('briefRequestsList: ', error)
    })
  }

  public getRequestDetailsById(id: string) {
    this._getRequestDetailsById(id).subscribe((success: any) => {
      this.logger.log('getRequestDetailsById: ', success)
      this.request = success;
    }, (error: HttpErrorResponse) => {
      this.logger.error('getRequestDetailsById: ', error)
    })
  }
  public getSubscriptionDetailsById(id: string) {
    this._getSubscriptionDetailsById(id).subscribe((success: any) => {
      this.logger.log('getSubscriptionDetailsById: ', success)
      this.subscriper = success;
    }, (error: HttpErrorResponse) => {
      this.logger.error('getSubscriptionDetailsById: ', error)
    })
  }
  public getGenderList() {
    this._getGenderList().subscribe((success: any) => {
      this.logger.log('getGenderList: ', success)
      this.genderList = success;
    }, (error: HttpErrorResponse) => {
      this.logger.error('getGenderList: ', error)
    })
  }
  public getSocialStatusList() {
    this._getSocialStatusList().subscribe((success: any) => {
      this.logger.log('getSocialStatusList: ', success)
      this.soucialStatueList = success;
    }, (error: HttpErrorResponse) => {
      this.logger.error('getSocialStatusList: ', error)
    })
  }
}
