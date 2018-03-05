import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EcocasesComponent } from './components/ecocases/ecocases.component';
import { EcocaseDetailsComponent } from './components/ecocase-details/ecocase-details.component';
import { EcocasePostComponent } from './components/ecocase-post/ecocase-post.component';
import { EcocasesRoutingModule } from './ecocases-routing.module';
import { CommentsComponent } from './components/comments/comments.component';
import { EcocaseDetailResolverService } from './services/ecocase-detail-resolver.service';
import { AssociatedEsmsComponent } from './components/associated-esms/associated-esms.component';
import { HtmlToPlaintextPipe, TruncatePipe } from '../shared/pipes/custommed-pipes.pipe';
import { UntaggedEcocasesComponent } from './components/untagged-ecocases/untagged-ecocases.component';
import { EcocasesVisualizationComponent } from './components/ecocases-visualization/ecocases-visualization.component';
import { VisualizationComponent } from './components/visualization/visualization.component';
import { EsmsVisualizationComponent } from './components/esms-visualization/esms-visualization.component';


@NgModule({
  imports: [
    SharedModule,
    EcocasesRoutingModule
  ],
  declarations: [
    EcocasesComponent,
    EcocaseDetailsComponent,
    EcocasePostComponent,
    CommentsComponent,
    AssociatedEsmsComponent,
    HtmlToPlaintextPipe,
    UntaggedEcocasesComponent,
    VisualizationComponent,
    EcocasesVisualizationComponent,
    EsmsVisualizationComponent
  ],
  providers: [
    EcocaseDetailResolverService
  ]
})
export class EcocasesModule { }
