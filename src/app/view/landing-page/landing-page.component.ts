import { Component, OnInit,ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor() { }
  rt = localStorage.getItem('refreshToken') ? true : false;

  ngOnInit(): void {

  }

  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "rtl": true,
    "dots": true,
    "margin": 5,
    "infinite": false,
    "centerPadding": '60px',
    "arrows": false,
    "draggable": false,
    "focusOnSelect": true,
    "responsive": [
      {
        "breakpoint": 1200, "settings": {
          "slidesToShow": 3,
          "slidesToScroll": 1,
        }
      },
      {
        "breakpoint": 1024, "settings": {
          "slidesToShow": 2,
          "slidesToScroll": 1,
        }
      },
      {
        "breakpoint": 800, "settings": {
          "slidesToShow": 1,
          "slidesToScroll": 1,
        }
      }
    ]
  };



  @ViewChild('slickModal')
  slickModal!: SlickCarouselComponent;

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();

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
