import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/_services/language.service';
import { DialogService } from './../../../../_services/dialog.service';
import { ExercisesService } from '../../../../_services/gym/exercises.service';

@Component({
  selector: 'app-exercise-schedule',
  templateUrl: './exercise-schedule.component.html',
  styleUrls: ['./exercise-schedule.component.scss']
})
export class ExerciseScheduleComponent implements OnInit {
  workout: any;
  dtOptions: DataTables.Settings = {};

  constructor(public dialogSrv: DialogService, private workoutSrv: ExercisesService, public lang: LanguageService) {
    this.workoutSrv.checkWorkout()
    this.workout = this.workoutSrv.workout;
  }

  ngOnInit(): void {
    this.dtOptions = {
      // ajax: 'data/data.json',
      columns: [{
        title: 'ID',
        data: 'id'
      }, {
        title: 'First name',
        data: 'firstName'
      }],
    };
  }

}
