import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  workout: any;
  exerciseSchedule: any;
  constructor(private router: Router) { }
  checkWorkout() {
    if (this.workout === undefined)
      this.router.navigateByUrl('/worksout');
  }
}
