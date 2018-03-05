import { Component, OnInit, Input } from '@angular/core';
import { EcocasesService } from '../../services/ecocases.service';
import { FormBuilder } from '@angular/forms';
import { HelpersService } from '../../../shared/services/helpers.service';
import { UserService } from '../../../auth/services/user.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-associated-esms',
  templateUrl: './associated-esms.component.html',
  styleUrls: ['./associated-esms.component.scss']
})
export class AssociatedEsmsComponent implements OnInit {
  @Input() esmevaluations: any[];
  @Input() ecocaseId: string;
  esms: string[];
  firstESM: any;
  secondESM: any;
  associatedESMs: any[];
  associatedESMs$ = new BehaviorSubject<number>(1);

  constructor(
    private es: EcocasesService,
    private fb: FormBuilder,
    private helpers: HelpersService,
    public us: UserService
  ) { }

  ngOnInit() {
    console.log('associated-esm.component init:...', this.esmevaluations);
    this.firstESM = {'title': ''};
    this.secondESM = {'title': ''};
    this.esms = [
      'A', 'B', 'C', 'D'
    ]
    this.associatedESMs$
      .pipe(
        mergeMap(page => this.es.getAssociatedESMs(this.ecocaseId)),
        map(res => {
          console.log('res:', res);
          var obj = res.data.associated_esms_summary;
          return Object.keys(obj).map(key => obj[key])
        }))
      .subscribe(associatedESMs => {
        console.log('associatedESMs: ', associatedESMs);
        this.associatedESMs = associatedESMs ;
      });
    /*this.commentsPageNr$
      .pipe(
        mergeMap(page => this.es.getComments(this.ecocaseId, page)),
        map(res => res.data),
        map(comments => {
        return {
          comments: comments.comments.reverse(),
          currentPage: comments.current_page,
          totalPages: comments.total_pages,
          itemsPerPage: comments.items_per_page
        };
      }))
      .subscribe(commentsObj => {
        this.commentsData = commentsObj;
      });*/
  }

  submitEsmevaluations(esmevaluations: any[]): void{
    if ((this.firstESM.title == '') || (this.secondESM.title == ''))
      alert('Please select the most and the second most associated mechanism');
    else {
      console.log('esmevaluations: ', esmevaluations);
      esmevaluations.forEach(function(esmevaluation) {
        console.log('forEach esmevaluation: ', esmevaluation);
        esmevaluation.isFirstESM = esmevaluation.esm.title == this.firstESM.title;
        esmevaluation.isSecondESM = esmevaluation.esm.title == this.secondESM.title;
      }, this);
      this.es.submitEsmevaluations(esmevaluations, this.ecocaseId)
        .subscribe(res => {
          console.log('submit esmevaluations successfully!');
          this.associatedESMs$.next(1);
        });
    }
  };
}
