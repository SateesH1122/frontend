import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private jwtHelper = new JwtHelperService();

  isLoggedIn: boolean = false;

  constructor(private router: Router, private http: HttpClient) { }
  userid: number = 0;
  role: string = '';
  username: string = '';
  email: string = '';
  token: string = '';
  getUser() {
    return {
      userid: this.userid,
      role: this.role,
      username: this.username,
      email: this.email,
      token: this.token
    }
  }
  setUser(userid: number, role: string, username: string, email: string, token: string) {
    this.userid = userid;
    this.role = role;
    this.username = username;
    this.email = email;
    this.token = token;
  }

  //For JWT token based authentication

  isAuthenticated(): boolean {
    console.log(this.token);
    return this.token !== null && !this.jwtHelper.isTokenExpired(this.token);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.isLoggedIn = false;
    this.setUser(0, '', '', '', '');
    this.navigateTo('');
  }

}
