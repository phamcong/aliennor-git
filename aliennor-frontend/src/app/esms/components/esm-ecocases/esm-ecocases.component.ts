import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EsmsService } from '../../services/esms.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { EcocasesService } from '../../../ecocases/services/ecocases.service';

@Component({
  selector: 'app-esm-ecocases',
  templateUrl: './esm-ecocases.component.html',
  styleUrls: ['./esm-ecocases.component.scss']
})
export class EsmEcocasesComponent implements OnInit {
  public esmId: number;
  public esm: {'title': ''};
  public ecocases$: Observable<any>;
  public ecocases: any[];
  public spinnerStyles: any;
  public filters$: Observable<any>;
  public filters: {
    esms: any[],
    categories: any[]
  };
  public count_results: {
    esms: any,
    categories: any[]
  };

  constructor(
    private esmss: EsmsService,
    private route: ActivatedRoute,
    private es: EcocasesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.esm = {'title': ''};
    this.filters = {esms: [], categories: []};
    this.route.params.subscribe(params => {
      this.esmId = +params['id']; // (+) converts string 'id' to a number
      console.log('esmIddddd', this.esmId);
      this.ecocases$ = this.esmss.getESMById(this.esmId)
        .pipe(
          map(res => {
            this.esm = res.data.esm;
            this.esm['checked'] = true;
            this.filters$ = this.es.getFilterCriteria()
              .pipe(
                map(res => {
                  this.filters.esms = [this.esm];
                  this.filters.categories = res.data.filter_criteria.categories.map(ctg => { ctg.checked = true; return ctg; });
                  this.es.getEcocases(this.filters)
                    .pipe(
                      map( res => {
                        console.log('esm-ecocases.component getEcocases ===> res: ', res);
                        this.ecocases = res.data.ecocases;
                        this.filters = this.es.updateFilters(this.filters, res.data.count_results);
                        console.log('fitlers: ', this.filters);
                      }))
                    .subscribe();
                }))
              .subscribe();
          }))
        .subscribe();
      // this.ecocases$ = this.esmss.getEcocasesByESM(this.esmId)
      //   .pipe(
      //     map(res => {
      //       console.log('esm-ecocases component res', res);
      //       this.ecocases = res.data.ecocases;
      //     })
      //   )
      // this.ecocases$.subscribe();
    });

    this.spinnerStyles = {
      margin: '-24px -24px 16px -24px'
    };

    /*this.filters$ = this.es.getFilterCriteria();
    this.filters = this.es.filters;

    this.esmss.getESMById(this.esmId)
      .pipe(
        map(res => {
          this.esm = res.data.esm;
          this.esm['checked'] = true;
        })
      )
      .subscribe();
    console.log('esm: ', this.esm);
    console.log('filters: ', this.filters);*/
  }

  getEcocaseDetails(ecocase: any): void {
    console.log('ecocase to detail: ', ecocase);
    ecocase.detailsLoading = true;
    const title = encodeURIComponent(ecocase.title.toLowerCase().replace(/ /g, '-'));
    console.log('ecocase id: ', ecocase.id);
    console.log('ecocase title: ', ecocase.title);
    this.router.navigate([`ecocases/detail/${ecocase.id}`]);
  }

  applyFilters(filters: any): void {
    filters.esms = [this.esm];
    console.log('filters: ', filters);
    this.es.appliedFiltersEcocases(filters)
      .pipe(
        map(res => {
          console.log('res: ', res);
          this.ecocases = res.data.ecocases;
          this.filters = this.es.updateFilters(this.filters, res.data.count_results);
        }))
      .subscribe();
  }
}
