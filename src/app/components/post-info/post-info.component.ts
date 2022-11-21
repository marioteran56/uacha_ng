import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.css']
})
export class PostInfoComponent implements OnInit {

  post: any;

  constructor(config: NgbModalConfig, private modalService: NgbModal, private http: HttpClient, private postsService: PostsService) {
    // customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
  }

  ngOnInit(): void {
    this.postsService.getPost().subscribe((res) => {
      this.post = <any[]>res.post;
    });
  }

  openComments(content: any) {
		this.modalService.open(content, { size: 'lg' });
	}

}
