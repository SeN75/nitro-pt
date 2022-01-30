import { Component, OnInit, ViewChild } from '@angular/core';
import { packages } from 'src/app/_common/globle';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { LanguageService } from 'src/app/_services/language.service';
import { IdentityService } from 'src/app/_services/identity/identity.service';
import { PackagesService } from 'src/app/_services/financial/packages.service';
import { LoggerService } from 'src/app/_services/logger.service';

@Component({
  selector: 'app-select-program',
  templateUrl: './select-program.component.html',
  styleUrls: ['./select-program.component.scss']
})
export class SelectProgramComponent implements OnInit {
  clientInfo = {
    first_name_ar: "محمد",
    first_name: "mehmed"
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
        "breakpoint": 2000, "settings": {
          "slidesToShow": 3,
          "slidesToScroll": 1,
        }
      },
      {
        "breakpoint": 1524, "settings": {
          "slidesToShow": 2,
          "slidesToScroll": 1,
        }
      },
      {
        "breakpoint": 1090, "settings": {
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
  constructor(public lang: LanguageService,
    public IdentitySrv: IdentityService,
    private logger: LoggerService,
    public packageSrv: PackagesService) {
    // setTimeout(() => {
    //   this.packageSrv.getPackageByCoachId('591579e6-8793-4869-b002-a1d8c83076af')

    // }, 5000)
    this.packageSrv.getPackagesListForLandingpage()
  }

  ngOnInit(): void {
  }
  requestPackage(count: number) {
    if (this.IdentitySrv.userData && this.IdentitySrv.userData.external_id) {
      this.packageSrv.getPackageByCoachId('591579e6-8793-4869-b002-a1d8c83076af')
    } else if (count < 2) {
      this.logger.log('count:', count)
      this.requestPackage(count++)
    }

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
