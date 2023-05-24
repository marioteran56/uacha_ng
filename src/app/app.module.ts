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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ImageModule } from 'primeng/image';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { PostInfoComponent } from './components/post-info/post-info.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { TokenInterceptor } from './services/token.interceptor';

// Form image
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ImageInputMolecule } from 'src/molecules/image-input/image-input.molecule';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environment/environment';
import { AuthGuard } from './services/auth.guard';
import { RoleGuard } from './services/role.guard';
import { MessageService } from 'primeng/api';

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
    
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
