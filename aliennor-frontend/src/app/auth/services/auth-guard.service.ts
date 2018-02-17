import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private us: UserService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.us.isAuth()) {
      localStorage.setItem('error', 'You need to be logged in to access this page');
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
