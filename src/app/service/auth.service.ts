import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private loggedInStatus = false;
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  constructor(private http: HttpClient) {}

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value;
    localStorage.setItem('loggedIn', 'true');
  }

  // checking is logged in
  get isLoggedIn() {
    // return this.loggedInStatus;
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
  }

  // Login Authentication function
  loginUser(credentials) {

   return this.http.get(environment.appConfig.apiUrl + '/login/check/' + credentials.username + '/' + credentials.password );
  //  .pipe(
  //   map(User => {
  //     // login successful
  //     if (User) {
  //       // store user details in local storage to keep user logged in between page refreshes
  //       localStorage.setItem('currentUser', JSON.stringify(User));
  //     }

  //     return User;
  //   })
  //  );
  }

  // Logout Function
  logout() {
    localStorage.clear();
    // localStorage.removeItem('currentUser');
  }

}
