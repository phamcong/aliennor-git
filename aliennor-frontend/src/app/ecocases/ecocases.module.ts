import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EcocasesComponent } from './components/ecocases/ecocases.component';
import { EcocaseDetailsComponent } from './components/ecocase-details/ecocase-details.component';
import { EcocasePostComponent } from './components/ecocase-post/ecocase-post.component';
import { EcocasesRoutingModule } from './ecocases-routing.module';
import { CommentsComponent } from './components/comments/comments.component';
import { EcocaseDetailResolverService } from './services/ecocase-detail-resolver.service';


@NgModule({
  imports: [
    SharedModule,
    EcocasesRoutingModule
  ],
  declarations: [
    EcocasesComponent,
    EcocaseDetailsComponent,
    EcocasePostComponent,
    CommentsComponent
  ],
  providers: [
    EcocaseDetailResolverService
  ]
})
export class EcocasesModule { }
