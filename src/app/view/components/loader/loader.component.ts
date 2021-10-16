import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  value: number | any = 50;
  @Input() title: string = ''
  @Input() hasError: boolean = false;
  @Input() errorMessage = 'an error'
  constructor() { }

  ngOnInit(): void {
  }

}
