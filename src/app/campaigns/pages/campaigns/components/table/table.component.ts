import { Component, inject, OnInit } from '@angular/core';
import { debounceTime, finalize, Observable, Subject } from 'rxjs';
import { TableLazyLoadEvent } from 'primeng/table';
import { FilterMetadata } from 'primeng/api';
import { Campaigns, LazyLoadFilters } from '../../../../interfaces/campaings.interface';
import { CampaignsService } from '../../../../services/campaigns.service';

@Component({
  selector: 'campaigns-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  public campaigns: Campaigns[] = [];
  public totalRecords: number = 0;
  public first: number = 0;
  public last: number = 0;
  public loading!: boolean;
  private campaignService = inject(CampaignsService);
  private filterSubject: Subject<{column: string, value: string}> = new Subject();
  public filters$: Observable<{column: string, value: string}> = this.filterSubject.asObservable();
  private currentFilters: {[key: string]: FilterMetadata} = {};
  
  ngOnInit(): void{
    this.loading = true;
    this.initializerFilterSubject();
  }

  // Inicializa el Subject para los filtros

  initializerFilterSubject(): void {
    this.filters$.pipe(
      debounceTime(500)
    ).subscribe(({column, value}) => {
      this.currentFilters[column] = {value};      
      
      this.loadCampaigns({filters: this.currentFilters});
    });
  }

  onFilterChange(event: Event, column: string): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    this.filterSubject.next({column, value});
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
