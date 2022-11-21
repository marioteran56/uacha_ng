import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(config: NgbModalConfig, private modalService: NgbModal) { }

  ngOnInit(): void {

  }

  openUserInfo(content: any) {
    this.modalService.open(content);
  }

}
