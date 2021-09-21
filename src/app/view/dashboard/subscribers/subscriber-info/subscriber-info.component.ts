import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { SubscribersService } from 'src/app/_services/subscriptions/subscribers.service';

@Component({
  selector: 'app-subscriber-info',
  templateUrl: './subscriber-info.component.html',
  styleUrls: ['./subscriber-info.component.scss']
})
export class SubscriberInfoComponent implements OnInit {
  info: any = {
    subStartDate: "2021/1/1",
    subEndDate: "2021/1/1",
    subAmount: "1500",
    subStatus: "newly",
    subNo: "#100213",
    personalData: {
      name: "محمد شلبي",
      number: "0551594683",
      birthday: "2020-02-21",
      socialStatus: "اعزب",
      gender: "ذكر",
      height: "180",
      weight: "80",
      city: "jeddah"
    },
    subscriber: {
      workType: "مكتبي",
      healthProblem: "لا يوجد",
      useSupplements: "لا",
      goalOfProgeam: "تضخيم",
      sleepingHoures: "8",
      wakeupTime: "8:00",
      bedTime: "23:00",
      numberOfmeals: "5",
      currentProgram: "برنامج كيتو يومي",
      nonPrefrredFood: "سلمون و تونا ",
      allergenicFood: "الفستق و اللوز",
      recentOperations: "استئصال الزائده",
    },
    bodyMeasurements: {
      upperChest: 0,
      lowerChest: 0,
      hips: 0,
      abs: 0,
      quadriceps: 0,
      hamstrings: 0,
      calves: 0,
      biceps: 0,
      weight: 85
    },
    ditePlan: {
      planName: ''
    },
    archives: [
      {
        recordDate: "2020/1/4",
        personalData: {
          name: "محمد شلبي",
          number: "0551594683",
          birthday: "2020-02-21",
          socialStatus: "اعزب",
          gender: "ذكر",
          height: "180",
          weight: "80",
          city: "jeddah"
        },
        subscriber: {
          workType: "مكتبي",
          healthProblem: "لا يوجد",
          useSupplements: "لا",
          goalOfProgeam: "تضخيم",
          sleepingHoures: "8",
          wakeupTime: "8:00",
          bedTime: "23:00",
          numberOfmeals: "5",
          currentProgram: "برنامج كيتو يومي",
          nonPrefrredFood: "سلمون و تونا ",
          allergenicFood: "الفستق و اللوز",
          recentOperations: "استئصال الزائده",
        },
        bodyMeasurements: {
          upperChest: 0,
          lowerChest: 0,
          hips: 0,
          abs: 0,
          quadriceps: 0,
          hamstrings: 0,
          calves: 0,
          biceps: 0,
          weight: 85
        },
        ditePlan: {
          planName: ''
        },
        bodyPic: {
          front: '../../../../../assets/images/noImage.png',
          back: '../../../../../assets/images/noImage.png',
          right: '../../../../../assets/images/noImage.png',
          left: '../../../../../assets/images/noImage.png'
        },
      }
    ]
  }
  constructor(private subscribersSrv: SubscribersService) { }
  @ViewChild(MatAccordion, { static: false })
  accordion!: MatAccordion;

  ngOnInit(): void {

    if (this.subscribersSrv.subscribersInfo) {
      this.info = this.subscribersSrv.subscribersInfo;

    }
  }

}
