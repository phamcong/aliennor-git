import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../auth/services/user.service';
import { emailValidator } from '../../helpers/form-validators';
import { Observable } from 'rxjs/Observable';
import { catchError, first } from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  updateProfileForm: FormGroup;
  passwordForm: FormGroup;
  success = {
    profile: false,
    password: false
  }

  constructor(
    private fb: FormBuilder,
    private us: UserService
  ) { this.setupForm() }

  ngOnInit() {
    console.log('At user edit component.');
  }

  setupForm(): void {
    this.updateProfileForm = this.fb.group({
      username: [
        { value: '', disabled: true },
        Validators.required
      ],
      email: ['', [Validators.required, emailValidator()]]
    });

    this.us.user$
      .pipe(first())
      .subscribe(user => {
        this.updateProfileForm.patchValue({
          username: user.username,
          email: user.email
        });
      });

    // create empty formGroup that will be populated by password-form component
    this.passwordForm = this.fb.group({});
  }

  updateProfile(): void {
    this.success.profile = false;
    this.updateProfileForm.markAsPending();
    const formData = {
      username: this.updateProfileForm.value.username,
      email: this.updateProfileForm.value.email
    };

    this.us.editProfile(formData)
      .pipe(first())
      .subscribe(
        res => {
          this.success.profile = true;
          this.us.setUserData();
          // by using setErrors I can revert the markAsPending state
          this.updateProfileForm.setErrors({});
        },
        err => {
          this.updateProfileForm.setErrors({
            formError: true
          });
        }
      );
  }

  updatePassword(): void {
    this.success.password = false;
    this.passwordForm.markAsPending();
    const formData = {
      oldPassword: this.passwordForm.value.passwords.oldPassword,
      password: this.passwordForm.value.passwords.password
    };

    this.us.editPassword(formData)
      .pipe(
        first(),
        catchError((err: any) => {
          let formError;
          if (err.status === 401) {
            formError = { wrongPassword: true };
          } else {
            formError = { formError: true };
          }
          this.passwordForm.setErrors(formError);

          return Observable.throw(new Error(err));
        }))
      .subscribe(
        res => {
          this.success.password = true;
          this.us.setUserData();
          // by using setErrors I can revert the markAsPending state
          this.passwordForm.setErrors({});
        }
      );
  }
}
