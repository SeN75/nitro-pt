import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'joining-measuring-method',
  templateUrl: './measuring-method.component.html',
  styleUrls: ['./measuring-method.component.scss']
})
export class MeasuringMethodComponent implements OnInit {
  @Output() measuringInfo: any = new EventEmitter<any>();
  bodyPicForm: FormGroup;
  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "rtl": false,
    "dots": true,
    "infinite": false,
    "centerPadding": '0',
    "arrows": false,
    "draggable": false,
    "focusOnSelect": false,
    "centerMode": true,
    "adaptiveHeight": false,
    "variableWidth": false,
    "variableHeight": false,
    "touchMove": false,
    "swipe": false
  };
  caurselPos = 0;
  @ViewChild('slickModal')
  slickModal!: SlickCarouselComponent;
  isTraditional = true;
  value: any = {
    valid: false,
    data: {}
  }
  next() {
    this.caurselPos++;
    this.slickModal.slickNext();
  }

  prev() {
    this.caurselPos--;
    this.slickModal.slickPrev();

  }
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.bodyPicForm = this.formBuilder.group({
      abs: ['', Validators.required],
      biceps: ['', Validators.required],
      calves: ['', Validators.required],
      hamstrings: ['', Validators.required],
      hips: ['', Validators.required],
      lowerChest: ['', Validators.required],
      upperChest: ['', Validators.required],
      quadriceps: ['', Validators.required],
    })
    this.bodyPicForm.valueChanges.subscribe(() => {
      this.value.valid = this.bodyPicForm.valid;
      this.value.data = this.bodyPicForm.value;
      this.measuringInfo.emit(this.value)
    })
  }
  ngOnInit(): void {
  }

}
