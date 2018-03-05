import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EsmsRoutingModule } from './esms-routing.module';
import { EsmsComponent } from './components/esms/esms.component';
import { EsmEcocasesComponent } from './components/esm-ecocases/esm-ecocases.component';
import { EsmsService } from './services/esms.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EsmsRoutingModule
  ],
  declarations: [
    EsmsComponent,
    EsmEcocasesComponent
  ],
  providers: [EsmsService]
})
export class EsmsModule { }
