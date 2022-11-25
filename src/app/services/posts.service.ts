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

  getPost(): Observable<any> {
    // return this.http.get<any>('assets/data/post.json');
    return this.http.post<any>(environment.serverBaseURL + '/posts/' + '638119e528d5ad71843fbb0c',{userld: '637efb0a61b0f8d7c35382a7'});
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
