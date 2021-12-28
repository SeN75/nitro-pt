import { Component, OnInit, Input } from '@angular/core';
import { PersonalDetails } from 'src/app/_common/types';

@Component({
  selector: 'personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
  @Input() info!: any;
  constructor() { }

  ngOnInit(): void {
  }

}
