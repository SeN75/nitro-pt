import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/_services/language.service';
import { DialogService } from './../../../../_services/dialog.service';
import { ExercisesService } from '../../../../_services/gym/exercises.service';
import { Router } from '@angular/router';
import { LoggerService } from 'src/app/_services/logger.service';
import { ExercisesCategoriesService } from 'src/app/_services/gym/exercises-categories.service';

@Component({
  selector: 'app-exercise-schedule',
  templateUrl: './exercise-schedule.component.html',
  styleUrls: ['./exercise-schedule.component.scss']
})
export class ExerciseScheduleComponent implements OnInit {
  exerciseCategor: any;
  dtOptions: DataTables.Settings = {};
  categoryId = ""
  constructor(
    public dialogSrv: DialogService,
    public exerciseSrv: ExercisesService,
    public exerciseCategorSrv: ExercisesCategoriesService,
    public lang: LanguageService,
    private logger: LoggerService,
    private router: Router) {
    this.categoryId = this.router.url.split('/')[2];
    this.exerciseSrv.getExerciseList();
    this.exerciseSrv.getExerciseListOnSameCategory(this.categoryId);
    this.exerciseCategorSrv.getExercisetCategoriesById(this.categoryId)

    // this.workoutSrv.checkWorkout()
    // this.workout = this.workoutSrv.workout;

  }

  ngOnInit(): void {
    this.dtOptions = {
      // ajax: 'data/data.json',
      columns: [
      ],
    };
  }

}
