import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
  @Input() info: any;
  constructor() { }

  ngOnInit(): void {
  }

}
