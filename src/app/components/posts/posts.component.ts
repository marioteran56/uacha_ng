import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from 'src/app/services/posts.service';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  uploaded: boolean = false;
  imageUrl: any;
  tags: String[] = [];
  posts: any[] = [];

  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private http: HttpClient,
    private postsService: PostsService,
    private dateService: DataService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.postsService.getPosts().subscribe((res) => {
      // this.posts = <any[]>res;
      // console.log(res);
      res.forEach((element:any) => {
        console.log(element);
        this.posts.push(element);
      });
    });
    // this.getPosts();
  }

  async getPosts(){
    this.posts = [];
    await this.dateService.find('/posts').subscribe((res) => {
      res.forEach((element: any) => {
        console.log(element);
        this.posts.push(element);
      });
    });
  }

  open(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  imageUpload(event: any) {
    this.uploaded = true;

    var reader = new FileReader();
    reader.readAsDataURL(event.files[0]);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    };
  }

  onUploadClose() {
    this.imageUrl = '';
    this.uploaded = false;
    this.tags = [];
  }

  addTag(tag: any) {
    if (tag.value != '') {
      this.tags.push(tag.value);
      tag.value = '';
    }
  }

  deleteTag(tag: String) {
    this.tags.splice(this.tags.indexOf(tag), 1);
  }

  addPost(title: any, content: any) {
    if (title.value != '' && content.value != '') {
      this.postsService
        .postPost({
          title: title.value,
          content: content.value,
          date: Date.now(),
          votes: 0,
          multimedia: this.imageUrl,
          tags: this.tags,
        })
        .subscribe(
          (data) => {
            if (data == 200) {
              console.log('Publicación guardada con exito.');
            } else {
              console.log('Publicación no ha sido guardada.');
            }
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
}
