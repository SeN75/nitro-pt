import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'body-pic-info',
  templateUrl: './body-pic-info.component.html',
  styleUrls: ['./body-pic-info.component.scss']
})
export class BodyPicInfoComponent implements OnInit {
  @Input() info: any = {
    front: '../../../../../assets/images/noImage.png',
    back: '../../../../../assets/images/noImage.png',
    right: '../../../../../assets/images/noImage.png',
    left: '../../../../../assets/images/noImage.png'
  }
  constructor() { }

  ngOnInit(): void {
  }

}
