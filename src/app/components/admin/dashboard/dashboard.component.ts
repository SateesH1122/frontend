import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  openCreateQuizModal() {
    // Logic to open the Create Quiz popup
    console.log('Open Create Quiz Modal');
  }

  openLeaderboard() {
    // Logic to navigate to the leaderboard page
    console.log('Open Leaderboard');
  }
}
