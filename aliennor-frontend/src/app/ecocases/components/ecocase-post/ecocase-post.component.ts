import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EcocasesService } from '../../services/ecocases.service';
import { HelpersService } from '../../../shared/services/helpers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ecocase-post',
  templateUrl: './ecocase-post.component.html',
  styleUrls: ['./ecocase-post.component.scss']
})
export class EcocasePostComponent implements OnInit {
  ecocasePostForm: FormGroup;

  constructor(
    private es: EcocasesService,
    private fb: FormBuilder,
    private helpers: HelpersService,
    private router: Router
  ) {
    this.ecocasePostForm = this.fb.group({
      title: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  postEcocase(): void {
    if (!this.ecocasePostForm.valid) {
      return;
    }

    const title = this.ecocasePostForm.value['title'];

    this.es.postEcocase(title)
      .subscribe(res => {
        this.ecocasePostForm.reset();
        this.router.navigate([`ecocases`]);
      });
  }
}
