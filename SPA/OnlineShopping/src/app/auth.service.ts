import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(email:string, password:string ) {
    return this.http.post<any>('/v1/users/authenticate', {email: email, password: password})
      .pipe(map(user => {
        if(user && user.token) {
          //save somewhere
          return user;
        }
        return null;
      }));
  }
}
