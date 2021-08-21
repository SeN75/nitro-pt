import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Injectable()
export class NaitroInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('authToken')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      return next.handle(req);
    }
    return next.handle(req);
  }

}
