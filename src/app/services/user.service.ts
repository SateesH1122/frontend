import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() { }
  userid: number = 0;
  getUserId() {
    return this.userid;
  }
  setUserId(userid: number) {
    this.userid = userid;
  }

}
