import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { Subscription } from 'src/app/_common/types';
import { IdentityService } from 'src/app/_services/identity/identity.service';
import { LoggerService } from 'src/app/_services/logger.service';
import { SubscriptionsService } from 'src/app/_services/subscriptions/subscriptions.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.scss']
})
export class UpdateFormComponent implements OnInit {
  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "rtl": false,
    "dots": true,
    "infinite": false,
    "centerPadding": '20px',
    "arrows": false,
    "draggable": false,
    "focusOnSelect": true,
    "centerMode": true,
    "adaptiveHeight": false,
    "variableWidth": false,
    "variableHeight": false,
    "touchMove": false,
    "swipe": false,


  };
  isFormValid: any;
  caurselPos: number = 0;
  subscription: Subscription;

  @ViewChild('slickModal')
  slickModal!: SlickCarouselComponent;
  isMove: boolean = false;
  constructor(
    public identitySrv: IdentityService,
    public subSrv: SubscriptionsService,
    private router: Router,
    private logger: LoggerService
  ) {
    this.subscription = {}

  }
  next() {
    this.isMove = true;
    if (this.subscription.gender == 2) {
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
    if (this.subscription.gender == 2) {
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
    console.log('event: ', event)
    this.isFormValid = event.valid;
    if (this.caurselPos == 0) {
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
      this.logger.log('subscription 1:', this.subscription)

    }
    else if (this.caurselPos == 1) {
      this.subscription.front_image = event.data.front;
      this.subscription.back_image = event.data.back;
      this.subscription.right_image = event.data.right;
      this.subscription.left_image = event.data.left;
      this.logger.log('subscription 2:', this.subscription)
    }

    // else if (this.caurselPos == 2) { }
  }
  update() {
    this.subSrv.createUpdateDataRequest(this.subscription)
  }
}
