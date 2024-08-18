import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignsComponent } from './pages/campaigns/campaigns.component';
import { CampaignsRoutingModule } from './campaigns-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelModule } from 'primeng/panel';
import { TableComponent } from './pages/campaigns/components/table/table.component';
import { AddComponent } from './pages/campaigns/components/add/add.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  imports: [
    CommonModule,
    CampaignsRoutingModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    PanelModule,
    DialogModule,
    InputTextModule
  ],
  declarations: [
    CampaignsComponent,
    AddComponent,
    TableComponent,
  ]
})
export class CampaignsModule { }
