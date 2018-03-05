import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EcocasesService } from '../../services/ecocases.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-untagged-ecocases',
  templateUrl: './untagged-ecocases.component.html',
  styleUrls: ['./untagged-ecocases.component.scss']
})
export class UntaggedEcocasesComponent implements OnInit {
  public ecocases: any[];
  public esm_titles: any;
  public ecocasesSinceDate: Date | any;
  public spinnerStyles: any;
  public filters$: Observable<any>;
  public ctgsFilters: any[];
  public count_results: {
    esms: any,
    categories: any[]
  };

  constructor(
    private es: EcocasesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.spinnerStyles = {
      margin: '-24px -24px 16px -24px'
    };

    this.es.getFilterCriteria()
      .pipe(
        map(res => {
          console.log('getFilterCriteria res: ', res);
          this.ctgsFilters = res['data'].filter_criteria.categories.map(ctg => {
            ctg.checked = true;
            return ctg;
          });
          this.es.getUntaggedEcocases(this.ctgsFilters)
            .pipe(
              map(res => {
                this.ecocases = res.data.untagged_ecocases;
                this.ctgsFilters = this.es.updateCtgsFilters(this.ctgsFilters, res.data.count_results_by_ctgs);
                console.log('res: ', res);
                console.log('filters', this.ctgsFilters);
              }))
            .subscribe( data => {
              console.log('data', data)
            })
        }))
      .subscribe();
  }

  getEcocaseDetails(ecocase: any): void {
    console.log('ecocase to detail: ', ecocase);
    ecocase.detailsLoading = true;
    const title = encodeURIComponent(ecocase.title.toLowerCase().replace(/ /g, '-'));
    console.log('ecocase id: ', ecocase._id);
    console.log('ecocase title: ', ecocase.title);
    this.router.navigate([`ecocases/detail/${ecocase.id}`]);
  }

  createEcocase(): void {
    console.log('to create new ecocase: ');
    this.router.navigate(['ecocases/new/']);
  }

  applyFilters(filters: any): void {
    console.log('esm_titles: ', this.es.filters);
    console.log('filters: ', filters);
    this.es.appliedFiltersEcocases(filters)
      .pipe(
        map(res => {
          console.log('appliedFiltersEcocases: ', res.data.ecocases);
          this.ecocases = res.data.ecocases;
          this.filters = this.es.updateFilters(this.filters, res.data.count_results);
        }))
      .subscribe();
  }
}
