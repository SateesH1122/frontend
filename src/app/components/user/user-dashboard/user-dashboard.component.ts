import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  imports: [FormsModule ,CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  constructor(private router: Router) {}
  attemptedQuizzes = [
    { title: 'Quiz Title 1', description: 'Short description of the quiz.', score: 85 },
    { title: 'Quiz Title 2', description: 'Short description of the quiz.', score: 90 }
  ];
  navigateTo(route: string){
   this.router.navigate([route]);
  }
}
