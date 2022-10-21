import { Injectable } from '@angular/core';
import { User } from '../interfaces/User';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Article } from '../interfaces/article';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private user: User | null;
  private error?: string;
  private loginUrl = 'http://sanger.dia.fi.upm.es/pui-rest-news/login';

  private message: string | undefined;

  private httpOptions = {
    headers: new HttpHeaders()
      .set('Content-Type', 'x-www-form-urlencoded')
  };

  constructor(private http: HttpClient) {
    this.user = null;
  }

  isLogged() {
    return this.user != null;
  }

  login(name: string, pwd: string): Observable<User> {
    const usereq = new HttpParams()
      .set('username', name)
      .set('passwd', pwd);

    return this.http.post<User>(this.loginUrl, usereq).pipe(
      tap(user => {
        this.user = user;
      })
    );
  }

  getUser() {
    return this.user;
  }

  logout() {
    this.user = null;
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.user = null;
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      this.error = `${operation} failed: ${error.message}`;
      return of(result as T);
    };
  }

}
