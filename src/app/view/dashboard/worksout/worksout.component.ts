import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { workout } from 'src/app/_common/globle';
import { LanguageService } from 'src/app/_services/language.service';
import { ExercisesService } from 'src/app/_services/gym/exercises.service';
import { DialogService } from './../../../_services/dialog.service';

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
    private workoutSrv: ExercisesService,
    private router: Router,
  ) { }

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

  showExercise(exercise: any) {
    this.workoutSrv.workout = exercise;
    this.router.navigateByUrl('worksout/exercise')
  }
}


