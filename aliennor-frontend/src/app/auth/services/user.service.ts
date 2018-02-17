import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HelpersService } from '../../shared/services/helpers.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { config } from '../../../config';
import { map, first, tap } from "rxjs/operators";

let headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
headers.append('X-CSRFToken', localStorage.getItem('csrftoken'));

const httpOptions = {
  headers: headers,
  withCredentials: true
}

@Injectable()
export class UserService {
  user$ = new BehaviorSubject(<any>(this.getAuthDetails()));
  user: any = false;
  loggedIn = false;

  constructor(private http: HttpClient,
              private hs: HelpersService,
              public jwtHelperService: JwtHelperService) {
    this.setUserData();
  }

  authPost(url: string, data: any): Observable<any> {
    return this.http.post(url, data, httpOptions).pipe()
  }

  getOrSetUserName(): string {
    const username = this.user.username || localStorage.getItem('username');
    return (username) ? username : 'unregistered user';
  }

  usernameIsUnique(username: string): Observable<boolean> {
    return this.http.get(`${config.api}/ecocases/auth/username-exists/?u=${username}`).pipe(
      first(),
      map(res => {}),
      map(res => !res['data']['username_exists'])
    )
  }

  register(formData: any): Observable<any> {
    return this.authPost(`${config.api}/auth/register/`, formData).pipe(
      tap(res => {
        console.log('user service register set token: ', res.data);
        this.setToken(res.data);
      })
    )
  }

  login(formData: any): Observable<any> {
    console.log('login form data: ', formData);
    return this.authPost(`${config.api}/auth/login/`, formData)
      .pipe(
        tap(res => {
          console.log('user service login set token: ', res.data);
          this.setToken(res.data);
        })
    )
  }

  editPassword(formData: any): Observable<any> {
    return this.http.post(
      `${config.api}/user/update-password/`,
      formData,
      { withCredentials: true }
    );
  }

  editProfile(formData: any): Observable<any> {
    // need to set withCredentials to send csrf token for Django
    return this.http.post(`${config.api}/user/update/`, formData, httpOptions);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.setUserData();
  }

  isAuth(): boolean {
    const cookieToken = this.getToken();
    if (cookieToken) {
      return !this.jwtHelperService.isTokenExpired(cookieToken);
    }
    return false
  }

  getAuthDetails(): any {
    const cookieToken = this.getToken();
    console.log('cookieToken: ', cookieToken);
    if (cookieToken) {
      return this.jwtHelperService.decodeToken(cookieToken);
    }
    return false
  }

  setUserData(): void {
    this.user$.next(this.getAuthDetails());
    this.user = this.getAuthDetails();
    console.log('user: ', this.user);
  }

  public setToken(token: any): void {
    localStorage.setItem('token', token);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }
}
