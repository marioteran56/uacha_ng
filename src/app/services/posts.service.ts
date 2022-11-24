import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    // return this.http.get<any>('assets/data/posts.json');
    return this.http.get<any>(environment.serverBaseURL + '/posts');
  }

  getPost(): Observable<any> {
    // return this.http.get<any>('assets/data/post.json');
    return this.http.get<any>(environment.serverBaseURL + '/posts/' + '637fb0d531e31a961cd38058');
  }

  postPost(post: any): Observable<any> {
    console.log(post);
    // return this.http.post('assets/data/posts.json', post)
    return this.http.post(environment.serverBaseURL + '/posts', post)
  }

  createTag(obj: any): Observable<any> {
    console.log(obj);
    // return this.http.post('assets/data/posts.json', post)
    return this.http.post(environment.serverBaseURL + '/posts/addTags',obj);
  }
}
