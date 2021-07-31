import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  public currentOrder: any;
  constructor() { }
}
