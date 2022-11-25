import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: any;
  password: any;

  constructor(private router: Router, private http: HttpClient, private usersService: UsersService) { }

  ngOnInit(): void { }

  onLogin() {
    if(this.userName && this.password) {
      this.usersService.getUser(this.userName).subscribe(
        (data) => {
          if(data) {
            const hashedPassword = Md5.hashStr(this.password);
            if(data.password == hashedPassword) {
              this.router.navigateByUrl('/posts');
            } else {
              console.log("Contraseña incorrecta.")
            }
          } else {
            console.log("No se encontró el usuario y/o contraseña.")
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

}
