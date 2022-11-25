import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PostInfoComponent } from './components/post-info/post-info.component';
import { PostsComponent } from './components/posts/posts.component';
import { RegisterComponent } from './components/register/register.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { MainComponent } from './layout/main/main.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: MainComponent, children: [
    { path: 'posts/:category/:topic', component: PostsComponent },
    { path: 'myPosts', component: UserPostsComponent },
    { path: 'postInfo', component: PostInfoComponent }
  ]},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }