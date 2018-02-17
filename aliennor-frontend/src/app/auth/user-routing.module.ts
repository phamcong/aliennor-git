import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { AuthHomeComponent } from './components/auth-home/auth-home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EditComponent } from './components/edit/edit.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NonAuthGuardService } from './services/non-auth-guard.service';

const routes: Routes = [
  {path: '', component: UserHomeComponent, children: [
      { path: '', component: AuthHomeComponent, canActivateChild: [NonAuthGuardService], children: [
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent }
      ]},
      { path: 'edit', component: EditComponent, canActivate: [AuthGuardService] }
    ]}
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  declarations: []
})

export class UserRoutingModule { }
