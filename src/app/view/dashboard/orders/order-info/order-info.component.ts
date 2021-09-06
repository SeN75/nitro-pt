import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.scss']
})
export class OrderInfoComponent implements OnInit {
  info = {
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
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
