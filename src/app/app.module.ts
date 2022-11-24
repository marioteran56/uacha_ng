import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './layout/main/main.component';
import { HeaderComponent } from './layout/main/header/header.component';
import { MenuComponent } from './layout/main/menu/menu.component';
import { PostsComponent } from './components/posts/posts.component';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenubarModule } from 'primeng/menubar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { ImageModule } from 'primeng/image';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { PostInfoComponent } from './components/post-info/post-info.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';

// Form image
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ImageInputMolecule } from 'src/molecules/image-input/image-input.molecule';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    MenuComponent,
    PostsComponent,
    UserPostsComponent,
    PostInfoComponent,
    LoginComponent,
    RegisterComponent,
    ImageInputMolecule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    MegaMenuModule,
    MenubarModule,
    NgbModule,
    FileUploadModule,
    HttpClientModule,
    ImageModule,
    BrowserAnimationsModule,
    FormsModule,
    NgxDropzoneModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
