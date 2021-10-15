import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoggerService } from 'src/app/_services/logger.service';

@Component({
  selector: 'joining-back-info',
  templateUrl: './back-info.component.html',
  styleUrls: ['./back-info.component.scss']
})
export class BackInfoComponent implements OnInit {
  bankInfoForm: FormGroup;

  value = {
    data: {},
    valid: false,
    send: false
  }

  reciept_img = '../../../../../assets/images/uploader.svg'
  @Output() bankInfo: any = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder, private logger: LoggerService) {
    this.bankInfoForm = this.formBuilder.group({
      recipt: ['',]
    })
    this.bankInfoForm.valueChanges.subscribe(() => {
      this.value.valid = this.bankInfoForm.valid;
      this.value.data = this.bankInfoForm.value;
      this.bankInfo.emit(this.value)
    })
  }
  selectRecipt(event: any) {
    let file: File = <File>event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      this.logger.log('upload in:', e.target.result)
      this.bankInfoForm.get('recipt')?.setValue(file);
      this.reciept_img = e.target.result;
    }

  }


  ngOnInit(): void {
  }

}
