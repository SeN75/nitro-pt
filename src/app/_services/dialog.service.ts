import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesDialogComponent } from '../view/dashboard/categories/categories-dialog/categories-dialog.component';
import { CategoryTypeDialogComponent } from '../view/dashboard/categories/category-type-dialog/category-type-dialog.component';
import { PackageDialogComponent } from '../view/dashboard/packages/package-dialog/package-dialog.component';
import { BankAccountDialogComponent } from '../view/dashboard/settings/bank-account-dialog/bank-account-dialog.component';
import { ResetPasswordComponent } from '../view/dashboard/settings/reset-password/reset-password.component';
import { UserDialogComponent } from '../view/dashboard/settings/user-dialog/user-dialog.component';
import { WorkoutDialogComponent } from '../view/dashboard/worksout/workout-dialog/workout-dialog.component';
import { WorkoutTypeDialogComponent } from '../view/dashboard/worksout/workout-type-dialog/workout-type-dialog.component';
import { TipsComponent } from '../view/registration/joinig-form/body-pic-form/tips/tips.component';
import { DialogComponent } from './../view/components/dialog/dialog.component';
import { IdentityService } from './identity/identity.service';
import { InactiveDialogComponent } from './../view/dashboard/inactive-dialog/inactive-dialog.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { DietplanTempDialogComponent } from '../view/dashboard/diet-plan/dietplan-temp-dialog/dietplan-temp-dialog.component';
import { DietplanEditDialogComponent } from '../view/dashboard/diet-plan/dietplan-edit-dialog/dietplan-edit-dialog.component';
import { DeleteDialogComponent } from './../view/components/delete-dialog/delete-dialog.component';
import { PreviewImageOrVideoComponent } from '../view/components/preview-image-or-video/preview-image-or-video.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog, private identitySrv: IdentityService, private cookieSrv: CookieService, private router: Router) { }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '250px',
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(res => console.log("dialog closed"));
  }

  openPackageDialog(state?: string, pack?: any) {
    const dialogRef = this.dialog.open(PackageDialogComponent, {
      height: 'auto',
      minWidth: '300px',
      maxWidth: "750px",
      width: 'auto',
      data: { state: state, package: pack }
    });
    dialogRef.afterClosed().subscribe(res => console.log("dialog closed"));
  }

  openWorkoutTypeDialog(state?: string, workout?: any) {
    const dialogRef = this.dialog.open(WorkoutTypeDialogComponent, {
      height: 'auto',
      minWidth: '300px',
      maxWidth: "750px",
      width: 'auto',
      data: { state: state, workout: workout }
    });
    dialogRef.afterClosed().subscribe(res => console.log("dialog closed"));
  }
  openWorkoutDialog(state?: string, workout?: any) {
    const dialogRef = this.dialog.open(WorkoutDialogComponent, {
      height: 'auto',
      minWidth: '300px',
      maxWidth: "750px",
      width: 'auto',
      data: { state: state, workout: workout }
    });
    dialogRef.afterClosed().subscribe(res => console.log("dialog closed"));
  }
  openCategoryTypeDialog(state?: string, cate?: any) {
    const dialogRef = this.dialog.open(CategoryTypeDialogComponent, {
      height: 'auto',
      minWidth: '300px',
      maxWidth: "750px",
      width: 'auto',
      data: { state: state, cate: cate }
    });
    dialogRef.afterClosed().subscribe(res => console.log("dialog closed"));
  }
  openCategoryDialog(state?: string, cate?: any) {
    const dialogRef = this.dialog.open(CategoriesDialogComponent, {
      height: 'auto',
      minWidth: '300px',
      maxWidth: "750px",
      width: 'auto',
      data: { state: state, cate: cate }
    });
    dialogRef.afterClosed().subscribe(res => console.log("dialog closed"));
  }
  openSubscribersDialog(state?: string, cate?: any) {
    const dialogRef = this.dialog.open(CategoriesDialogComponent, {
      height: 'auto',
      minWidth: '300px',
      maxWidth: "750px",
      width: 'auto',
      data: { state: state, cate: cate }
    });
    dialogRef.afterClosed().subscribe(res => console.log("dialog closed"));
  }
  openTipsDialog() {
    const dialogRef = this.dialog.open(TipsComponent, {
      height: 'auto',
      minWidth: '300px',
      maxWidth: "750px",
      minHeight: '60vh',
      id: "picDialog",
      direction: "rtl",
      width: 'auto',
    });
    dialogRef.afterClosed().subscribe(res => console.log("dialog closed"));
  }
  openResetpasswordDialog() {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      height: 'auto',
      minWidth: '300px',
      maxWidth: "650px",
      width: 'auto',
    });
    dialogRef.afterClosed().subscribe(res => console.log("dialog closed"));
  }
  openUserDialog(path?: string, state?: string, user?: any) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      height: 'auto',
      minWidth: '300px',
      maxWidth: "750px",
      width: 'auto',
      data: { state: state, user: user, path: path }
    });
    dialogRef.afterClosed().subscribe(res => console.log("dialog closed"));
  }
  openBankAccountDialog(state?: string, account?: any) {
    const dialogRef = this.dialog.open(BankAccountDialogComponent, {
      height: 'auto',
      minWidth: '300px',
      maxWidth: "750px",
      width: 'auto',
      data: { state: state, account: account }
    });
    dialogRef.afterClosed().subscribe(res => console.log("dialog closed"));
  }
  inactiveDialog() {
    const dialogRef = this.dialog.open(InactiveDialogComponent, {
      height: 'auto',
      width: 'auto',
    });
    dialogRef.afterClosed().subscribe(res => {
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('authToken');
      this.cookieSrv.delete('loggedin')
      this.router.navigateByUrl('/register/login')
    }
      // this.identitySrv.logout()
    );
  }
  openDietplanTempDialog(state?: string, dietplan?: any) {
    const dialogRef = this.dialog.open(DietplanTempDialogComponent, {
      height: 'auto',
      minWidth: '300px',
      maxWidth: "750px",
      width: 'auto',
      data: { state: state, dietplan: dietplan }
    });
    dialogRef.afterClosed().subscribe(res => console.log("dialog closed"));
  }
  openDietplanEditDialog(state?: string, data?: any) {
    const dialogRef = this.dialog.open(DietplanEditDialogComponent, {
      height: 'auto',
      minWidth: '300px',
      maxWidth: "750px",
      width: 'auto',
      data: { state: state, data: data }
    });
    dialogRef.afterClosed().subscribe(res => console.log("dialog closed"));
  }
  deleteDialog(data?: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      height: 'auto',
      minWidth: '300px',
      maxWidth: "750px",
      width: 'auto',
      data: data
    });
    dialogRef.afterClosed().subscribe(res => console.log("dialog closed"));
  }
  preview(src: string, type: string) {
    const dialogRef = this.dialog.open(PreviewImageOrVideoComponent, {
      height: 'auto',
      minWidth: '300px',
      maxWidth: "750px",
      width: 'auto',
      data: { src: src, type: type }
    });
    dialogRef.afterClosed().subscribe(res => console.log("dialog closed"));
  }
}
