import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.css']
})
export class PostInfoComponent implements OnInit {

  post: any;
  userInfo: any;

  constructor(config: NgbModalConfig, private modalService: NgbModal, private http: HttpClient, private postsService: PostsService, private usersService: UsersService) {
    // customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
  }

  ngOnInit(): void {
    this.postsService.getPost().subscribe((res) => {
      this.post = <any[]>res;
    });
    this.usersService.getUser().subscribe((res) => {
      this.userInfo = <any[]>res.user;
    });
  }

  openComments(content: any) {
		this.modalService.open(content, { size: 'lg' });
	}

  openUserInfo(content: any) {
    this.modalService.open(content);
  }

  upVote(upVoteBtn: HTMLLabelElement, downVoteBtn: HTMLLabelElement) {
    upVoteBtn.style.color = "#64f52b";
    downVoteBtn.style.color = "#000000";
  }

  downVote(upVoteBtn: HTMLLabelElement, downVoteBtn: HTMLLabelElement) {
    upVoteBtn.style.color = "#000000";
    downVoteBtn.style.color = "#d11818";
    
  }

}
