import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { IdentityService } from '../_services/identity/identity.service';

let token: any = localStorage.getItem('refreshToken')
let authToken: any = localStorage.getItem('authToken')

@Injectable({
  providedIn: 'root'
})

export class AuhtGuardGuard implements CanActivate {
  constructor(private identitySrv: IdentityService, private router: Router) { }
  canActivate(next: ActivatedRouteSnapshot): boolean {
    return true;
    // if (token) {
    //   this.identitySrv._refreshToken({ refresh: token }).subscribe(auth => {
    //     if (auth) {
    //       localStorage.setItem('refreshToken', auth + "")
    //       return true
    //     }
    //     else {
    //       localStorage.clear()
    //       this.router.navigateByUrl("/register/login")
    //       return false
    //     }
    //   }, error => this.router.navigateByUrl("/register/login"))
    //   return true
    // } else {
    //   this.router.navigateByUrl("/register/login")

    //   return false
    // }
  }
}
