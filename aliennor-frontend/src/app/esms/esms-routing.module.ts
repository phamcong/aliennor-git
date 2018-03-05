import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EsmsComponent } from './components/esms/esms.component';
import { EsmEcocasesComponent } from './components/esm-ecocases/esm-ecocases.component';

const routes: Routes = [
  { path: 'esms', component: EsmsComponent },
  { path: 'esms/:id/ecocases', component: EsmEcocasesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EsmsRoutingModule { }
