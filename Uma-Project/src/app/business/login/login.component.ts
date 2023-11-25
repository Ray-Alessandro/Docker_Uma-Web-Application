import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Login } from 'src/app/models/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData : Login = {
    correo : '',
    password : ''
  }

  constructor(private loginService : LoginService, private router:Router) {
    if (this.loginService.isUserLogged() == "logged") {
      console.log("User is logged");
      alert("Ya se encuentra logueado, cierra sesion para iniciar con otra cuenta");
      this.router.navigateByUrl('/home');
    }
  }

  loginUser(){
    console.log(this.loginData);

    this.loginService.loginUser(this.loginData).subscribe(
      (data: any) => {
        console.log(data);
        this.loginService.loadUser(data.user);
      },
      (error: any) => {
        console.log(error);
      }
    );

    //Enviar un mensaje de exito la navegador:
    alert("Se inicio sesion correctamente");

    this.router.navigateByUrl('/home');
  }
}
