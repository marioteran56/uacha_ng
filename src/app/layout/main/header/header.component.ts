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
  categoryName: String = 'Seleccione una categoria';
  fullName: any;
  birthDate: any;
  description: any;
  user: any;
  headerRef: String = "";
  category: any;
  topics: any[] = [];

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private categoriesService: CategoriesService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((res) => {
      this.categories = <any[]>res;
      this.headerRef = `posts/${this.categories[0]._id}/${this.categories[0].topics[0]}`
    });
    let obj: any = localStorage.getItem('user');
    this.user = JSON.parse(obj);
    this.usersService.getUser(this.user.userName).subscribe((res) => {
      this.userInfo = <any[]>res;
    });
  }

  openUserInfo(content: any) {
    this.modalService.open(content);
  }

  openCategoriesPanel(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  editUserInfo(content: any) {
    this.modalService.open(content);
  }

  changeGender(value: String) {
    this.gender = value;
  }

  addTopic(topic: any) {
    if (topic.value != '') {
      this.topics.push(topic.value);
      topic.value = '';
    }
  }

  deleteTopic(topic: String) {
    this.topics.splice(this.topics.indexOf(topic), 1);
  }

  selectCategory(category: any) {
    this.category = category;
    this.categoryName = category.title;
    this.topics = category.topics;
  }

  addCategory(categoryTitle: string) {
    if(categoryTitle && this.topics.length != 0) {
      let newCategory = {
        title: categoryTitle,
        topics: this.topics
      }
      this.categoriesService.addCategory(newCategory).subscribe(
        (data) => {
          window.location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  editCategory() {
    if(this.category && this.categoryName && this.topics.length != 0) {
      let newCategory = {
        title: this.categoryName,
        topics: this.topics
      }
      this.categoriesService.editCategory(this.category._id, newCategory).subscribe(
        (data) => {
          window.location.reload();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  deleteCategory() {
    this.categoriesService.deleteCategory(this.category._id).subscribe(
      (data) => {
        window.location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  modifyUser() {
    this.usersService
      .updateUser(this.userInfo.userName, {
        fullName: this.fullName ? this.fullName : this.userInfo.fullName,
        gender: this.gender != 'Seleccione un género' ? this.gender : this.userInfo.gender,
        birthDate: this.birthDate ? new Date(
          this.birthDate.year,
          this.birthDate.month - 1,
          this.birthDate.day
        ) : this.userInfo.birthDate,
        description: this.description ? this.description : this.userInfo.description,
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

  logout() {
    this.router.navigateByUrl(`/login`).then(() => {
      localStorage.clear();
    });
  }

  reloadWindow(categoryId: String, topic: String) {
    this.router.navigateByUrl(`/posts/${categoryId}/${topic}`).then(() => {
      window.location.reload();
    });
  }

  formatDate(date: string) {
    const dateObj = new Date(date);
    return dateObj.toDateString();
  }
}
