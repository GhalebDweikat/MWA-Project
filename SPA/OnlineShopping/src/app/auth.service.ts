import * as moment from "moment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map} from "rxjs/operators";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {

  }

  register(name: string, email: string, password: string)
  {
    let body = `name=${name}&email=${email}&password=${password}`;
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post<any>('http://localhost:3000/users/register', body, options);
  }
  login(email:string, password:string ) {
    let body = `email=${email}&password=${password}`;
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.http.post<any>('http://localhost:3000/users/authenticate', body, options)
      .pipe(map(res => this.setSession(res)));
  }

  private setSession(authResult) {
    const expiresAt = moment().add(1,'hour');
    console.log(authResult.data.token);
    localStorage.setItem('id_token', authResult.data.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
