import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  gender: String = 'Seleccione un género';
  fullName: any;
  email: any;
  birthDate: any;
  description: any;
  userName: any;
  password: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {}

  changeGender(value: String) {
    this.gender = value;
  }

  registerUser() {
    if (
      this.fullName &&
      this.email &&
      this.gender &&
      this.birthDate &&
      this.description &&
      this.userName &&
      this.password
    ) {
      this.usersService.getUser(this.userName).subscribe(
        (data) => {
          if (!data) {
            // let hash = Md5.hashStr(this.password);
            let birth = new Date(
              this.birthDate.year,
              this.birthDate.month - 1,
              this.birthDate.day
            );
            // let user = new User(this.fullName, this.email, this.gender, birth, this.description, this.userName, hash);
            this.usersService
              .postUser({
                fullName: this.fullName,
                email: this.email,
                gender: this.gender,
                birthDate: birth,
                description: this.description,
                userName: this.userName,
                password: this.password,
              })
              .subscribe(
                (data) => {
                  this.router.navigateByUrl('/login');
                },
                (err) => {
                  console.log(err);
                }
              );
          } else {
            console.log('User already exists!');
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
