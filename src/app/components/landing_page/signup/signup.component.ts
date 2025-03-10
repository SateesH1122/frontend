import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  @Output() switchToLogin = new EventEmitter<void>();
  
  goToLogin() {
    this.switchToLogin.emit();
  }
  successRegister() {
    alert('Registration successful!');
    this.switchToLogin.emit();
  }
}
