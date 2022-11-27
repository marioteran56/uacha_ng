import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUser(userName: any): Observable<any> {
    return this.http.get<any>(environment.serverBaseURL + '/users/' + userName);
  }

  postUser(user: Object): Observable<any> {
    return this.http.post<any>(environment.serverBaseURL + '/users/', user);
  }

  updateUser(username: string,user: Object): Observable<any> {
    return this.http.put<any>(environment.serverBaseURL + `/users/${username}`, user);
  }

  login(userName: any){
    return this.http.get<any>(environment.serverBaseURL + '/users/login/' + userName);
  }

}
