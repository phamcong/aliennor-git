import { NgModule } from '@angular/core';
import { UserRoutingModule } from './/user-routing.module';
import { AuthHomeComponent } from './components/auth-home/auth-home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { EditComponent } from './components/edit/edit.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { PasswordFormComponent } from './components/password-form/password-form.component';
import { HintDirective } from './directives/hint.directive';
import { ErrorsToListPipe } from '../shared/pipes/errors-to-list.pipe';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    AuthHomeComponent,
    RegisterComponent,
    LoginComponent,
    HintDirective,
    EditComponent,
    UserHomeComponent,
    PasswordFormComponent,
    ErrorsToListPipe
  ],
  providers: []
})
export class UserModule { }
