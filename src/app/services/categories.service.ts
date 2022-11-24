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
    // return this.http.get<any>('assets/data/categories.json');
    // http://localhost:3000/categories/findAllWithTopics
    return this.http.get<any>(environment.serverBaseURL + '/categories/findAllWithTopics');
  }
}
