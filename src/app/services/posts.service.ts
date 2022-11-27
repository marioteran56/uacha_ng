import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getPostsWithMethodPost(category: any, topic: any,obj:any): Observable<any> {
    return this.http.post<any>(environment.serverBaseURL + `/posts/filterTags/${category}/${topic}`,obj);
  }

  getPosts(category: any, topic: any): Observable<any> {
    return this.http.get<any>(environment.serverBaseURL + `/posts/${category}/${topic}`);
  }

  getPostsByTags(category: any, topic: any): Observable<any> {
    const obj: any = localStorage.getItem('tags');
    const tags = JSON.parse(obj);
    let tagsArr = [String];
    if (tags) {
      tags.forEach((element: any) => {
        tagsArr.push(element.description);
      });
    }
    if (tagsArr.length != 0) tagsArr.shift();
    return this.http.get<any>(environment.serverBaseURL + `/posts/${category}/${topic}/${tagsArr}`);
  }

  getPostsByUser(userId: any): Observable<any> {
    return this.http.get<any>(environment.serverBaseURL + `/posts/user/${userId}`);
  }

  getPost(postId: any): Observable<any> {
    return this.http.get<any>(environment.serverBaseURL + '/posts/' + postId);
  }

  postPost(post: any): Observable<any> {
    return this.http.post(environment.serverBaseURL + '/posts', post)
  }

  getPostComments(postId: any): Observable<any> {
    return this.http.get<any>(environment.serverBaseURL + '/comments/findByPostId/' + postId);
  }

  saveComment(collection: string, obj: any): Observable<any> {
    return this.http.post(environment.serverBaseURL + collection , obj)
  }

  createTag(obj: any): Observable<any> {
    return this.http.post(environment.serverBaseURL + '/posts/addTags', obj);
  }

  updatePost(postId: any, post: any): Observable<any> {
    return this.http.patch(environment.serverBaseURL + '/posts/' + postId, post);
  }

  deletePost(postId: any): Observable<any> {
    return this.http.delete(environment.serverBaseURL + '/posts/' + postId);
  }
}
