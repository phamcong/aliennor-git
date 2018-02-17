import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { UserService } from './services/user.service';
import { Observable } from 'rxjs/Observable';
import { Injectable, Injector } from '@angular/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private us: UserService;
  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.us = this.injector.get(UserService);
    request = request.clone({
      setHeaders: {
        Authorization: `${this.us.getToken()}`
      }
    });

    return next.handle(request);
  }
}
