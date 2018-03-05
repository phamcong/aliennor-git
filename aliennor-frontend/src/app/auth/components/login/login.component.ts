import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../auth/services/user.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { catchError, first } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { MessageService } from '../../../shared/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
   private fb: FormBuilder,
   private us: UserService,
   private router: Router,
   private ms: MessageService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submitForm(): void {
    this.loginForm.markAsPending();
    const formData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    this.us.login(formData)
      .pipe(
        first(),
        catchError(this.ms.handleError('login', []))
      )
      .subscribe(
      res => {
        console.log('logged in successfully');
        this.us.setUserData();
        this.us.loggedIn = true;
        this.router.navigate(['ecocases/']);
      }
    );
  }

  ngOnInit() {
    console.log('At login component');
  }

}
