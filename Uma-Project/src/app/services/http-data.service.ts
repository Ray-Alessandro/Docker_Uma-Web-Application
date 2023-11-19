import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

import { User } from '../models/user.model';
import { Product } from '../models/product.model';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
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

  getUser(id : string): Observable<User>{
    return this.http.get<User>(this.baseUrl + '/users'+ id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getUsers(): Observable<User>{
    return this.http.get<User>(this.baseUrl + '/usuarios')
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  createUser(data: User): Observable<User>{
    return this.http.post<User>(this.baseUrl + '/users', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  updateUser(id: string, data: User): Observable<User>{
    return this.http.put<User>(this.baseUrl + '/users/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  deleteUser(id: string){
    return this.http.delete<User>(this.baseUrl + '/users/' + id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  // Product CRUD

  getProduct(id : string): Observable<Product>{
    return this.http.get<Product>(this.baseUrl + '/products'+ id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getProducts(): Observable<Product>{
    return this.http.get<Product>(this.baseUrl + '/productos')
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  createProduct(data: Product): Observable<Product>{
    return this.http.post<Product>(this.baseUrl + '/products', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  updateProduct(id: string, data: Product): Observable<Product>{
    return this.http.put<Product>(this.baseUrl + '/products/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  deleteProduct(id: string){
    return this.http.delete<Product>(this.baseUrl + '/products/' + id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
}
