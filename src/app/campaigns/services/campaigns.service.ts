import { HttpClient, HttpParams } from '@angular/common/http';
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
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort_field', Array.isArray(sortField) ? sortField.join(',') : sortField)
      .set('order', sortOrder.toString())
      .set('filters', filterParams);
    
    return this.http.get<Pagination>(`${this.baseUrl}`, {params});
  }
}
