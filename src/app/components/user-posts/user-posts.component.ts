import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from 'src/app/services/posts.service';

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

  constructor(config: NgbModalConfig, private modalService: NgbModal, private http: HttpClient, private postsService: PostsService) {
    // customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
  }

  ngOnInit(): void {
    this.postsService.getPosts().subscribe((res) => {
      this.posts = <any[]>res.posts;
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
    }
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
}
