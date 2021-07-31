import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscriber-info',
  templateUrl: './subscriber-info.component.html',
  styleUrls: ['./subscriber-info.component.scss']
})
export class SubscriberInfoComponent implements OnInit {
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

    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
