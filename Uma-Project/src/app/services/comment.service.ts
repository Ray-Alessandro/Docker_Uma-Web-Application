import { Injectable } from '@angular/core';
import { Comentario } from '../models/comentario.model';
import { environment } from 'src/environments/environment.development';


import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

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

  createComment(data: Comentario): Observable<Comentario>{
    return this.http.post<Comentario>(this.baseUrl + '/comentarios', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getAllComments(id_publicacion: any): Observable<Comentario>{
    return this.http.get<Comentario>(this.baseUrl + '/comentarios'+ '/publicacion/' + id_publicacion)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  


}
