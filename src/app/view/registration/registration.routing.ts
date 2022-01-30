
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import { SelectProgramComponent } from './select-program/select-program.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { JoinigFormComponent } from './joinig-form/joinig-form.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OtpComponent } from './otp/otp.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { UpdateFormComponent } from './update-form/update-form.component';

export const RegistrationRouting: Routes = [
  { component: ResetPasswordComponent, path: 'reset_password' },
  { component: ChangePasswordComponent, path: 'change_password' },
  { redirectTo: 'login', path: '', pathMatch: 'full' },
  { component: LoginComponent, path: 'login' },
  { component: SignupComponent, path: 'sign_up' },
  { component: SelectProgramComponent, path: 'join_program' },
  { component: TermsAndConditionComponent, path: 'terms_and_condition' },
  { component: JoinigFormComponent, path: 'joining_form' },
  { component: OtpComponent, path: 'otp_verify/:phonenumber' },
  { component: ForgetPasswordComponent, path: 'forget_password' },
  { component: UpdateFormComponent, path: 'update_info' },

]

