import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { D3VisualizationComponent } from './components/d3-visualization/d3-visualization.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
