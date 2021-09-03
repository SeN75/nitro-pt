import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { LandingPageComponent } from './view/landing-page/landing-page.component';

const routes: Routes = [
  { component: DashboardComponent, path: '' },
  { component: LandingPageComponent, path: 'landing' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
