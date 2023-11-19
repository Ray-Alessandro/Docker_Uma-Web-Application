import { Injectable } from '@angular/core';
import { Store } from '../models/store.model';
import { environment } from 'src/environments/environment.development';


import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

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

  getAllStores(): Observable<Store>{
    return this.http.get<Store>(this.baseUrl + '/tiendas')
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
  
}
