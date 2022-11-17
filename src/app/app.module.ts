import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './layout/main/main.component';
import { HeaderComponent } from './layout/main/header/header.component';
import { MenuComponent } from './layout/main/menu/menu.component';
import { PostsComponent } from './components/posts/posts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MegaMenuModule } from 'primeng/megamenu';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    MenuComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AppRoutingModule,
    MegaMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
