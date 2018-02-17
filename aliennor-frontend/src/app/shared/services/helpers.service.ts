import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams} from '@angular/common/http';
import { config } from '../../../config';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { first, map, tap } from 'rxjs/operators';

@Injectable()
export class HelpersService {

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { };

  showMessage(body: string): void {
    this.snackBar.open(body, 'OK', {
      duration: 3000,
      extraClasses: ['error']
    })
  }

  getCsrf(): Observable<any> {
    const csrfToken = localStorage.getItem('csrftoken');
    if (!csrfToken) {
      return this.http.get(`${config.api}/ecocases/auth/csrf`, { withCredentials: true }).pipe(
        first(),
        map(res => {}),
        tap(res => localStorage.setItem('csrftoken', res['data']))
      )
    }
    return of(csrfToken);
  }
}

