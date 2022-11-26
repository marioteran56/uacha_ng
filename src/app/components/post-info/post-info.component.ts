import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from 'src/app/services/posts.service';
import { TagsService } from 'src/app/services/tags.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.css'],
})
export class PostInfoComponent implements OnInit {
  post: any;
  userInfo: any;
  tags: String[] = [];

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
      console.log(this.post);
    });
    this.usersService.getUser("").subscribe((res) => {
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
    upVoteBtn.style.color = '#64f52b';
    downVoteBtn.style.color = '#000000';
  }

  addUpdateUpVote(idComment: string) {
    console.log(idComment)
    this.postsService
      .saveComment('/comments/addVotesUp', {
        commentld: idComment,
        userld: '637efb0a61b0f8d7c35382a7',
      })
      .subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  addupdateDownVote(idComment: string) {
    this.postsService
      .saveComment('/comments/addDownVotes', {
        commentld: idComment,
        userld: '637efb0a61b0f8d7c35382a7',
      })
      .subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  addUpdateVotesUpOrDownPost(postld: string,collection: string){
    this.postsService
      .saveComment(`/posts/${collection}`, {
        postld: postld,
        userld: '637efb0a61b0f8d7c35382a7',
      })
      .subscribe(
        (data) => {
          console.log(data);
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
      console.log(commentFather);
      let obj: any = {
        content: comment.value,
        postld: this.post._id,
        userld: '637efb0a61b0f8d7c35382a7',
        commentFather: '',
      };
      if (commentFather != '') {
        obj.commentFather = commentFather;
      } else {
        delete obj.commentFather;
      }
      console.log(obj);
      this.postsService.saveComment('/comments', obj).subscribe(
        async (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  formatDate(date: string) {
    const dateObj = new Date(date);
    return dateObj.toDateString();
  }
}
