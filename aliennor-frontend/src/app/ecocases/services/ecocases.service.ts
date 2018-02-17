import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../../auth/services/user.service';
import { HelpersService } from '../../shared/services/helpers.service';
import * as moment from 'moment';
import { config } from '../../../config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import { first, map, mergeMap} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

const headers = new HttpHeaders();
headers.append('Content-Type', 'application/json');
headers.append('X-CSRFToken', localStorage.getItem('csrftoken'));

const httpOptions = {
  headers: headers,
  withCredentials: true
}

@Injectable()
export class EcocasesService {
  public filters = {
    'esms': [],
    'categories': []
  };

  constructor(
    private http: HttpClient,
    private us: UserService,
    private hs: HelpersService
  ) { }

  ecocasesFromDate(format?: string): Date | string {
    const daysAgo = 30;
    const date = moment().subtract(daysAgo, 'days');

    if (format) {
      return date.format(format);
    }
    return date.toDate();
  }

  getTopEcocases(): any {
    const url = `${config.api}/ecocases`;
    return this.http.get(`${url}`).pipe(
      map(res => {
        console.log('getTopEcocases res: ', res);
        console.log('data is a property', res.hasOwnProperty('data'));
        if (res.hasOwnProperty('data')) {
          const obj = res['data'].ecocases;
          console.log('objxxxxxxxx', obj);
          console.log('converted object: ', Object.keys(obj).map(key => obj[key]));
          return Object.keys(obj).map(key => obj[key])
        } else {
          return res;
        }
      })
    );
  }

  appliedFiltersEcocases(filters: any): any {
    console.log('appliedFiltersEcocases, filters: ', filters);
    const params = [
      `esms=${filters.esms.map(esm => (esm.checked) ? esm.title : '').join(',')}`,
      `categories=${filters.categories.map(ctg => (ctg.checked) ? ctg.title : '').join(',')}`
    ].join('&');
    const url = `${config.api}/ecocases/?${params}`;
    return this.http.get(url).pipe(
      map(res => {
        console.log('getTopEcocases res: ', res);
        console.log('data is a property', res.hasOwnProperty('data'));
        if (res.hasOwnProperty('data')) {
          const obj = res['data'].ecocases;
          return Object.keys(obj).map(key => obj[key])
        } else {
          return res;
        }
      })
    );
  }

  getEcocaseDetails(id: string): Observable<any> {
    const url = `${config.api}/ecocases/ecocase/${id}`;

    return this.http.get(url);
  }

  getEcocasesInternalDetails(id: string): Observable<any> {
    return this.http.get(`${config.api}/ecocases/ecocase/${id}/`)
      .pipe(first());
  }

  postEcocase(title: string): Observable<any> {
    const url = `${config.api}/ecocases/ecocase/post`;
    // check if user is logged in
    return this.us.user$.pipe(
      first(),
      mergeMap(user => {
        return this.http.post(url, { user, title}, { withCredentials: true});
      })
    );
  }

  rateEcocase(id: string, rating: number): Observable<any> {
    const url = `${config.api}/ecocases/rate`;
    // check if user is logged in
    return this.us.user$.pipe(
      first(),
      mergeMap(user => {
        if (user) {
          return this.http.post(url, { id, rating }, { withCredentials: true });
        }
        return this.postRequest(url, { id, rating });
      }));
  }

  getEcocasesRating(id: string): Observable<any> {
    const url = `${config.api}/ecocases/ecocase/${id}/rating/`;
    return this.postRequest(url, {});
  }

  removeRating(id: string): Observable<any> {
    const params = [
      `u=${this.us.getOrSetUserName()}`,
      `m_id=${id}`
    ].join('&');

    return this.http.delete(`${config.api}/ecocases/rate?${params}`, httpOptions).pipe(
      first(),
      map(res => console.log('removeRating res: ', res))
    );
  }

  getComments(id: string, page: number): Observable<any> {
    const params = [
      `u=${this.us.getOrSetUserName()}`,
      `p=${page}`
    ].join('&');

    return this.http.get(`${config.api}/ecocases/ecocase/${id}/comments/?${params}`)
  }

  postComment(ecocaseId: string, body: string): Observable<any> {
    const url = `${config.api}/ecocases/comment`;
    // check if user is logged in
    return this.us.user$.pipe(
      first(),
      mergeMap(user => {
        if (user) {
          return this.http.post(url, { ecocaseId, body }, { withCredentials: true });
        }
        return this.postRequest(url, { ecocaseId, body });
      }));
  }

  removeComment(id: string): Observable<any> {
    const params = [
      `u=${this.us.getOrSetUserName()}`,
      `id=${id}`
    ].join('&');

    return this.http.delete(`${config.api}/ecocases/comment?${params}`, httpOptions).pipe(
      first(),
      map(res => console.log('removeComment res :', res))
    );
  }

  getFilterCriteria(): any {
    console.log('at getFilterCriteria');
    const url = `${config.api}/ecocases/filters`;
    const filters = {'esms': [], 'categories': []};
    return this.http.get(`${url}`).pipe(
      map(res => {
        console.log('getFilterCriteria res: ', res);
        if (res.hasOwnProperty('data')) {
          this.filters.esms = res['data'].filter_criteria.esms.map(esm => {
            return {
              checked: true,
              title: esm
            };
          });
          this.filters.categories = res['data'].filter_criteria.categories.map(ctg => {
            return {
              checked: true,
              title: ctg
            };
          });
          return res['data'];
        } else {
          return res;
        }
      })
    );
  }

  private getEcocasesSummary(ecocaseIds: string[], tmdbRes: any): Observable<{tmdb: any, api: any}> {
    return Observable.combineLatest(
        of(tmdbRes),
        this.http.get(`${config.api}/ecocases/get-all?ids=${ecocaseIds.join(',')}`).pipe(map(api => console.log('api ', api))),
        (tmdb, api) => {
          return { tmdb, api };
        }
      );
  }

  private postRequest(url: string, data: any): Observable<any> {
    const username = this.us.getOrSetUserName();
    return this.http.post(url, Object.assign({ username }, data), httpOptions);
  }
}
