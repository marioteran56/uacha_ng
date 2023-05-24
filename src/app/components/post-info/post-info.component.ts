import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from 'src/app/services/posts.service';
import { TagsService } from 'src/app/services/tags.service';
import { UsersService } from 'src/app/services/users.service';
import { __asyncValues } from 'tslib';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.css'],
})
export class PostInfoComponent implements OnInit {
  post: any;
  userInfo: any;
  tags: String[] = [];
  postComments: any[] = [];
  user: any;

  constructor(
    private route: ActivatedRoute,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private postsService: PostsService,
    private usersService: UsersService
  ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.postsService.getPost(this.route.snapshot.paramMap.get('postId')).subscribe((res) => {
      this.post = <any[]>res[0];
      this.usersService.getUser(this.post.user.userName).subscribe((res) => {
        this.userInfo = <any[]>res;
      });
    });
    let obj: any = localStorage.getItem('user');
    this.user = JSON.parse(obj);
    this.usersService.getUser(this.user.userName).subscribe((res) => {
      this.user = <any>res;
    });
  }

  openComments(content: any) {
    this.getPostComments();
    this.modalService.open(content, { size: 'lg' });
  }

  openUserInfo(content: any) {
    this.modalService.open(content);
  }

  upVote(upVoteBtn: HTMLLabelElement, downVoteBtn: HTMLLabelElement) {
    upVoteBtn.style.color = '#64f52b';
    downVoteBtn.style.color = '#000000';
  }

  getPostComments() {
    this.postsService.getPostComments(this.post._id).subscribe((res) => {
      this.postComments = <any[]>res;
    });
  }

  addUpdateUpVote(commentId: string) {
    this.postsService
      .saveComment('/comments/addVotesUp', {
        commentId: commentId,
        userId: this.user._id,
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

  addupdateDownVote(commentId: string) {
    this.postsService
      .saveComment('/comments/addDownVotes', {
        commentId: commentId,
        userId: this.user._id,
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

  addUpdateVotesUpOrDownPost(postId: string, collection: string){
    this.postsService
      .saveComment(`/posts/${collection}`, {
        postId: postId,
        userId: this.user._id,
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

  downVote(upVoteBtn: HTMLLabelElement, downVoteBtn: HTMLLabelElement) {
    upVoteBtn.style.color = '#000000';
    downVoteBtn.style.color = '#d11818';
  }

  uploadComment(comment: any, commentFather: string) {
    if (comment.value && comment.value != '') {
      let obj;
      if(commentFather == this.post._id) {
        obj = {
          content: comment.value,
          date: Date.now(),
          postId: commentFather,
          commentId: null,
          userId: this.user._id
        };
      } else {
        obj = {
          content: comment.value,
          date: Date.now(),
          postId: null,
          commentId: commentFather,
          userId: this.user._id
        };
      }
      console.log(obj);
      this.postsService.saveComment('/comments', obj).subscribe(
        async (data) => {
          window.location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  deleteComment(comment: any) {
    this.postsService.deleteComment(comment._id).subscribe(
      (data) => {
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  formatDate(date: string) {
    const dateObj = new Date(date);
    return dateObj.toDateString();
  }

  checkForEmptyObj(obj: Object) {
    return JSON.stringify(obj) === '{}'
  }
}
