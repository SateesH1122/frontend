import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Quiz {
  id: number;
  title: string;
}

interface LeaderboardEntry {
  name: string;
  score: number;
}

@Component({
  selector: 'app-leaderboard',
  imports: [FormsModule, CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  quizzes: Quiz[] = [];
  selectedQuiz: number | null = null;
  leaderboardEntries: LeaderboardEntry[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchQuizzes();
  }

  fetchQuizzes(): void {
    this.http.get<Quiz[]>('https://localhost:44367/api/Quizzes/User/8').subscribe(
      (res: Quiz[]) => {
        this.quizzes = res;

        //added

        if (this.quizzes.length > 0)
          this.selectedQuiz = this.quizzes[0].id;
        this.getLeaderboard(); //Now it is called after the quiz is set

      },
      (error) => {
        console.error('Error fetching quizzes', error);
      }
    );
  }

  getLeaderboard(): void {
    if (this.selectedQuiz !== null) {
      console.log('Fetching leaderboard entries for quiz', this.selectedQuiz);
      this.http.get<LeaderboardEntry[]>(`https://localhost:44367/api/Leaderboards/Quiz/${this.selectedQuiz}`).subscribe(
        (res: LeaderboardEntry[]) => {
          this.leaderboardEntries = res;
        },
        (error) => {
          console.error('Error fetching leaderboard entries', error);
        }
      );
    }
  }
}
