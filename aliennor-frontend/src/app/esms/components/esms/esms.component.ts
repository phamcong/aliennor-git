import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EcocasesService } from '../../../ecocases/services/ecocases.service';
import { EsmsService } from '../../services/esms.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-esms',
  templateUrl: './esms.component.html',
  styleUrls: ['./esms.component.scss']
})
export class EsmsComponent implements OnInit {
  public esms$: Observable<any>;
  public esms: any[]
  constructor(
    private es: EcocasesService,
    private esmss: EsmsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.esms$ = this.esmss.getESMs()
      .pipe(
        map(res => {
          console.log('esmsssssssssssss:', res.data.esms);
          return res.data.esms;
        }))
      .subscribe(data => {
        this.esms = data;
      });
  }
}


