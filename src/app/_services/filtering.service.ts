import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilteringService {

  constructor() { }

  ascending(arr: any[], key: string) {
    let sort = [];
    return sort = arr.sort((a, b) => 0 - (a[key] > b[key] ? -1 : 1));
  }
  descending(arr: any[], key: string) {
    let sort = [];
    return sort = arr.sort((a, b) => 0 - (a[key] > b[key] ? 1 : -1));
  }
  date(arr: any[], key: string, value: string) {

  }
  // range(arr: any[], key: string, value1: string, value2: string) {
  //   let sort = [];
  //   return sort = arr.
  // }
  search(arr: any[], key: string, value: string) {
    let sort = [];
    return sort = arr.filter(e => e[key].toUpperCase().includes(value.toUpperCase()))
  }
}
