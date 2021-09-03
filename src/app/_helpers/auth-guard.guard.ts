import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IdentityService } from '../_services/identity/identity.service';
import { LoggerService } from '../_services/logger.service';

let token: any = localStorage.getItem('refreshToken')
let authToken: any = localStorage.getItem('authToken')

@Injectable({
  providedIn: 'root'
})

export class AuhtGuardGuard implements CanActivate {
  constructor(
    private identitySrv: IdentityService,
    private router: Router,
    private logger: LoggerService,
    private cookieSrv: CookieService) { }
  canActivate(next: ActivatedRouteSnapshot): boolean {

    // this.logger.log("d")
    // return true;
    // console.log(this.cookieSrv.get('loggedin'))
    // console.log(localStorage.getItem('refreshToken'))
    if (!this.cookieSrv.get('loggedin') && localStorage.getItem('refreshToken')) {
      this.identitySrv._refreshToken({ refresh: localStorage.getItem('refreshToken') }).subscribe((auth: any) => {
        if (auth) {
          this.logger.log('auth', auth)
          localStorage.setItem('refreshToken', auth.refresh + "")
          localStorage.setItem('authToken', auth.access + "")
          return true
        }
        else {
          localStorage.clear()
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('authToken')
          this.router.navigateByUrl("/register/login")
          return false
        }
      }, error => {
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('authToken')
        this.router.navigateByUrl("/register/login")
      })
      return true
    }
    else if (!localStorage.getItem('refreshToken')) {
      localStorage.clear()
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('authToken')
      this.router.navigateByUrl("/landing")
      return false
    }
    else {
      return true
    }
  }
}
