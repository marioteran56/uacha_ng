import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient) { }

  getTags(): Observable<any> {
    return this.http.get<any>(environment.serverBaseURL + '/tags');
  }

  getPopularTags(): Observable<any> {
    return this.http.get<any>(environment.serverBaseURL + '/tags/findTagsStadistics');
  }

  deleteNoReferencedTags(): Observable<any> {
    return this.http.delete<any>(environment.serverBaseURL + '/tags');
  }
}
