import { Injectable } from '@angular/core';
import { Publication } from '../models/publication.model';
import { environment } from 'src/environments/environment.development';


import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

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

  createPublication(data: Publication): Observable<Publication>{
    return this.http.post<Publication>(this.baseUrl + '/publicaciones', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getAllPublications(): Observable<Publication>{
    return this.http.get<Publication>(this.baseUrl + '/publicaciones')
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getPublicationByStoreId(id : string): Observable<Publication>{
    return this.http.get<Publication>(this.baseUrl + '/publicaciones/tienda/'+ id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  editPublication(id: number, data: Publication): Observable<Publication>{
    return this.http.put<Publication>(this.baseUrl + '/publicaciones/' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  deletePublication(id: number): Observable<Publication>{
    return this.http.delete<Publication>(this.baseUrl + '/publicaciones/' + id, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
  
  getPublicationById(id: any): Observable<Publication>{
    return this.http.get<Publication>(this.baseUrl + '/publicaciones/' + id)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
  
}
