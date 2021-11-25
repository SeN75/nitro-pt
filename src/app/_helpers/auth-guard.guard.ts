import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IdentityService } from '../_services/identity/identity.service';
import { TokenStorageService } from '../_services/identity/token-storage.service';
import { LoggerService } from '../_services/logger.service';




@Injectable({
  providedIn: 'root'
})

export class AuhtGuardGuard implements CanActivate {
  constructor(
    private identitySrv: IdentityService,
    private router: Router,
    private logger: LoggerService,
    private tokenSrv: TokenStorageService,
    private cookieSrv: CookieService) { }
  canActivate(next: ActivatedRouteSnapshot): boolean {
    const refresh = this.tokenSrv.getRefreshToken()
    // this.logger.log("d")
    // return true;
    // console.log(this.cookieSrv.get('loggedin'))
    // console.log(refresh)
    if (!this.cookieSrv.get('loggedin') && refresh) {
      this.identitySrv._refreshToken({ refresh: refresh }).subscribe((auth: any) => {
        if (auth) {
          this.logger.log('auth', auth)
          this.tokenSrv.saveRefreshToken(auth.refresh)
          this.tokenSrv.saveToken(auth.access)
          return true
        }
        else {

          this.tokenSrv.signOut()
          this.router.navigateByUrl("/register/login")
          return false
        }
      }, error => {
        this.tokenSrv.signOut()


        this.router.navigateByUrl("/register/login")
      })
      return true
    }
    else if (!refresh) {
      this.tokenSrv.signOut()

      this.router.navigateByUrl("/landing")
      return false
    }
    else {
      return true
    }
  }
}
