import { Component, OnInit, ViewChild } from '@angular/core';
import { packages } from 'src/app/_common/globle';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { LanguageService } from 'src/app/_services/language.service';

@Component({
  selector: 'app-select-program',
  templateUrl: './select-program.component.html',
  styleUrls: ['./select-program.component.scss']
})
export class SelectProgramComponent implements OnInit {
  clientInfo = {
    name_ar: "محمد",
    name: "mehmed"
  }
  packages = packages;
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
  constructor(public lang: LanguageService) { }

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
