import { Injectable } from '@angular/core';
import { EcocasesService } from './ecocases.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { catchError, first } from 'rxjs/operators';
import { MessageService } from '../../shared/services/message.service';

@Injectable()
export class EcocaseDetailResolverService {

  constructor(
    private es: EcocasesService,
    private ms: MessageService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.params['id'];

    return this.es.getEcocaseDetails(id).pipe(
        first(),
        catchError(this.ms.handleError('ecocase detail resolve id: ', id))
      );
  }

}
