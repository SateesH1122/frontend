import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Quiz {
  id: number;
  title: string;
  description: string;
  userId: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  quizzes: Quiz[] = [];
  userId: number = 8; // Assuming a fixed user ID for this example

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchQuizzes();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  fetchQuizzes() {
    this.http.get<Quiz[]>(`https://localhost:44367/api/Quizzes/User/${this.userId}`).subscribe(
      (res: Quiz[]) => {
        this.quizzes = res;
        console.log(this.quizzes);
      },
      (error) => {
        console.error('Error fetching quizzes', error);
      }
    );
  }

  deleteQuiz(quizId: number) {
    this.http.delete(`https://localhost:44367/api/Quizzes/${quizId}`).subscribe(
      () => {
        this.fetchQuizzes();
      },
      (error) => {
        console.error('Error deleting quiz', error);
      }
    );
  }
}