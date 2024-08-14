import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from '../interfaces/campaings.interface';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8000/api/campaigns';

  getCampaigns(page: number, size: number, filterParams: string, sortField: string | string[], sortOrder: number): Observable<Pagination> {
    return this.http.get<Pagination>(`${this.baseUrl}?page=${page}&size=${size}&sort_field=${sortField}&order=${sortOrder}${filterParams}`);
  }
}
