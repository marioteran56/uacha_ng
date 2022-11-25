import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from 'src/app/services/categories.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories: any[] = [];
  userInfo: any;
  gender: String = "Seleccione un género";
  fullName: any;
  birthDate: any;
  description: any;

  constructor(private router: Router, config: NgbModalConfig, private modalService: NgbModal, private categoriesService: CategoriesService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((res) => {
      this.categories = <any[]>res;
    });
    this.usersService.getUser("").subscribe((res) => {
      this.userInfo = <any[]>res.user;
    });
  }

  openUserInfo(content: any) {
    this.modalService.open(content);
  }

  editUserInfo(content: any) {
    this.modalService.open(content);
  }

  changeGender(value: String) {
    this.gender = value;
  }

  modifyUser() {
    if(this.fullName) JSON.stringify(this.fullName);
    if(this.gender) JSON.stringify(this.gender);
    if(this.birthDate) JSON.stringify(this.birthDate);
    if(this.description) JSON.stringify(this.description);
  }

  reloadWindow(categoryId: String, topic: String) {
    this.router.navigateByUrl(`/posts/${categoryId}/${topic}`).then(() => {
      window.location.reload();
    });
  }
}
