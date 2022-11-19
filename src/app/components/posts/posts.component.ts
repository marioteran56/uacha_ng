import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of modals used by this component tree
		config.backdrop = 'static';
		config.keyboard = false;
  }

  ngOnInit(): void {
  }

  open(content: any) {
		this.modalService.open(content, { size: 'lg' });
	}

  myUploader(event: any) {
    
  }

}
