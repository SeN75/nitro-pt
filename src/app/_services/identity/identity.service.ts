import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { API } from '../../_helpers/api.config';
import { TranslateService } from '@ngx-translate/core';
import { LoggerService } from '../logger.service';
import { ToastService } from '../toast.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TokenStorageService } from './token-storage.service';
import { MessageService } from '../message.service';
import { MessageRespones, ResetPassword } from 'src/app/_common/types';
import { FormAlertService } from '../form-alert.service';
import { FormGroup } from '@angular/forms';
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

  resetPasswordObj: ResetPassword = {
    uid: '',
    token: '',
    new_password: '',
    re_new_password: '',
    phone_number: ''
  }

  isLoadingCoaches = true;
  hasErrorCoaches = false;
  errorCoaches: any[] = [];

  isLoadingStaff = true;
  hasErrorStaff = false;
  errorStaff: any[] = [];

  isLoadingProfile = true;
  hasErrorProfile = false;
  errorProfile: any[] = [];

  constructor(
    private httpClient: HttpClient,
    private translateSrv: TranslateService,
    private toastSrv: ToastService,
    private router: Router,
    private cookieSrv: CookieService,
    private tokenService: TokenStorageService,
    private logger: LoggerService,
    private formAlert: FormAlertService,
    private messageSrv: MessageService) {
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
  private _generateOTP(data: any) {
    return this.httpClient.post(Identity + 'generate_OTP', data);
  }
  private _generateUID(data: any) {
    return this.httpClient.post(Identity + 'generate_uid', data);
  }

  public getStaff() {
    return new Promise<MessageRespones>((resolve, rejects) => {
      this.isLoadingStaff = true;
      this.hasErrorStaff = false;
      this._getStaff().subscribe((success: any) => {
        this.staffs = success;
        setTimeout(() => this.isLoadingStaff = false, 500)

        this.logger.log("get staff:", success)
        resolve({ status: 'Success', message: 'compelete', method: 'getStaff' })

      }, (error: HttpErrorResponse) => {
        this.hasErrorStaff = true
        this.logger.error("get staff error: ", error)
        this.errorMsg(error, undefined, false).then((msgs: any) => {
          this.errorCoaches = msgs.errors;
          rejects({ status: 'Failed', message: msgs, method: 'getStaff' })
        })
      })
    })
  }
  public getAllCoaches() {
    return new Promise<MessageRespones>((resolve, rejects) => {
      this.isLoadingCoaches = true;
      this.hasErrorCoaches = false
      this._getAllCoaches().subscribe((success: any) => {
        this.coaches = success;
        setTimeout(() => this.isLoadingCoaches = false, 500)
        this.logger.log("get all coaches:", success)
        resolve({ status: 'Success', message: 'compelete', method: 'getAllCoaches' })
      }, (error: HttpErrorResponse) => {
        this.hasErrorCoaches = true;
        this.logger.error("get all coaches error: ", error)
        this.errorMsg(error, undefined, false).then((msgs: any) => {
          this.errorCoaches = msgs.errors;
          rejects({ status: 'Failed', message: msgs, method: 'getAllCoaches' })
        })
      })
    })

  }
  public getUserProfileByJWT() {
    return new Promise<MessageRespones>((resolve, rejects) => {

      this.isLoadingProfile = true;
      this.hasErrorProfile = false
      this._getUserProfileByJWT().subscribe((success: any) => {
        this.userData = success;
        setTimeout(() => this.isLoadingProfile = false, 500)
        resolve({ status: 'Success', message: 'complete', method: 'getUserProfileByJWT' })

        this.logger.log("get userProfile by JWT:", success)
      }, (error: HttpErrorResponse) => {
        this.hasErrorProfile = true
        // this.messageSrv.errors(error, 'REGISTRATION.', 'GENRAL.', '', false).forEach(e => this.logger.error('error: ', e))
        this.errorMsg(error, undefined, true).then(msgs => {
          rejects({ status: 'Failed', message: msgs, method: 'getUserProfileByJWT' })
        })

        this.logger.error("get userProfile by JWT error: ", error)
      })
    })
  }
  public getProfileById(id: string) {
    this._getProfileById(id).subscribe((success: any) => {
      this.logger.log("get Profile By Id:", success)
    }, (error: HttpErrorResponse) => {
      // this.messageSrv.errors(error, 'REGISTRATION.', 'GENRAL.', '', false).forEach(e => this.logger.error('error: ', e))
      this.errorMsg(error, undefined, true)
      this.logger.error("get Profile By Id error: ", error)
    })
  }
  public updateDataUserDataById(userData: any, id: string, form: FormGroup) {
    return new Promise<MessageRespones>((resolve, rejects) => {

      this._updateDataUserDataById(userData, id).subscribe((success: any) => {
        if (userData.role == 'staff')
          this.getStaff()
        if (userData.role == 'coach')
          this.getAllCoaches()
        resolve({ status: 'Success', message: 'complete', method: 'updateDataUserDataById' })
        this.logger.log("update Data User Data ById:", success)
      }, (error: HttpErrorResponse) => {
        this.errorMsg(error, form).then(msgs => {
          rejects({ status: 'Failed', message: msgs, method: 'updateDataUserDataById' })
        });
        this.logger.error("update Data User Data ById error: ", error)
      })
    })

  }
  public updateUserData(userData: any, form: FormGroup) {
    this._updateUserData(userData).subscribe((success: any) => {
      this.logger.log("update Data User Data :", success)
    }, (error: HttpErrorResponse) => {
      this.logger.error("update Data User Data  error: ", error)
      this.errorMsg(error, form);
    })
  }
  public postCreateUser(userData: any, form: FormGroup, phone_number?: number, counter?: number) {
    return new Promise<MessageRespones>((resolve, rejects) => {
      //delete userData.counterCode;
      this._postCreateUser(userData).subscribe((success: any) => {
        this.formAlert.clearControls(form);
        this.logger.log("post Create User :", success)
        this.messageSrv.successMessage('create-user-verify').then(msg => this.toastSrv.success(msg))
        if (userData.role == 'staff')
          this.getStaff()
        if (userData.role == 'coach')
          this.getAllCoaches()
        else {
          this.newUserData = success
          this.userData = success;
          this.router.navigateByUrl('/register/otp_verify/?p=' + success.phone_number + '&t=n')
        }
        resolve({ status: 'Success', message: 'complete', method: 'getUserProfileByJWT' })

      }, (error: HttpErrorResponse) => {
        this.logger.error("post Create User  error: ", error)
        this.errorMsg(error, form).then(msg => {
          rejects({ status: 'Failed', message: msg, method: 'getUserProfileByJWT' })

        });
      })
    })
  }
  public login(userData: any, form: FormGroup) {
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
      this.logger.error("login error: ", error)
      this.errorMsg(error, form);
      // this.translateSrv.get('ERROR.').subscribe(msg => this.toastSrv.error(msg));
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
  public changeCurrentUserPassword(data: any, form: FormGroup) {
    return new Promise<MessageRespones>((resolve, rejects) => {

      this._changeCurrentUserPassword(data).subscribe((success: any) => {
        this.messageSrv.successMessage('REGISTRATION.change-password').then(s => this.toastSrv.success(s))
        resolve({ status: 'Success', message: 'Complete', method: 'changeCurrentUserPassword' })
      }, (error: HttpErrorResponse) => {
        this.errorMsg(error, form).then(msgs => {
          rejects({ status: 'Failed', messages: msgs, method: 'changeCurrentUserPassword' });
        });
        this.logger.error("refresh Token error: ", error)
      })
    })
  }
  public resetPassword(data: any, form: FormGroup) {
    this._resetPassword(data).subscribe((success: any) => {
      this.logger.log("refresh Token:", success)
    }, (error: HttpErrorResponse) => {
      this.errorMsg(error, form);
      this.logger.error("refresh Token error: ", error)
    })
  }
  public resetPasswordConfirm(data: any, form: FormGroup) {
    this._resetPasswordConfirm(data).subscribe((success: any) => {
      this.logger.log("reset Password Confirm:", success)
      this.messageSrv.successMessage('REGISTRATION.change-password').then(s => this.toastSrv.success(s));

      this.router.navigateByUrl('/register/login')
    }, (error: HttpErrorResponse) => {
      this.logger.error("reset Password Confirm error: ", error);
      this.errorMsg(error, form);

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
  public loginWithGetUserProfile(userData: any, form: FormGroup) {
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
      this.errorMsg(error, form);

      // this.translateSrv.get('ERROR.').subscribe(msg => this.toastSrv.error(msg));
      this.logger.error("login error: ", error)
    })

  }
  public verifyOTP(data: any, type: string, form: FormGroup) {
    this._verifyOTP(data).subscribe((success: any) => {
      this.logger.log('accept otp: ', success)
      if (type == 'n')
        this.router.navigateByUrl("/register/login")
      if (type == 'r') {
        this.generateUID({ phone_number: data.phone_number })
        this.router.navigateByUrl("/register/reset_password")
      }
    }, (error: HttpErrorResponse) => {
      this.logger.error('otp not accept:', error);
      this.errorMsg(error, form);

    })
  }

  public generateOTP(data: any) {
    this._generateOTP(data).subscribe((success: any) => {
      this.router.navigateByUrl('/register/otp_verify/?p=' + data.phone_number + '&t=r')
      this.messageSrv.successMessage('REGISTRATION.otp').then(s => this.toastSrv.success(s));
      this.logger.log('generateOtp: ', success)
    }, (error: any) => {
      this.logger.error('error generateOtp: ', error);
      this.errorMsg(error, undefined, true);


    })
  }
  public generateUID(data: any) {
    this._generateUID(data).subscribe((success: any) => {
      this.resetPasswordObj.uid = success.uid;
      this.resetPasswordObj.token = success.token;
      this.logger.log('generateUID: ', success)
    }, (error: HttpErrorResponse) => {
      this.logger.error('error generateUID: ', error);

    })
  }
  private errorMsg(error: HttpErrorResponse, form?: FormGroup, useAlert = false) {
    return new Promise((resolse, rej) => {

      this.messageSrv.errors(error, 'REGISTRATION.', 'GENRAL.', '', false).then(res => {
        if (form) {
          this.logger.log('res errors: ', res)
          let { controlErrors, notKey } = this.formAlert.setErrors(form, res.keySet, res.errors);
          this.toastSrv.errors(notKey)
          resolse({ controlErrors: controlErrors, notKey: notKey, keySet: res.keySet, errors: res.errors })
        } else if (useAlert) {
          this.toastSrv.error(res.errors)
          resolse({ keySet: res.keySet, errors: res.errors })

        } else {
          resolse({ keySet: res.keySet, errors: res.errors })
        }
      })
    })

  }
}
