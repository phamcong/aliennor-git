import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../auth/services/user.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(
    public us: UserService,
    public router: Router
  ) { }

  ngOnInit() {
    // after each navigation event ends, check if auth token is not expired
    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd && !this.us.isAuth()) {
        this.us.logout();
      }
    });
  }

  logout(): void {
    this.us.logout();
    this.router.navigate(['/user/login']);
  }

  login(): void {
    this.router.navigate(['/user/login']);
  }

  goToEditProfile(): void {
    console.log('Edit profile');
    this.router.navigate(['/user/edit']);
  }
}
