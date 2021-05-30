import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  categories: any;
  constructor(private router: Router) { }
  checkOfCategories() {
    if (this.categories === undefined)
      this.router.navigateByUrl('/categories')
  }
}
