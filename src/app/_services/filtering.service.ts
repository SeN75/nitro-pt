import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilteringService {
  copyArr: any[] = []
  constructor() { }

  ascending(arr: any[], key: string) {
    this.copyArr = arr;
    return arr = arr.sort((a, b) => 0 - (a[key] > b[key] ? -1 : 1));
  }
  descending(arr: any[], key: string) {
    this.copyArr = arr;
    return arr = arr.sort((a, b) => 0 - (a[key] > b[key] ? 1 : -1));
  }
  date(arr: any[], key: string, value: string) {

  }
  // range(arr: any[], key: string, value1: string, value2: string) {
  //   let arr= [];
  //   return arr= arr.
  // }
  search(arr: any[], key: string, value: string) {
    this.copyArr = arr;
    return arr = arr.filter(e => e[key].toUpperCase().includes(value.toUpperCase()))
  }
}
