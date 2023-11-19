import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { environment } from 'src/environments/environment.development';


import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

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

  getProduct(id : string): Observable<Product>{
    return this.http.get<Product>(this.baseUrl + '/productos'+ id)
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
    return this.http.post<Product>(this.baseUrl + '/productos', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  updateProduct(id: number, data: Product): Observable<Product>{
    return this.http.put<Product>(this.baseUrl + '/productos/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  deleteProduct(id: number){
    return this.http.delete<Product>(this.baseUrl + '/productos/' + id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
}
