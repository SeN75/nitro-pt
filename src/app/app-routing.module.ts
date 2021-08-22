import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { RegistrationComponent } from './view/registration/registration.component';
import { RegistrationRouting } from './view/registration/registration.routing';
import { AuhtGuardGuard } from './_helpers/auth-guard.guard';

const routes: Routes = [
  { component: DashboardComponent, path: '', canActivate: [AuhtGuardGuard] },
  { redirectTo: '', path: 'home', pathMatch: "full" },
  { component: RegistrationComponent, path: 'register', children: RegistrationRouting },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
