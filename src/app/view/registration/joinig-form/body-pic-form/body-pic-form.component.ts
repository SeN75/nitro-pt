import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { DialogService } from 'src/app/_services/dialog.service';

@Component({
  selector: 'joining-body-pic-form',
  templateUrl: './body-pic-form.component.html',
  styleUrls: ['./body-pic-form.component.scss']
})
export class BodyPicFormComponent implements OnInit {
  @Output() bodyPic: any = new EventEmitter<any>();
  value = {
    valid: true,
    data: {}
  }
  constructor(
    private formBuilder: FormBuilder,
    public dialgoSrv: DialogService
  ) {
    this.bodyPic.emit(this.value)
  }

  ngOnInit(): void {
  }

}
