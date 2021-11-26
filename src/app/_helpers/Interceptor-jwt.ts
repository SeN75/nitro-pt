import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from '../_services/identity/token-storage.service';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../_services/identity/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

const TOKEN_HEADER_KEY = 'x-access-token';    // for Node.js Express back-end




@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private tokenService: TokenStorageService,
    private authService: AuthService,
    private router: Router,
    private cookieSrv: CookieService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    let authReq = req;
    const token = this.tokenService.getToken();
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(catchError((error: any) => {

      if (error instanceof HttpErrorResponse && !authReq.url.includes('auth/user/login/refresh/') && error.status === 401) {
        return this.handle401Error(authReq, next);
      }

      return throwError(error);
    }));

  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): any {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = this.tokenService.getRefreshToken();

      if (token)

        return this.authService.refreshToken(token).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;

            this.tokenService.saveToken(token.access);
            this.tokenService.saveRefreshToken(token.refresh);
            this.refreshTokenSubject.next(token.access);

            return next.handle(this.addTokenHeader(request, token.access));
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this.tokenService.signOut();
            this.router.navigateByUrl('/landing')
            this.cookieSrv.delete('loggedin')
            this.router.navigateByUrl('/landing')
            return throwError(err);
          })
        );
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    // return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, token, ) });
    if (!request.url.includes('auth/user/login/refresh/')) {

      return request.clone({
        setHeaders: {
          Authorization: `JWT ${token}`

        }
      });
    }
    console.log(request)
    return request
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
