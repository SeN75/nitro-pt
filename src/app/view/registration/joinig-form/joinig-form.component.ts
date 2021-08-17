import { Component, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

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
  arr = [1, 2, 3, 4, 5]
  arr2 = [1, 2, 3, 4]
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
  };
  caurselPos = 0;
  @ViewChild('slickModal')
  slickModal!: SlickCarouselComponent;

  next() {
    this.caurselPos++;
    this.slickModal.slickNext();
  }

  prev() {
    this.caurselPos--;
    this.slickModal.slickPrev();

  }
  constructor() { }

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
}
