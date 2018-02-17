import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EcocasesService } from '../../services/ecocases.service';
import { Router } from '@angular/router';
import { async } from 'rxjs/scheduler/async';


@Component({
  selector: 'app-ecocases',
  templateUrl: './ecocases.component.html',
  styleUrls: ['./ecocases.component.scss']
})

export class EcocasesComponent implements OnInit {
  public topEcocases$: Observable<any>;
  public filters$: Observable<any>;
  public esm_titles: any;
  public ecocasesSinceDate: Date | any;
  public spinnerStyles: any;
  public filters: {
    esms: any[],
    categories: any[]
  };

  constructor(
    private es: EcocasesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.topEcocases$ = this.es.getTopEcocases();
    console.log('ecocases.component, ecocases obtained from backend: ', this.topEcocases$);
    this.ecocasesSinceDate = this.es.ecocasesFromDate();

    // custom styles to fit loader to card container
    this.spinnerStyles = {
      margin: '-24px -24px 16px -24px'
    };

    this.filters$ = this.es.getFilterCriteria();
    this.filters = this.es.filters;
/*    this.filters = {esms: [], categories: []};
    this.filters.esms = this.es.filters.esms.map(esm => {
      esm.checked = false;
      return esm
    });

    this.filters.categories = this.es.filters.categories.map(ctg => {
      ctg.checked = false;
      return ctg
    });*/
    /*this.filters = {
      mechanisms: [
        { title: 'Mechanism 01', checked: false, id: 'mc01'},
        { title: 'Mechanism 02', checked: false, id: 'mc02' },
        { title: 'Mechanism 03', checked: false, id: 'mc03' },
        { title: 'Mechanism 04', checked: false, id: 'mc04' },
        { title: 'Mechanism 05', checked: false, id: 'mc05' }
      ],
      categories: [
        { title: 'Category 01', checked: false },
        { title: 'Category 02', checked: false },
        { title: 'Category 03', checked: false },
        { title: 'Category 04', checked: false },
        { title: 'Category 05', checked: false }
      ]
    }*/
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
    this.topEcocases$ = this.es.appliedFiltersEcocases(filters);
  }
}
