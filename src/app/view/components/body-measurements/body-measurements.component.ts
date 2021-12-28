import { Component, Input, OnInit } from '@angular/core';
import { BodyInfo } from 'src/app/_common/types';

@Component({
  selector: 'body-measurements',
  templateUrl: './body-measurements.component.html',
  styleUrls: ['./body-measurements.component.scss']
})
export class BodyMeasurementsComponent implements OnInit {
  @Input() changeValue: boolean = false;
  @Input() action: boolean = false;
  @Input() info: BodyInfo = {
    chest_circumrefence: 0,
    lower_chest: 0,
    waist: 0,
    belly: 0,
    thigh: 0,
    buttocks: 0,
    calf: 0,
    humerus: 0,
    weight: 0
  }
  imagesBody = ['upper_chest_img', 'lower_chest_img', 'hips_img', 'abs_img', 'quadriceps_img', 'hamstrings_img', 'calves_img', 'biceps_img']
  labelBody = ['upper-chest', 'lower-chest', 'hips', 'abs', 'quadriceps', 'hamstrings', 'calves', 'biceps']
  newValue!: BodyInfo
  constructor() { }

  ngOnInit(): void {
    this.newValue = { ...this.info };
  }
  saveChange() {
    this.info = { ...this.newValue }
  }

}
