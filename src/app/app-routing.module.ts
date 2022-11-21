import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostInfoComponent } from './components/post-info/post-info.component';
import { PostsComponent } from './components/posts/posts.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { MainComponent } from './layout/main/main.component';

const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: '', component: MainComponent, children: [
    { path: 'posts', component: PostsComponent },
    { path: 'myPosts', component: UserPostsComponent },
    { path: 'postInfo', component: PostInfoComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }