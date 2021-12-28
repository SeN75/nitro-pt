import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'body-pic-info',
  templateUrl: './body-pic-info.component.html',
  styleUrls: ['./body-pic-info.component.scss']
})
export class BodyPicInfoComponent implements OnInit {
  @Input() info: any = {
    front_image: '',
    back_image: '',
    right_image: '',
    left_image: ''
  }
  constructor() { }

  ngOnInit(): void {
  }

}
