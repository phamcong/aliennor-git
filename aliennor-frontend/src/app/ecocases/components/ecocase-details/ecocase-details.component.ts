import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../../auth/services/user.service';
import { EcocasesService } from '../../services/ecocases.service';
import { HelpersService } from '../../../shared/services/helpers.service';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-ecocase-details',
  templateUrl: './ecocase-details.component.html',
  styleUrls: ['./ecocase-details.component.scss']
})
export class EcocaseDetailsComponent implements OnInit {
  ecocase$: Observable<any>;
  ecocaseInternalDetails: any;
  ecocaseId: string;
  previousUserRating: number = 0;

  constructor(
    private route: ActivatedRoute,
    public us: UserService,
    private es: EcocasesService,
    private helpers: HelpersService
  ) { }

  ngOnInit() {
    console.log('this.route: ', this.route);
    this.ecocase$ = this.route.data.pipe(
      map(res => {
        console.log('get ecocase detail, res: ', res.ecocase.data.ecocase);
        return res.ecocase.data.ecocase;
      })
    );
    console.log('this.ecocase$: ', this.ecocase$);
    this.route.params
      .pipe(first())
      .subscribe(par => {
        const ecocaseId = par['id'];
        this.getInternalDetails(ecocaseId);
        this.ecocaseId = ecocaseId;
      })
  }

  private getInternalDetails(id: string): void {
    this.es.getEcocasesInternalDetails(id)
      .subscribe(res => this.ecocaseInternalDetails = res)
  }

}
