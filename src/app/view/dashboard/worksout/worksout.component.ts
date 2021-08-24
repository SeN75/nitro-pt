import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { workout } from 'src/app/_common/globle';
import { LanguageService } from 'src/app/_services/language.service';
import { LoggerService } from 'src/app/_services/logger.service';
import { DialogService } from './../../../_services/dialog.service';
import { ExercisesCategoriesService } from './../../../_services/gym/exercises-categories.service';

@Component({
  selector: 'app-worksout',
  templateUrl: './worksout.component.html',
  styleUrls: ['./worksout.component.scss']
})
export class WorksoutComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  workouts = workout;
  constructor(
    public dialogSrv: DialogService,
    public workoutSrv: ExercisesCategoriesService,
    private router: Router,
    public lang: LanguageService,
    private logger: LoggerService
  ) {

    this.workoutSrv.getExerciseCategoriesList()
  }

  ngOnInit(): void {
    this.dtOptions = {
      // ajax: 'data/data.json',
      columns: [],
    };
  }

  showExercise(exercise: any) {
    this.workoutSrv.workout = exercise;
    this.router.navigateByUrl(`/worksout/${exercise.id}/exercise`);
    this.logger.log("e: ", exercise)
  }
}


