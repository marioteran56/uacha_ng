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

  addCategory(category: any): Observable<any> {
    return this.http.post<any>(environment.serverBaseURL + '/categories', category);
  }

  editCategory(categoryId: string, category: any): Observable<any> {
    return this.http.patch<any>(environment.serverBaseURL + '/categories/' + categoryId, category);
  }

  deleteCategory(categoryId: any): Observable<any> {
    return this.http.delete<any>(environment.serverBaseURL + '/categories/' + categoryId);
  }
}
