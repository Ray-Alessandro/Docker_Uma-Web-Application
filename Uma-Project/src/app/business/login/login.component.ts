import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData !: Login;
  
  value!: string;

  constructor(private loginService : LoginService) {}

  loginUser(){
    this.loginService.loginUser(this.loginData).subscribe(
      (data: any) => {
        console.log(data);
        this.loginService.loadUser(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
