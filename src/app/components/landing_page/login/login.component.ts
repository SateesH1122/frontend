// import { Component, EventEmitter, Output } from '@angular/core';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   @Output() switchToSignup = new EventEmitter<void>();

//   goToSignup() {
//     this.switchToSignup.emit();
//   }
//   constructor(private router: Router) {}

//  navigateTo(route: string){
//   this.router.navigate([route]);
//  }
// }


import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  @Output() switchToSignup = new EventEmitter<void>();

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  togglePasswordVisibility() {
    const passwordInput = document.getElementById('passwordInput') as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  onLogin() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.http.post('https://localhost:44367/api/Users/Login', credentials)
        .subscribe((response: any) => {
          console.log('Login successful', response);
          this.userService.setUser(response.userid, response.role, response.username, response.email); // Store the user ID
          console.log('User ID:', this.userService.getUser());
          if (response.role === 'Admin') {
            this.router.navigate(['/dashboard']);
          } else if (response.role === 'Student') {
            this.router.navigate(['/user-dashboard']);
          }
        }, error => {
          console.error('Error logging in', error);
        });
    }
  }

  goToSignup() {
    this.switchToSignup.emit();
  }
}