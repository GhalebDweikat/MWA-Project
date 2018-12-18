import * as moment from "moment";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {

  }

  login(email:string, password:string ) {
    return this.http.post<any>('/api/login', {email: email, password: password});
      //.do(res => this.setSession)
  }

  private setSession(authResult) {
    const expiresAt = moment().add(1,'hour');

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
