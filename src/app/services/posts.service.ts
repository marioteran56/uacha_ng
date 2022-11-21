import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get<any>('assets/data/posts.json');
  }

  getPost(): Observable<any> {
    return this.http.get<any>('assets/data/post.json');
  }

  postPost(post: any): Observable<any> {
    console.log(post);
    return this.http.post('assets/data/posts.json', post)
  }
}
