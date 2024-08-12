import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignsComponent } from './pages/campaigns/campaigns.component';
import { CampaignsRoutingModule } from './campaigns-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelModule } from 'primeng/panel';

@NgModule({
  imports: [
    CommonModule,
    CampaignsRoutingModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    PanelModule,
  ],
  declarations: [
    CampaignsComponent
  ]
})
export class CampaignsModule { }
