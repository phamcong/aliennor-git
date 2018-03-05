import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../../auth/services/user.service';
import { EcocasesService } from '../../services/ecocases.service';
import { HelpersService } from '../../../shared/services/helpers.service';
import { ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-ecocase-details',
  templateUrl: './ecocase-details.component.html',
  styleUrls: ['./ecocase-details.component.scss']
})
export class EcocaseDetailsComponent implements OnInit {
  ecocaseInternalDetails: any;
  ecocaseId: string;
  ecocase: any;
  esmevaluations: any[];
  previousUserRating = 0;

  constructor(
    private route: ActivatedRoute,
    public us: UserService,
    private es: EcocasesService,
    private helpers: HelpersService
  ) { }

  ngOnInit() {
    console.log('this.route: ', this.route);
    // this.route.data.pipe(
    //   map(res => {
    //     console.log('get ecocase detail, res: ', res.ecocase.data);
    //     this.esmevaluations = res.ecocase.data.esmevaluations;
    //     this.esmevaluations.forEach(function(esmevaluation) {
    //       let answer = esmevaluation.answer
    //       esmevaluation.answer = answer ? String(answer).replace(/<[^>]+>/gm, '') : '';
    //     });
    //
    //     this.ecocase = res.ecocase.data.ecocase;
    //   })
    // );

    this.route.params
      .subscribe(par => {
        console.log('parrr: ', par);
        const ecocaseId = par['id'];
        this.es.getEcocaseDetails(ecocaseId)
          .pipe(
            map(res => {
              console.log('getEcocaseDetails: ', res);
              this.ecocase = res.data.ecocase;
              this.esmevaluations = res.data.esmevaluations;
              this.esmevaluations.forEach(function(esmevaluation) {
                let str = esmevaluation.answer;
                esmevaluation.answer = str ? String(str).replace(/<[^>]+>/gm, '') : '';
              });
            }))
          .subscribe();
        this.ecocaseId = ecocaseId;
      });
  }
/*
  private getInternalDetails(id: string): void {
    this.es.getEcocaseInternalDetails(id)
      .subscribe(res => this.ecocaseInternalDetails = res)
  }*/

}
