import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';
import { DataFirestoreService } from 'src/app/services/data.firestore.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  uploaded: boolean = false;
  imageUrl: any;
  tags: String[] = [];
  posts: any[] = [];
  post: any;
  user: any

  constructor(config: NgbModalConfig, private modalService: NgbModal, private postsService: PostsService, private usersService: UsersService, private firebaseData: DataFirestoreService) {
    // customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
  }

  ngOnInit(): void {
    let obj: any = localStorage.getItem('user');
    this.user = JSON.parse(obj);
    this.usersService.getUser(this.user.userName).subscribe((res) => {
      this.user = <any>res;
      this.postsService.getPostsByUser(this.user._id).subscribe((res) => {
        this.posts = <any[]>res;
      });
    });
  }

  open(content: any, post: any) {
    this.post = post;
    this.tags = post.tags;
    this.imageUrl = post.multimedia
		this.modalService.open(content, { size: 'lg' });
    if (this.post.multimedia != "") {
      this.uploaded = true;
      this.imageUrl = this.post.multimedia;
    }
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
    this.imageUrl = "";
    this.uploaded = false;
    this.tags = [];
  }

  addTag(tag: any) {
    if(tag != "") {
      this.tags.push(tag.value);
      tag.value = "";
    }
  }
  
  deleteTag(tag: String) {
    this.tags.splice(this.tags.indexOf(tag), 1);
  }

  removeImage() {
    this.post.multimedia = "";
    this.imageUrl = "";
    this.uploaded = false;
  }

  updatePost(title: any, content: any) {
    this.postsService.updatePost(
      this.post._id,
      {
        title: title.value,
        content: content.value,
        date: Date.now(),
        multimedia: this.imageUrl,
        tags: this.tags
      })
    .subscribe(
      (data) => {
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deletePost(postId: any) {
    this.postsService.deletePost(postId).subscribe(
      (data) => {
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
