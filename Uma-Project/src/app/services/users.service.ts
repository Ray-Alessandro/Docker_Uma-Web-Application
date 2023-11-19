import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl: string = environment.baseURL;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.log(`An errorr ocurred ${error.status}, body was ${error.error}`);
    } else{
      console.log(`Backend returned code ${error.status}, body was ${error.error}`);
    }
    return throwError('Something happened with request, please try again later');
  }

  // User CRUD

  //Get User by ID
  getUser(id : string): Observable<User>{
    return this.http.get<User>(this.baseUrl + '/usuarios/'+ id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  //Get Users
  getUsers(): Observable<User>{
    return this.http.get<User>(this.baseUrl + '/usuarios')
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  //Create User
  createUser(data: User): Observable<User>{
    return this.http.post<User>(this.baseUrl + '/usuarios', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  //Update User
  updateUser(id: string, data: User): Observable<User>{
    return this.http.put<User>(this.baseUrl + '/usuarios/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  //Delete User
  deleteUser(id: string){
    return this.http.delete<User>(this.baseUrl + '/usuarios/' + id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
}