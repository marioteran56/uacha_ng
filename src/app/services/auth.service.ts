import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: any) {
    return this.http.post<any>(environment.serverBaseURL + '/auth/login', user);
  }

  getToken(): string {
    let user: any = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);
      if (user.token) {
        return user.token;
      }
    }
    return '';
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    const jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(token);
  }
}
