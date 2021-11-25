import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API } from '../../_helpers/api.config';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from '../logger.service';
import { ToastService } from '../toast.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TokenStorageService } from './token-storage.service';
const Identity = API + "auth/";
@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  userData: any;
  coaches: any;
  staffs: any;
  toDayDate = new Date();
  newDayDate = new Date();

  newUserData: any;

  isLoadingCoaches = true;
  hasErrorCoaches = false;

  isLoadingStaff = true;
  hasErrorStaff = false;

  isLoadingProfile = true;
  hasErrorProfile = false;

  constructor(
    private httpClient: HttpClient,
    private translateSrv: TranslateService,
    private toastSrv: ToastService,
    private router: Router,
    private cookieSrv: CookieService,
    private tokenService: TokenStorageService,
    private logger: LoggerService) {
    //this.logout();
    //this.logoutAll();
    this.userData = this.tokenService.getUser();
    if (localStorage.getItem('refreshToken') && cookieSrv.get('loggedin')) {
      setTimeout(() => {
        // this.getUserProfileByJWT()
        // this.getAllCoaches()
        // this.getStaff()
      }, 1500)

    }

    this.userData = this.tokenService.getUser();
    this.newDayDate.setDate(this.toDayDate.getDate() + 1);
  }

  private _getStaff() {
    return this.httpClient.get(Identity + "staff");
  }
  private _getAllCoaches() {
    return this.httpClient.get(Identity + "coach")
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
  public _verifyToken(data: any) {
    return this.httpClient.post(Identity + "user/verify_token/", data);
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
    return this.httpClient.post(Identity + "user/logout", { refresh: data });
  }
  private _deleteProfileById(id: string) {
    return this.httpClient.delete(Identity + "user/profiles/" + id + "/")
  }

  private _verifyOTP(data: any) {
    return this.httpClient.post(Identity + "verify_OTP", data)
  }


  public getStaff() {
    this.isLoadingStaff = true;
    this.hasErrorStaff = false;
    this._getStaff().subscribe((success: any) => {
      this.staffs = success;
      setTimeout(() => this.isLoadingStaff = false, 500)

      this.logger.log("get staff:", success)
    }, (error: HttpErrorResponse) => {
      this.hasErrorStaff = true
      this.logger.error("get staff error: ", error)
    })
  }
  public getAllCoaches() {
    this.isLoadingCoaches = true;
    this.hasErrorCoaches = false
    this._getAllCoaches().subscribe((success: any) => {
      this.coaches = success;
      setTimeout(() => this.isLoadingCoaches = false, 500)
      this.logger.log("get all coaches:", success)
    }, (error: HttpErrorResponse) => {
      this.hasErrorCoaches = true;
      this.logger.error("get all coaches error: ", error)
    })
  }
  public getUserProfileByJWT() {
    this.isLoadingProfile = true;
    this.hasErrorProfile = false
    this._getUserProfileByJWT().subscribe((success: any) => {
      this.userData = success;
      setTimeout(() => this.isLoadingProfile = false, 500)

      this.logger.log("get userProfile by JWT:", success)
    }, (error: HttpErrorResponse) => {
      this.hasErrorProfile = true
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
      if (userData.role == 'staff')
        this.getStaff()
      if (userData.role == 'coach')
        this.getAllCoaches()
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
  public postCreateUser(userData: any, phone_number?: number, counter?: number) {


    //delete userData.counterCode;
    this._postCreateUser(userData).subscribe((success: any) => {

      this.logger.log("post Create User :", success)
      this.translateSrv.get('SUCCESS.create-user-verify').subscribe(msg => this.toastSrv.success(msg))
      if (userData.role == 'staff')
        this.getStaff()
      if (userData.role == 'coach')
        this.getAllCoaches()
      else {
        this.newUserData = success
        this.userData = success;
        this.router.navigateByUrl('/register/otp_verify/' + success.phone_number)
      }
    }, (error: HttpErrorResponse) => {
      this.logger.error("post Create User  error: ", error)
      this.translateSrv.get('ERROR.create-user').subscribe(msg => this.toastSrv.error(msg))

    })
  }
  public login(userData: any) {
    this.logger.log("login:", userData)
    this._login(userData).subscribe((success: any) => {
      this.tokenService.saveRefreshToken(success.refresh)
      this.tokenService.saveToken(success.access)

      this.cookieSrv.set('loggedin', this.toDayDate.getTime() + "", this.newDayDate)
      this._getUserProfileByJWT().subscribe((user: any) => {
        this.tokenService.saveUser(user)
        this.userData = user;
        this.logger.log('user data: ', user)
        if (user.groups[0] == 1) {
          this.router.navigate(['/dashboard/account-settings'])
          this.logger.log("login:", success)
        } else {
          this.router.navigateByUrl('landing/profile')
        }
      })
    }, (error: HttpErrorResponse) => {
      this.translateSrv.get('ERROR.').subscribe(msg => this.toastSrv.error(msg));
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
  public __refreshToken(data: any) {
    return this._refreshToken(data);
  }
  public verifyToken(data: any) {
    this._verifyToken(data).subscribe((success: any) => {
      this.logger.log("verify Token:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("verify Token error: ", error)
    })
  }
  public changeCurrentUserPassword(data: any) {
    this._changeCurrentUserPassword(data).subscribe((success: any) => {
      this.translateSrv.get('SUCCESS.REGISTRATION.change-password').subscribe(msg => this.toastSrv.success(msg))
      this.logger.log("refresh Token:", success)
    }, (error: HttpErrorResponse) => {
      this.translateSrv.get('ERROR.REGISTRATION.change-password').subscribe(msg => this.toastSrv.error(msg))
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
  public logout() {
    let refresh = this.tokenService.getRefreshToken()
    this.tokenService.signOut();
    this.cookieSrv.delete('loggedin')
    this.router.navigateByUrl('/landing')
    this._logout({ refresh: refresh });
  }
  public deleteProfileById(id: string) {
    this._deleteProfileById(id).subscribe((success: any) => {
      this.logger.log("logout All:", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("logout All error: ", error)
    })
  }
  public loginWithGetUserProfile(userData: any) {
    this.logger.log("login:", userData)
    this._login(userData).subscribe((success: any) => {
      localStorage.setItem('refreshToken', success.refresh)
      localStorage.setItem('authToken', success.access)
      this._getUserProfileByJWT().subscribe((userProfile: any) => {

      }, (error: any) => [

      ])
      this.cookieSrv.set('loggedin', this.toDayDate.getTime() + "", this.newDayDate)
      this.router.navigate(['/dashboard/account-settings'])
      this.logger.log("login:", success)
    }, (error: HttpErrorResponse) => {
      this.translateSrv.get('ERROR.').subscribe(msg => this.toastSrv.error(msg));
      this.logger.error("login error: ", error)
    })

  }
  public verifyOTP(data: any) {
    this._verifyOTP(data).subscribe((success: any) => {
      this.logger.log('accept otp: ', success)
      this.router.navigateByUrl("/register/login")
    }, (error: HttpErrorResponse) => {
      this.logger.error('otp not accept:', error);
      this.translateSrv.get('ERROR.').subscribe(msg => {
        this.toastSrv.error(msg)
      })
    })
  }

}
