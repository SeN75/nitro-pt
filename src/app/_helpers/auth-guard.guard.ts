import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, } from '@angular/router';
import { IdentityService } from '../_services/identity/identity.service';

let token: any = localStorage.getItem('authToken')

@Injectable({
  providedIn: 'root'
})

export class AuhtGuardGuard implements CanActivate {
  constructor(private identitySrv: IdentityService) { }
  canActivate(next: ActivatedRouteSnapshot): boolean {
    this.identitySrv._refreshToken({ refresh: token }).subscribe(auth => {
      if (auth) {
        localStorage.setItem('authToken', auth + "")
        return true
      }
      else {
        localStorage.clear()
        return false
      }
    }, error => false)

    return true
  }
}
