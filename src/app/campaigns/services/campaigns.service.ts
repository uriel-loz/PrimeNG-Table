import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Campaigns, Pagination } from '../interfaces/campaings.interface';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:8000/api/campaigns';
  private campaignsSubject = new BehaviorSubject<Campaigns[]>([]);
  public campaigns$: Observable<Campaigns[]> = this.campaignsSubject.asObservable();

  getCampaigns(page: number, size: number, filterParams: string, sortField: string | string[], sortOrder: number): Observable<Pagination> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort_field', Array.isArray(sortField) ? sortField.join(',') : sortField)
      .set('order', sortOrder.toString())
      .set('filters', filterParams);
    
    return this.http.get<Pagination>(`${this.baseUrl}`, {params})
      .pipe(
        tap((response: Pagination) => {
          this.campaignsSubject.next(response.data);
        })
      );
  }

  createCampaign(data: Campaigns): Observable<Campaigns> {
    return this.http.post<Campaigns>(`${this.baseUrl}`, data)
      .pipe(
        tap(newCampaign => {
          const currentCampaigns = this.campaignsSubject.value;
          this.campaignsSubject.next([...currentCampaigns, newCampaign]);
        })
      );
  }
}
