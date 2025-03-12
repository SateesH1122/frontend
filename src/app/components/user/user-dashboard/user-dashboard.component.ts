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
  userID: number = 8;
  attemptedQuizzes: { title: string, description: string, PercentageScore: any }[] = [];
  constructor(private router: Router, private http: HttpClient) { }
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  ngOnInit(): void {
    this.fetchAttemptedQuizzes();
  }
  fetchAttemptedQuizzes(): void {
    this.http.get(`https://localhost:44367/api/QuizAttempts/UserAttempts/${this.userID}`).subscribe(

      (res: any) => {
        console.log(res);
        this.attemptedQuizzes = res.map((attempt: any) => ({
          PercentageScore: attempt.PercentageScore,
          title: attempt.quizTitle,
          description: attempt.quizDescription,
        }));
      },
      (error) => {
        console.error('Error fetching attempted quizzes', error);
      }
    );
  }
}
