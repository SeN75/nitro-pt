import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'archiving-info',
  templateUrl: './archiving-info.component.html',
  styleUrls: ['./archiving-info.component.scss']
})
export class ArchivingInfoComponent implements OnInit {
  @Input() info: any = [
    {
      recordDate: '2021/1/1',
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
  constructor() { }

  ngOnInit(): void {
    console.log(this.info)
  }

}
