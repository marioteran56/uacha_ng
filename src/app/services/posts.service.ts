import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getPosts(category: any, topic: any): Observable<any> {
    return this.http.get<any>(environment.serverBaseURL + `/posts/${category}/${topic}`);
  }

  getPost(postId: any): Observable<any> {
    return this.http.get<any>(environment.serverBaseURL + '/posts/' + postId);
  }

  postPost(post: any): Observable<any> {
    console.log(post);
    // return this.http.post('assets/data/posts.json', post)
    return this.http.post(environment.serverBaseURL + '/posts', post)
  }

  saveComment(collection: string,obj: any): Observable<any> {
    console.log(obj);
    // return this.http.post('assets/data/posts.json', post)
    return this.http.post(environment.serverBaseURL + collection , obj)
  }

  createTag(obj: any): Observable<any> {
    return this.http.post(environment.serverBaseURL + '/posts/addTags', obj);
  }
}
