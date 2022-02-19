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
  categoryId = "";
  exercises: any[] = []
  constructor(
    public dialogSrv: DialogService,
    public exerciseSrv: ExercisesService,
    public exerciseCategorSrv: ExercisesCategoriesService,
    public lang: LanguageService,
    private logger: LoggerService,
    private router: Router) {
    this.categoryId = this.router.url.replace('/worksout/', "").replace('exercise', '').replace('/', '');

    this.getExercises()
    setTimeout(() => {
      this.exercises = this.exerciseSrv.getExerciseListOnSameCategory(exerciseCategorSrv.exerciseCategory.name_ar)

    }, 500)

    // this.workoutSrv.checkWorkout()
    // this.workout = this.workoutSrv.workout;

  }

  ngOnInit(): void {


  }
  getExercises() {
    this.exerciseSrv.getExerciseList();
    this.exerciseCategorSrv.getExercisetCategoriesById(this.categoryId)
    this.logger.log('length', this.exerciseSrv.getExerciseListOnSameCategory(this.categoryId).length + "");

  }
}
