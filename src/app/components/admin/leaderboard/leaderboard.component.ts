import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

//integration
import { HttpClient } from '@angular/common/http';

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
  imports: [FormsModule,CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent {
  // quizzes: Quiz[] = [
  //   { id: 1, title: 'Angular Basics' },
  //   { id: 2, title: 'TypeScript Quiz' }
  // ];

  // selectedQuiz: number | null = null;
  // leaderboard: LeaderboardEntry[] = [];

  leaderboardEntries: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getLeaderboard();
  }
  getLeaderboard() {
    this.http.get("https://localhost:44367/api/Leaderboards/Quiz/4").subscribe(
      (res: any) => {
        console.log('API Response:', res);
        if (res) {
          this.leaderboardEntries = res;
          console.log('Transactions List:', this.leaderboardEntries);
        }
      },
      (error) => {
        console.error('Error fetching transactions data', error);
      }
    );
  }

  // fetchLeaderboard() {
  //   if (this.selectedQuiz) {
  //     // Mock leaderboard data (replace with actual API call)
  //     this.leaderboard = [
  //       { name: 'Alice', score: 90 },
  //       { name: 'Bob', score: 85 },
  //       { name: 'Charlie', score: 80 }
  //     ];
  //   }
  // }
}
