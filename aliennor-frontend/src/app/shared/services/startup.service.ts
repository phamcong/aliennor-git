import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { first, map, tap } from 'rxjs/operators';
import { config } from '../../../config';
import { of } from 'rxjs/observable/of';

@Injectable()
export class StartupService {

  constructor(
    private http: HttpClient
  ) { }

  load(): Promise<any> {
    return this.getCsrf()
      .toPromise()
      .catch(() => Promise.resolve());
  }

  getCsrf(): Observable<any> {
    const csrfToken = localStorage.getItem('csrftoken');
    console.log('startup service, csrfToken: ', csrfToken);
    if (!csrfToken) {
      return this.http.get(`${config.api}/auth/csrf`, { withCredentials: true })
        .pipe(
          first(),
          tap(res => {
            console.log('startup service, set csrfToken: ', res.data);
            localStorage.setItem('csrftoken', res.data);
          })
        );
    }
    return of(csrfToken);
  }
}
