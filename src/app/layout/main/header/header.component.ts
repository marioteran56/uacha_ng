import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesService } from 'src/app/services/categories.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  categories: any[] = [];
  userInfo: any;
  gender: String = 'Seleccione un género';
  fullName: any;
  birthDate: any;
  description: any;

  constructor(
    private router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private categoriesService: CategoriesService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((res) => {
      this.categories = <any[]>res;
    });
    let obj: any = localStorage.getItem('user');
    let user = JSON.parse(obj);
    this.usersService.getUser(user.userName).subscribe((res) => {
      this.userInfo = <any[]>res;
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
    if (this.fullName) JSON.stringify(this.fullName);
    if (this.gender) JSON.stringify(this.gender);
    if (this.birthDate) JSON.stringify(this.birthDate);
    if (this.description) JSON.stringify(this.description);
    if (
      this.fullName &&
      this.gender &&
      this.birthDate &&
      this.description &&
      this.userInfo
    ) {
      let birth = new Date(
        this.birthDate.year,
        this.birthDate.month - 1,
        this.birthDate.day
      );
      // let user = new User(this.fullName, this.email, this.gender, birth, this.description, this.userName, hash);
      console.log(this.userInfo.userName);
      this.usersService
        .updateUser(this.userInfo.userName, {
          fullName: this.fullName,
          gender: this.gender,
          birthDate: birth,
          description: this.description,
        })
        .subscribe(
          (data) => {
            // window.location.reload();
            console.log(data);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

  reloadWindow(categoryId: String, topic: String) {
    this.router.navigateByUrl(`/posts/${categoryId}/${topic}`).then(() => {
      window.location.reload();
    });
  }
}
