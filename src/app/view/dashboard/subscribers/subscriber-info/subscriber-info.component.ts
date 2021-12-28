import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { LoggerService } from 'src/app/_services/logger.service';
import { SubscribersService } from 'src/app/_services/subscriptions/subscribers.service';
import { SubscriptionsService } from 'src/app/_services/subscriptions/subscriptions.service';
import { Router } from '@angular/router';
import { RequestDetails, SubscrioptionDetails } from 'src/app/_common/types';

@Component({
  selector: 'app-subscriber-info',
  templateUrl: './subscriber-info.component.html',
  styleUrls: ['./subscriber-info.component.scss']
})
export class SubscriberInfoComponent implements OnInit {
  isLoading = true;
  hasError = false;
  subId = '';
  current_subscription!: SubscrioptionDetails;
  info: any;
  constructor(
    private subscribersSrv: SubscriptionsService,
    private router: Router,
    private logger: LoggerService) { }
  @ViewChild(MatAccordion, { static: false })
  accordion!: MatAccordion;

  ngOnInit(): void {

    this.subId = this.router.url.replace("dashboard/subscribers/", '').replace("/client-details", '').replace('/', '')
    if (this.subId == '')
      this.router.navigateByUrl("/dashboard/subscribers")
    this.getSubDetails()

  }
  getSubDetails() {
    this.isLoading = true
    this.subscribersSrv.__getSubscriptionDetailsById(this.subId).then((success: any) => {
      this.info = success;
      this.current_subscription = success.current_subscription.data;
      this.logger.log('success: ', this.info);
      this.loaded()
    }, (error) => {
      this.hasError = true;
    })
  }

  loaded() {
    setTimeout(() => {
      this.isLoading = false;
    })
  }
}
