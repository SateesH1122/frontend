import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface LeaderboardEntry {
  attemptID: number;
  userID: number;
  quizID: number;
  score: number;
  username: string;
}

interface QuizAttempt {
  quizID: number;
  title: string;
  description: string;
  scorePercent: number;
}

@Component({
  selector: 'app-user-leaderboard',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-leaderboard.component.html',
  styleUrl: './user-leaderboard.component.css'
})
export class UserLeaderboardComponent {
  attemptedQuizzes: any[] = [];
  selectedQuiz: number = 0;
  leaderboardEntries: any[] = [];
  userID: number = 8;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchAttemptedQuizzes();
    // if (this.quizzes.length > 0) {
    //   this.selectedQuiz = this.quizzes[0].quizID;
    // }

    this.getLeaderboard();
  }
  fetchAttemptedQuizzes() {
    this.http.get<any[]>(`https://localhost:44367/api/QuizAttempts/UserAttempts/${this.userID}`).subscribe(
      (res: any[]) => {
        console.log(res); // Check the console for the API response
        this.attemptedQuizzes = res.map((attempt: any) => ({
          quizID: attempt.quizID,
          scorePercent: attempt.PercentageScore,
          title: attempt.quizTitle,
          description: attempt.quizDescription,
        }));
      },
      (error) => {
        console.error('Error fetching attempted quizzes', error);
      }
    );
  }
  getLeaderboard() {
    console.log(this.selectedQuiz);
    if (this.selectedQuiz > 0) {
      console.log('Fetching leaderboard entries for quiz', this.selectedQuiz);
      this.http.get<LeaderboardEntry[]>(`https://localhost:44367/api/Leaderboards/Quiz/${this.selectedQuiz}`).subscribe(
        (res: LeaderboardEntry[]) => {
          console.log('Fetched leaderboard entries', res);
          this.leaderboardEntries = res;
        },
        (error) => {
          console.error('Error fetching leaderboard entries', error);
        }
      );
    }
  }
}
