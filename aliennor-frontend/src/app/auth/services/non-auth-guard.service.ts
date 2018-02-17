import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class NonAuthGuardService implements CanActivateChild {

  constructor(
    private us: UserService,
    private router: Router
  ) { }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.us.isAuth()) {
      // TODO: logout or login?
      localStorage.setItem('error', 'You need to logout to access this page');
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
