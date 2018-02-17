import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../auth/services/user.service';
import { Router } from '@angular/router';
import { AsyncFormValidatorsService } from '../../services/async-form-validators.service';
import { emailValidator } from '../../helpers/form-validators';
import { finalize, first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formError: boolean = false;
  formLoading: boolean = false;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private asyncValidators: AsyncFormValidatorsService,
    private us: UserService,
    private router: Router
  ) { this.setupForm() };

  setupForm(): void {
    this.registerForm = this.fb.group({
      username: [
        '',
        Validators.required
        // this.asyncValidators.usernameUnique
      ],
      email: ['', [Validators.required, emailValidator()]]
    });
  }

  submitForm(): void {
    this.formLoading = true;
    const formData = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.passwords.password
    };

    this.us.register(formData)
      .pipe(
        first(),
        finalize(() => this.formLoading = false))
      .subscribe(
        res => {
          this.us.setUserData();
          this.router.navigate(['user/login']);
        },
        err => {
          this.formError = true;
        }
      );
  }
  ngOnInit() {
  }
}
