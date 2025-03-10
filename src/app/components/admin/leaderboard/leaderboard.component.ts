import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  imports: [FormsModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent {
  quizzes: Quiz[] = [
    { id: 1, title: 'Angular Basics' },
    { id: 2, title: 'TypeScript Quiz' }
  ];

  selectedQuiz: number | null = null;
  leaderboard: LeaderboardEntry[] = [];

  fetchLeaderboard() {
    if (this.selectedQuiz) {
      // Mock leaderboard data (replace with actual API call)
      this.leaderboard = [
        { name: 'Alice', score: 90 },
        { name: 'Bob', score: 85 },
        { name: 'Charlie', score: 80 }
      ];
    }
  }
}
