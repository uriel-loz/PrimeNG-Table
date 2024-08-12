import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignsComponent } from './pages/campaigns/campaigns.component';

const routes: Routes = [
  {
    path: '',
    component: CampaignsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignsRoutingModule { }
