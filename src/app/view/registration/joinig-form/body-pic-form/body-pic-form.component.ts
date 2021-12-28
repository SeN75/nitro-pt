import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { DialogService } from 'src/app/_services/dialog.service';
import { LoggerService } from 'src/app/_services/logger.service';

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
  bodyPicForm: FormGroup = new FormGroup({
    front: new FormControl('', [Validators.required]),
    back: new FormControl('', [Validators.required]),
    left: new FormControl('', [Validators.required]),
    right: new FormControl('', [Validators.required]),
  });
  front_img: string = '../../../../../assets/images/noImage.png';
  back_img: string = '../../../../../assets/images/noImage.png';
  left_img: string = '../../../../../assets/images/noImage.png';
  right_img: string = '../../../../../assets/images/noImage.png';
  constructor(
    public dialgoSrv: DialogService,
    private logger: LoggerService
  ) {
    this.bodyPicForm.valueChanges.subscribe(() => {
      this.value.valid = this.bodyPicForm.valid;
      this.value.data = this.bodyPicForm.value;
      this.bodyPic.emit(this.value)
    }
    )
  }

  ngOnInit(): void {
  }
  selectImg(event: any, control: string) {
    let file: File = <File>event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      this.logger.log('upload in:', e.target.result)
      if (control == 'front') {
        this.bodyPicForm.get('front')?.setValue(file);
        this.front_img = e.target.result;
      }
      else if (control == 'back') {
        this.bodyPicForm.get('back')?.setValue(file);
        this.back_img = e.target.result;
      }
      else if (control == 'right') {
        this.bodyPicForm.get('right')?.setValue(file);
        this.right_img = e.target.result;
      }
      else if (control == 'left') {
        this.bodyPicForm.get('left')?.setValue(file);
        this.left_img = e.target.result;
      }
      else
        this.logger.log('invalid control: ', control)
    }

  }

}
