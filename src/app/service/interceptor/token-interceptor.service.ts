import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, pipe, retry, throwError } from 'rxjs';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private http: UserService) { }
  token = this.http.getToken();
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let jwttoken: HttpRequest<any> = req.clone({
      setHeaders: {
        'Authorization': 'bearer ' + this.token,
        'Content-Type': 'application/json'
      }
    });
    return next.handle(jwttoken);
  }
}
