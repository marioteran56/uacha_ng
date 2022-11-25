import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any> {
    return this.http.get<any>(environment.serverBaseURL + '/categories');
  }

  getCategory(id: any): Observable<any> {
    return this.http.get<any>(environment.serverBaseURL + '/categories/' + id);
  }
}
