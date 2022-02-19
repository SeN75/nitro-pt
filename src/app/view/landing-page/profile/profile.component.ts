import { Component, OnInit } from '@angular/core';
import { MemberProfile } from 'src/app/_common/types';
import { LanguageService } from 'src/app/_services/language.service';
import { LoggerService } from 'src/app/_services/logger.service';
import { IdentityService } from './../../../_services/identity/identity.service';
import { SubscriptionsService } from './../../../_services/subscriptions/subscriptions.service';
import { ClosedRequest } from './../../../_common/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  pack = [
    { first_name_ar: 'احمد', middle_name_ar: 'محمد', start_date: '2021/01/01', end_date: '2021/01/01', memebership: "#1101545", status: 'newly' }
  ]
  order = [
    { order_no: "#1212", type: 'طلب جديد', status: 'قيد المعالجة', notes: '-' }
  ]
  userData!: MemberProfile;
  closed_requests!: ClosedRequest[];
  isLoading = true;
  hasError = false;
  constructor(
    public identitySrv: IdentityService,
    public lang: LanguageService,
    private subSrv: SubscriptionsService,
    private logger: LoggerService

  ) { }

  ngOnInit(): void {
    this.getProfile()
  }
  getProfile() {
    this.isLoading = true;
    this.hasError = false;
    this.identitySrv.getUserProfileByJWT()
    this.subSrv.__getMemberData().subscribe((s: any) => {
      this.userData = s
      this.loaded();
      this.logger.log('user profile: ', this.userData)
      this.closed_requests = this.userData.closed_requests
    }, (error) => {
      this.hasError = true;
    })
  }
  loaded() {
    setTimeout(() => this.isLoading = false, 500)
  }
  isSubscriptionExist() {
    // return Object.entries(this.userData.subscription).length == 0;
    return true
  }
}
