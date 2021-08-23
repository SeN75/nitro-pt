import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API } from '../../_helpers/api.config';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from '../logger.service';
import { ToastService } from '../toast.service';
import { Router } from '@angular/router';
const Identity = API + "auth/";
@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  constructor(
    private httpClient: HttpClient,
    private translateSrv: TranslateService,
    private toastSrv: ToastService,
    private router: Router,
    private logger: LoggerService) {
    // this.logout(localStorage.getItem('refreshToken'));
    // this.logoutAll();
    this.getUserProfileByJWT()
  }

  private _getStaff() {
    return this.httpClient.get(Identity + "staff/");
  }
  private _getAllCoaches() {
    return this.httpClient.get(Identity + "coach/")
  }
  private _getUserProfileByJWT() {
    return this.httpClient.get(Identity + "users/me/")
  }
  private _getProfileById(id: string) {
    return this.httpClient.get(Identity + "profiles/" + id)
  }
  private _updateDataUserDataById(userData: any, id: string) {
    return this.httpClient.patch(Identity + "profiles/" + id, userData)
  }
  private _updateUserData(userData: any) {
    return this.httpClient.patch(Identity + "users/me/", userData);
  }
  private _postCreateUser(userData: any) {
    return this.httpClient.post(Identity + "users/", userData);
  }
  private _login(userData: any) {
    const formData = new FormData();

    formData.append('username', userData.userName);
    formData.append('password', userData.password);

    return this.httpClient.post(Identity + 'user/login/', formData);
  }
  private _userActivation(data: any) {
    return this.httpClient.post(Identity + "users/activation/", data);
  }
  public _refreshToken(data: any) {
    return this.httpClient.post(Identity + "user/login/refresh/", data);
  }
  private _changeCurrentUserPassword(data: any) {
    return this.httpClient.post(Identity + "users/set_password/", data)
  }

  private _resetPassword(data: any) {
    return this.httpClient.post(Identity + "users/reset_password/", data);
  }
  private _resetPasswordConfirm(data: any) {
    return this.httpClient.post(Identity + "users/reset_password_confirm/", data);
  }
  private _logoutAll() {
    return this.httpClient.post(Identity + "user/logout_all/", {});
  }
  private _logout(data: any) {
    return this.httpClient.post(Identity + "user/logout/", { refresh: data });
  }
  private _deleteProfileById(id: string) {
    return this.httpClient.delete(Identity + "user/profiles/" + id + "/")
  }





  public getStaff() {
    this._getStaff().subscribe((success: any) => {
      this.logger.log("get staff:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get staff error: ", error)
    })
  }
  public getAllCoaches() {
    this._getAllCoaches().subscribe((success: any) => {
      this.logger.log("get all coaches:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get all coaches error: ", error)
    })
  }
  public getUserProfileByJWT() {
    this._getUserProfileByJWT().subscribe((success: any) => {
      this.logger.log("get userProfile by JWT:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get userProfile by JWT error: ", error)
    })
  }
  public getProfileById(id: string) {
    this._getProfileById(id).subscribe((success: any) => {
      this.logger.log("get Profile By Id:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("get Profile By Id error: ", error)
    })
  }
  public updateDataUserDataById(userData: any, id: string) {
    this._updateDataUserDataById(userData, id).subscribe((success: any) => {
      this.logger.log("update Data User Data ById:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("update Data User Data ById error: ", error)
    })
  }
  public updateUserData(userData: any) {
    this._updateUserData(userData).subscribe((success: any) => {
      this.logger.log("update Data User Data :", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("update Data User Data  error: ", error)
    })
  }
  public postCreateUser(userData: any) {
    this._postCreateUser(userData).subscribe((success: any) => {
      this.logger.log("post Create User :", success)
      this.translateSrv.get('SUCCESS.create-user-verify').subscribe(msg => this.toastSrv.success(msg))
      this.router.navigateByUrl('/register/login')
    }, (error: HttpErrorResponse) => {
      this.logger.error("post Create User  error: ", error)
      this.translateSrv.get('ERROR.create-user').subscribe(msg => this.toastSrv.error(msg))

    })
  }
  public login(userData: any) {
    this.logger.log("login:", userData)
    this._login(userData).subscribe((success: any) => {
      this.logger.log("login:", success)
      localStorage.setItem('refreshToken', success.refresh)
      localStorage.setItem('authToken', success.access)
      this.router.navigate(['/'])
    }, (error: HttpErrorResponse) => {
      this.logger.error("login error: ", error)
    })
  }
  public userActivation(data: any) {
    this._userActivation(data).subscribe((success: any) => {
      this.logger.log("user Activation:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("user Activation error: ", error)
    })
  }
  public refreshToken(data: any) {
    this._refreshToken(data).subscribe((success: any) => {
      this.logger.log("refresh Token:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("refresh Token error: ", error)
    })
  }
  public changeCurrentUserPassword(data: any) {
    this._changeCurrentUserPassword(data).subscribe((success: any) => {
      this.logger.log("refresh Token:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("refresh Token error: ", error)
    })
  }
  public resetPassword(data: any) {
    this._resetPassword(data).subscribe((success: any) => {
      this.logger.log("refresh Token:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("refresh Token error: ", error)
    })
  }
  public resetPasswordConfirm(data: any) {
    this._resetPasswordConfirm(data).subscribe((success: any) => {
      this.logger.log("reset Password Confirm:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("reset Password Confirm error: ", error)
    })
  }
  public logoutAll() {
    this._logoutAll().subscribe((success: any) => {
      this.logger.log("logout All:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("logout All error: ", error)
    })
  }
  public logout(data: any) {
    this._logout(data).subscribe((success: any) => {
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('authToken');
      this.logger.log("logout :", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("logout  error: ", error)
    })
  }
  public deleteProfileById(id: string) {
    this._deleteProfileById(id).subscribe((success: any) => {
      this.logger.log("logout All:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("logout All error: ", error)
    })
  }
}
