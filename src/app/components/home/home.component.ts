import { Component } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { SignupComponent } from "../signup/signup.component";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [SignupComponent, CommonModule, LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isLoginMode = false; // Initially show Signup component

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
