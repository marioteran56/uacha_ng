import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userName: any;
  password: any;

  constructor(
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {}

  onLogin() {
    if (this.userName && this.password) {
      const user = {
        email: this.userName,
        password: this.password,
      }
      this.usersService
        .login(user)
        .subscribe(
          (res) => {
            if (res) {
              this.router.navigateByUrl('/myPosts');
              const resUser = { ...res.user, token: res.token };
              localStorage.setItem('user',JSON.stringify(resUser));
            } else {
              console.log('No se encontró el usuario y/o contraseña.');
            }
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
}
