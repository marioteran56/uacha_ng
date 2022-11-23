import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  gender: String = "Seleccione un género";
  fullName: any;
  email: any;
  birthDate: any;
  description: any;
  userName: any;
  password: any;

  constructor() { }

  ngOnInit(): void {

  }

  changeGender(value: String) {
    this.gender = value;
  }

  registerUser() {
    if(this.fullName && this.email && this.gender && this.birthDate && this.description && this.userName && this.password) {
      // TODO: Check if email and user already used
      let hash = Md5.hashStr(this.password);
      let user = new User(this.fullName, this.email, this.gender, this.birthDate, this.description, this.userName, hash);
      console.log(JSON.stringify(user));
    }
  }
}
