import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() switchToSignup = new EventEmitter<void>();

  goToSignup() {
    this.switchToSignup.emit();
  }
}
