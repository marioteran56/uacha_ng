import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories: any[] = [];

  constructor(config: NgbModalConfig, private modalService: NgbModal, private http: HttpClient, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((res) => {
      this.categories = <any[]>res.categories;
    });
  }

  openUserInfo(content: any) {
    this.modalService.open(content);
  }
}
