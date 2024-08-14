import { Component, inject, OnInit } from '@angular/core';
import { Campaigns, LazyLoadFilters } from '../../interfaces/campaings.interface';
import { CampaignsService } from '../../services/campaigns.service';
import { finalize } from 'rxjs';
import { TableLazyLoadEvent } from 'primeng/table';

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

  applyFilter(filters: LazyLoadFilters): string{
    let filterParams = '';

    for (const field in filters) {
      if (filters[field] == undefined) continue;

      const filterValue = filters[field];

      if (Array.isArray(filterValue)) {
        // Manejar el caso de FilterMetadata[]
        filterValue.forEach(filter => {
          if (filter.value) {
            filterParams += `&${field}=${filter.value}`;
          }
        });
      } else if (filterValue) {
        // Manejar el caso de FilterMetadata
        if (filterValue.value) {
          filterParams += `&${field}=${filterValue.value}`;
        }
      }
    }

    return filterParams;
  }

  loadCampaigns(event: TableLazyLoadEvent): void{
    this.loading = true;  
    
    const page:number = (event.first ?? 0)/ (event.rows ?? 10) + 1;
    const size:number = (event.rows ?? 10);

    let filterParams:string = '';
    const filters:LazyLoadFilters | undefined = event.filters;

    let sortField:string | string[] = (event.sortField ?? 'id');
    let sortOrder:number = (event.sortOrder ?? 1);

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
