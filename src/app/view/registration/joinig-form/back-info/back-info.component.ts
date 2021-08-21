import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'joining-back-info',
  templateUrl: './back-info.component.html',
  styleUrls: ['./back-info.component.scss']
})
export class BackInfoComponent implements OnInit {
  bankInfoForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.bankInfoForm = this.formBuilder.group({
      bankName: ['', Validators.required],
      accountHolder: ['', Validators.required],
      iban: ['', Validators.required],
      recipt: ['',]
    })
  }

  ngOnInit(): void {
  }

}
