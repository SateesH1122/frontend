import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../../landing_page/navbar/navbar.component";
import { FooterComponent } from "../../landing_page/footer/footer.component";
import { UserService } from '../../../services/user.service';

interface AttemptedQuiz {
  scorePercent: number;
  description: string;
  title: string;
}
@Component({
  selector: 'app-user-dashboard',
  imports: [FormsModule, CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  userID: number = 0;
  attemptedQuizzes: AttemptedQuiz[] = [];
  constructor(private router: Router, private http: HttpClient, private userservice: UserService) { }
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  ngOnInit(): void {
    this.fetchAttemptedQuizzes();
  }
  fetchAttemptedQuizzes() {
    this.userID = this.userservice.getUser().userid;
    this.http.get<any[]>(`https://localhost:44367/api/QuizAttempts/UserAttempts/${this.userID}`).subscribe(
      (res: any[]) => {
        console.log(res); // Check the console for the API response
        if (this.attemptedQuizzes.length === 0) { }
        else {
          this.attemptedQuizzes = res.map((attempt: any) => ({
            scorePercent: attempt.PercentageScore,
            title: attempt.quizTitle,
            description: attempt.quizDescription,
          }));
        }
      },
      (error) => {
        console.error('Error fetching attempted quizzes', error);
      }
    );
  }
}
