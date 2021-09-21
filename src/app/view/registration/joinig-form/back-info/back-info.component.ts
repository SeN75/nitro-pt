import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'joining-back-info',
  templateUrl: './back-info.component.html',
  styleUrls: ['./back-info.component.scss']
})
export class BackInfoComponent implements OnInit {
  bankInfoForm: FormGroup;

  value = {
    data: {},
    valid: false
  }
  @Output() bankInfo: any = new EventEmitter<any>();
  constructor(private formBuilder: FormBuilder) {
    this.bankInfoForm = this.formBuilder.group({
      recipt: ['',]
    })
    this.bankInfoForm.valueChanges.subscribe(() => {
      this.value.valid = this.bankInfoForm.valid;
      this.value.data = this.bankInfoForm.value;
    })
  }

  ngOnInit(): void {
  }

}
