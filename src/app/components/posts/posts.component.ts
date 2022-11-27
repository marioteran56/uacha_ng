import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from 'src/app/services/posts.service';
import { DataService } from 'src/services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { DataFirestoreService } from 'src/app/services/data.firestore.service';
import { UsersService } from 'src/app/services/users.service';

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
  category: any;
  topic: any;
  userInfo: any;
  tagsSelect: any[] = [];

  constructor(
    private route: ActivatedRoute,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private postsService: PostsService,
    private categoriesService: CategoriesService,
    private firebaseData: DataFirestoreService,
    private usersService: UsersService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    console.log('TAGSSSS');
    let objTags: any = localStorage.getItem('tags');
    this.tagsSelect = JSON.parse(objTags);
    for (let i = 0; i < this.tagsSelect.length; i++) {
      console.log(this.tagsSelect[i]);
    }
    this.getPosts();
    this.categoriesService
      .getCategory(this.route.snapshot.paramMap.get('category'))
      .subscribe(
        (data) => {
          this.category = data.title;
        },
        (err) => {
          console.log(err);
        }
      );
    this.topic = this.route.snapshot.paramMap.get('topic');
    let obj: any = localStorage.getItem('user');
    this.userInfo = JSON.parse(obj);
    this.usersService.getUser(this.userInfo.userName).subscribe((res) => {
      this.userInfo = <any[]>res;
    });
  }

  imageChangeEvent(files: File[]) {
    if (files.length > 0) {
      this.existFiles = true;
    } else {
      this.existFiles = false;
    }
  }

  async getPosts() {
    console.log(this.route.snapshot.paramMap.get('category'));
    console.log(this.route.snapshot.paramMap.get('topic'));
    this.posts = [];
    this.postsService
      .getPostsWithMethodPost(
        this.route.snapshot.paramMap.get('category'),
        this.route.snapshot.paramMap.get('topic'),
        { tags: this.tagsSelect }
      )
      .subscribe((res) => {
        res.forEach((element: any) => {
          this.posts.push(element);
        });
      });

    // this.postsService
    //   .getPosts(
    //     this.route.snapshot.paramMap.get('category'),
    //     this.route.snapshot.paramMap.get('topic')
    //   )
    //   .subscribe((res) => {
    //     res.forEach((element: any) => {
    //       this.posts.push(element);
    //     });
    //   });
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
    this.onUpload(event);
  }

  inProgress: any;

  onUpload(event: any) {
    this.inProgress = true;
    const file = event.files[0];
    const path = `profile-pictures/${new Date().getTime()}`;
    this.firebaseData.uploadFile(path, file).then(
      (result) => {
        result.ref.getDownloadURL().then((photoUrl) => {
          this.imageUrl = photoUrl;
        });
      },
      (error) => {
        console.log(error);
      }
    );
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

  removeImage() {
    this.imageUrl = '';
    this.uploaded = false;
  }

  addPost(title: any, content: any) {
    if (title.value != '' && content.value != '') {
      this.postsService
        .postPost({
          title: title.value,
          content: content.value,
          date: Date.now(),
          categoryId: this.route.snapshot.paramMap.get('category'),
          topic: this.topic,
          userId: this.userInfo._id,
          multimedia: this.imageUrl,
        })
        .subscribe(
          async (data) => {
            for (let i = 0; i < this.tags.length; i++) {
              this.postsService
                .createTag({ postId: data._id, description: this.tags[i] })
                .subscribe((obj) => {
                  console.log(obj);
                });
            }
            window.location.reload();
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
}
