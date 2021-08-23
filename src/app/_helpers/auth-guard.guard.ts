import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { IdentityService } from '../_services/identity/identity.service';

let token: any = localStorage.getItem('refreshToken')

@Injectable({
  providedIn: 'root'
})

export class AuhtGuardGuard implements CanActivate {
  constructor(private identitySrv: IdentityService, private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot): boolean {
    if (token) {

      return true
    }
    // this.identitySrv._refreshToken({ refresh: token }).subscribe(auth => {
    //   if (auth) {
    //     localStorage.setItem('refreshToken', auth + "")
    //     return true
    //   }
    //   else {
    //     localStorage.clear()
    //     this.router.navigateByUrl("/register/login")
    //     return false
    //   }
    // }, error => this.router.navigateByUrl("/register/login"))
    this.router.navigateByUrl("/register/login")
    return false
  }
}
