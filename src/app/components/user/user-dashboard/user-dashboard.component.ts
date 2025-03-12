import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  attemptedQuizzes: any[] = [];
  constructor(private router: Router, private http: HttpClient) { }
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  ngOnInit(): void { }
  fetchAttemptedQuizzes(): void {
    this.http.get('https://localhost:44367/api/QuizAttempts/User/8').subscribe(
      (res: any) => {
        this.attemptedQuizzes = res.map((attempt: any) => ({
          title: attempt.quizTitle,
          description: attempt.quizDescription,
          score: attempt.score
        }));
      },
      (error) => {
        console.error('Error fetching attempted quizzes', error);
      }
    );
  }
}
