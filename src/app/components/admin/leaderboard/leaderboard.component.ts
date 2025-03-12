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

interface Quiz {
  quizID: number;
  title: string;
  description: string;
  userID: number;
  createdAt: string;
}
@Component({
  selector: 'app-leaderboard',
  imports: [FormsModule, CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  quizzes: any[] = [];
  selectedQuiz: number = 0;
  leaderboardEntries: any[] = [];
  userID: number = 8;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchQuizzes();
    // if (this.quizzes.length > 0) {
    //   this.selectedQuiz = this.quizzes[0].quizID;
    // }

    this.getLeaderboard();
  }

  fetchQuizzes() {
    console.log('Fetching quizzes for user');
    this.http.get<Quiz[]>(`https://localhost:44367/api/Quizzes/User/${this.userID}`).subscribe(
      (res: Quiz[]) => {
        console.log('Fetched quizzes', res);
        this.quizzes = res;
      },
      (error) => {
        console.error('Error fetching quizzes', error);
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
