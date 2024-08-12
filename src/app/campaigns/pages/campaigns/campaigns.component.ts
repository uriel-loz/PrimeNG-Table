import { Component, inject, OnInit } from '@angular/core';
import { Campaigns } from '../../interfaces/campaings.interface';
import { CampaignsService } from '../../services/campaigns.service';
import { finalize } from 'rxjs';

@Component({
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {
  public campaigns: Campaigns[] = [];
  public totalRecords: number = 0;
  public first: number = 0;
  public last: number = 0;
  public loading!: boolean;
  private campaignService = inject(CampaignsService);

  ngOnInit(): void{
    this.loading = true;
  }

  applyFilter(filters: any): string{
    let filterParams = '';

    for (const field in filters) {
      if (filters[field].value) {
        filterParams += `&${field}=${filters[field].value}`;
      }
    }

    return filterParams;
  }

  loadCampaigns(event: any): void{
    this.loading = true;  
    
    const page:number = event.first / event.rows + 1;
    const size:number = event.rows;

    let filterParams:string = '';
    const filters = event.filters;

    let sortField:string = event.sortField;
    let sortOrder:number = event.sortOrder;

    if (filters) 
      filterParams = this.applyFilter(filters);
    
    this.campaignService.getCampaigns(page, size, filterParams, sortField, sortOrder)
    .pipe(
      finalize(() => this.loading = false)
    ).subscribe((campaigns) => {
      this.campaigns = campaigns.data;
      this.totalRecords = campaigns.total;
      this.first = campaigns.from;
      this.last = campaigns.to;
    });

  }

}
