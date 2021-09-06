import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'body-measurements',
  templateUrl: './body-measurements.component.html',
  styleUrls: ['./body-measurements.component.scss']
})
export class BodyMeasurementsComponent implements OnInit {
  @Input() changeValue: boolean = false;
  @Input() action: boolean = false;
  @Input() info: any = {
    upperChest: 0,
    lowerChest: 0,
    hips: 0,
    abs: 0,
    quadriceps: 0,
    hamstrings: 0,
    calves: 0,
    biceps: 0
  }
  imagesBody = ['upper_chest_img', 'lower_chest_img', 'hips_img', 'abs_img', 'quadriceps_img', 'hamstrings_img', 'calves_img', 'biceps_img']
  labelBody = ['upper-chest', 'lower-chest', 'hips', 'abs', 'quadriceps', 'hamstrings', 'calves', 'biceps']
  newValue: any
  constructor() { }

  ngOnInit(): void {
    this.newValue = { ...this.info };
  }
  saveChange() {
    this.info = { ...this.newValue }
  }

}
