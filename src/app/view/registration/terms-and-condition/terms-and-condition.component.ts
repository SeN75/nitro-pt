import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { IdentityService } from 'src/app/_services/identity/identity.service';
import { SubscriptionsService } from 'src/app/_services/subscriptions/subscriptions.service';

@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.component.html',
  styleUrls: ['./terms-and-condition.component.scss']
})
export class TermsAndConditionComponent implements OnInit {
  clientInfo = {
    name_ar: "محمد",
    name: "mehmed"
  }
  isAggre: boolean = false;
  arr = [1, 2, 3, 4, 5]
  arr2 = [1, 2, 3, 4]
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


  };
  @ViewChild('slickModal')
  slickModal!: SlickCarouselComponent;

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();

  }
  constructor(
    public identitySrv: IdentityService,
    public subSrv: SubscriptionsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.subSrv.packageId == '')
      this.router.navigateByUrl('/register/join_program')
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
}
