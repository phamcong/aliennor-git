import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EcocasesComponent } from './components/ecocases/ecocases.component';
import { EcocaseDetailsComponent } from './components/ecocase-details/ecocase-details.component';
import { EcocaseDetailResolverService } from './services/ecocase-detail-resolver.service';
import { EcocasePostComponent } from './components/ecocase-post/ecocase-post.component';

const routes: Routes = [
  { path: 'ecocases', component: EcocasesComponent },
  {
    path: 'ecocases/detail/:id',
    component: EcocaseDetailsComponent,
    resolve: { ecocase: EcocaseDetailResolverService }
  },
  { path: 'ecocases/new', component: EcocasePostComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcocasesRoutingModule { }
