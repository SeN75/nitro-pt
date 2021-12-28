import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { LoggerService } from 'src/app/_services/logger.service';

@Component({
  selector: 'joining-measuring-method',
  templateUrl: './measuring-method.component.html',
  styleUrls: ['./measuring-method.component.scss']
})
export class MeasuringMethodComponent implements OnInit {
  @Output() measuringInfo: any = new EventEmitter<any>();
  inbodyImg = '../../../../../assets/images/uploader.svg';
  bodyPicForm: FormGroup | any;
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
  isTraditional = false;
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

  inbodyAttachment = new FormControl('', Validators.required);

  constructor(
    private formBuilder: FormBuilder,
    private logger: LoggerService,
  ) {
    this.bodyPicForm = this.formBuilder.group({
      abs: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      biceps: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      calves: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      hamstrings: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      hips: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      lowerChest: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      upperChest: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      quadriceps: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    })
    this.bodyPicForm.valueChanges.subscribe(() => {
      this.value.data = {}
      this.value.valid = this.bodyPicForm.valid;
      this.value.data = this.bodyPicForm.value;
      this.value.data.method_measurement = 2
      this.measuringInfo.emit(this.value)
    })
    this.inbodyAttachment.valueChanges.subscribe(() => {
      this.value.data = {}
      this.value.valid = this.inbodyAttachment.valid;
      this.value.data.inbody_attachment = this.inbodyAttachment.value;
      this.value.data.method_measurement = 1;
      this.measuringInfo.emit(this.value)

    })
  }
  ngOnInit(): void {
  }
  output() {
    this.measuringInfo.emit(this.value)
  }

  selectimg(event: any) {
    let file: File = <File>event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      this.logger.log('upload in:', e.target.result)
      this.inbodyAttachment.setValue(file);
      this.inbodyImg = e.target.result;
    }

  }
  _output(x: boolean) {
    if (x) {
      this.value.data = {}
      this.value.valid = this.bodyPicForm.valid;
      this.value.data = this.bodyPicForm.value;
      this.value.data.method_measurement = 2
      this.measuringInfo.emit(this.value)
    }
    else {
      this.value.data = {}
      this.value.valid = this.inbodyAttachment.valid;
      this.value.data.inbody_attachment = this.inbodyAttachment.value;
      this.value.data.method_measurement = 1;
      this.measuringInfo.emit(this.value)

    }
  }
}
