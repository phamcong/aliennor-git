import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { EcocasesComponent } from './ecocases/components/ecocases/ecocases.component';
import { UserService } from './auth/services/user.service';
import { HelpersService } from './shared/services/helpers.service';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { UserModule } from './auth/user.module';
import { StartupService } from './shared/services/startup.service';

import '../scss/styles.scss';
import { MessageService } from './shared/services/message.service';
import { TokenInterceptor } from './auth/token.interceptor';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { ErrorbarComponent } from './shared/components/errorbar/errorbar.component';
import { SharedModule } from './shared/shared.module';
import { EcocasesModule } from './ecocases/ecocases.module';
import { NonAuthGuardService } from './auth/services/non-auth-guard.service';
import { AuthGuardService } from './auth/services/auth-guard.service';
import { AsyncFormValidatorsService } from './auth/services/async-form-validators.service';
import { EcocaseDetailResolverService } from './ecocases/services/ecocase-detail-resolver.service';
import { EcocasesService } from './ecocases/services/ecocases.service';
import { RouterModule } from '@angular/router';
import { EsmsModule } from './esms/esms.module';
import { EsmsService } from './esms/services/esms.service';

export function startServiceFactory(ss: StartupService): () => Promise<any> {
  return () => ss.load()
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('crsftoken');
        },
        whitelistedDomains: ['localhost:4200']
      }
    }),
    UserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    EcocasesModule,
    EsmsModule,
    SharedModule,
    FlexLayoutModule
  ],
  providers: [
    UserService,
    AuthGuardService,
    NonAuthGuardService,
    AsyncFormValidatorsService,
    HelpersService,
    StartupService,
    MessageService,
    EcocasesService,
    EsmsService,
    EcocaseDetailResolverService,
    // service to get csrf token cookie from server before app initialization
    // otherwise each call to the django server will return a '403 Forbidden' error
    {
      provide: APP_INITIALIZER,
      useFactory: startServiceFactory,
      deps: [StartupService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
