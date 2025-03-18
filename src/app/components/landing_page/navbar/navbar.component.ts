import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  userName: string = '';
  role: string = '';
  userProfileImage: string = '';
  userID: number = 0;

  constructor(private router: Router, public userservice: UserService, private http: HttpClient) {
    if (userservice.getUser().userid != 0) {
      this.userName = userservice.getUser().username; // Replace with actual username
      this.role = userservice.getUser().role;
      this.userID = userservice.getUser().userid;
    }
  }
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  deleteAccount() {
    if (window.confirm('Are you sure you want to delete your account?')) {
      this.userID = this.userservice.getUser().userid;
      console.log('Deleting user with ID ', this.userID);
      this.http.delete(`https://localhost:44367/api/Users/${this.userID}`).subscribe(response => {
        console.log('User deleted successfully', response);
        this.userservice.logout();
      }, error => {
        console.error('Error deleting user', error);
      });
    }
  }


  contactus() {
    if (this.userservice.isLoggedIn) {
      this.navigateTo('contact');
    }
    else {
      alert('Please login to access this feature');
      this.navigateTo('');
    }
  }
}
