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
  existFiles: boolean = false;

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
      res.forEach((element: any) => {
        console.log(element);
        this.posts.push(element);
      });
    });
    // this.getPosts();
  }

  imageChangeEvent(files: File[]) {
    if (files.length > 0) {
      this.existFiles = true;
    } else {
      this.existFiles = false;
    }
  }

  async getPosts() {
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
          date: new Date(),
          votes: 0,
          categoryld: '637f1c9b65da3c71c2b3a0c2',
          userld: '637efb0a61b0f8d7c35382a7',
          multimedia:
            'https://images.ecestaticos.com/ZDhbTLxrg_MvU7yF1vcmb4x4bEY=/144x0:2164x1515/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F462%2F155%2F108%2F462155108e372187abfa766023fd6c84.jpg',
          // tags: this.tags,
        })
        .subscribe(
          async (data) => {
            console.log(data);
            for (let i = 0; i < this.tags.length; i++) {
              this.postsService
                .createTag({ postld: data._id, description: this.tags[i] })
                .subscribe((obj) => {
                  console.log(obj);
                });
            }
            // if (data == 200) {
            //   for (let i = 0; i < this.tags.length; i++) {
            //     this.postsService.createTag({ postld: data. , description:'' })
            //   }
            //   console.log('Publicación guardada con exito.');
            // } else {
            //   console.log('Publicación no ha sido guardada.');
            // }
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
}
