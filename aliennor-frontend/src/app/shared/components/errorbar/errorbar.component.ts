import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-errorbar',
  templateUrl: './errorbar.component.html',
  styleUrls: ['./errorbar.component.scss']
})
export class ErrorbarComponent implements OnInit {
  error: string;
  routerSub: Subscription;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.routerSub = this.router.events.subscribe(res => {
      // check, show and remove error after every navigation event
      if (res instanceof NavigationEnd) {
        this.error = localStorage.getItem('error');
        localStorage.removeItem('error');
      }
    });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }
}
