import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { Login } from '../models/login.model';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient, private cookieService: CookieService, private router:Router) {
        // Verificar si la cookie existe
        const cookieExists = this.cookieService.check('login');
        const cookieUserExists = this.cookieService.check('user');

        console.log("Cookie exists: ", cookieExists);
        console.log(cookieService.get('login'));
        console.log("Cookie user exists: ", cookieUserExists);
        console.log(cookieService.get('user'));

        if (!cookieExists || !cookieUserExists) {
          this.cookieService.set('login', 'unlogged');
        }

   }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  user: any;

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(
        `An error occurred ${error.status}, body was: ${error.error}`
      );
    } else {
      console.log(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError(()=>new Error('Something bad happened; please try again later.'));
  }

  loginUser(item: Login) {
    return this.http
      .post<Login>(environment.baseURL+'/usuarios/login', JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  loadUser(user : any){
    this.user = user;
    this.cookieService.set('user', JSON.stringify(user));

    console.log("user Cookiee: ");
    console.log(this.cookieService.get('user'));
    this.userLogged();

    this.cookieService.set('login', 'logged');
  }

  cookiesExist(){
    return this.cookieService.check('login') && this.cookieService.check('user');
  }


  getUser(){
    return JSON.parse(this.cookieService.get('user'));
  }

  userLogged(){
    this.cookieService.set('login', 'logged');
  }

  userUnlogged(){
    this.cookieService.set('login', 'unlogged');
    console.log("User state:", this.cookieService.get('login'));
    this.cookieService.delete('user');
  }

  isUserLogged(){
    return this.cookieService.get('login');
  }
}
