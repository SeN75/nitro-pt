import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'package-info-table',
  templateUrl: './package-info-table.component.html',
  styleUrls: ['./package-info-table.component.scss']
})
export class PackageInfoTableComponent implements OnInit {
  @Input() pack: any[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
