import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './view/dashboard/dashboard.component';
import { RegistrationComponent } from './view/registration/registration.component';
import { RegistrationRouting } from './view/registration/registration.routing';
import { AuhtGuardGuard } from './_helpers/auth-guard.guard';
import { LandingPageComponent } from './view/landing-page/landing-page.component';
import { ProfileComponent } from './view/landing-page/profile/profile.component';

const routes: Routes = [
  { component: DashboardComponent, path: 'dashboard', canActivate: [AuhtGuardGuard] },
  { redirectTo: 'landing', path: '', pathMatch: "full" },
  { component: RegistrationComponent, path: 'register', children: RegistrationRouting },
  { component: LandingPageComponent, path: 'landing' },
  { component: ProfileComponent, path: 'landing/profile' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
