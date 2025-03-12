import { Routes } from '@angular/router';
import { CreateQuizComponent } from './components/admin/create-quiz/create-quiz.component';
import { LandingPageComponent } from './components/landing_page/landing-page/landing-page.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { LeaderboardComponent } from './components/admin/leaderboard/leaderboard.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { QuizAttemptComponent } from './components/user/attempt-quiz/attempt-quiz.component';
export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create-quiz', component: CreateQuizComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'attempt-quiz', component: QuizAttemptComponent },

];
