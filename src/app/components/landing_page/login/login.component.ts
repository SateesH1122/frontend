import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router) {}
 
 navigateTo(route: string){
  this.router.navigate([route]);
 }
}
