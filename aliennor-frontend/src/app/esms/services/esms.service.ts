import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelpersService } from '../../shared/services/helpers.service';
import { UserService } from '../../auth/services/user.service';
import { config } from '../../../config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EsmsService {

  constructor(
    private http: HttpClient,
    private us: UserService,
    private hs: HelpersService
  ) { }

  getESMs(): any {
    console.log('at esms.service ===> get ESM');
    const url = `${config.api}/esms`;
    console.log('getESMs urlllll: ', url);
    return this.http.get(`${url}`)
  }

  getEcocasesByESM(esmId): Observable<any> {
    const url = `${config.api}/esms/${esmId}/ecocases`;
    console.log(url);
    return this.http.get(`${url}`);
  }

  getESMById(esmId): any {
    const url = `${config.api}/esms/${esmId}`;
    return this.http.get(`${url}`);
  }
}
