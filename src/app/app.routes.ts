import { Routes } from '@angular/router';
import { HomeComponent } from './components/landing_page/home/home.component';
import { AboutComponent } from './components/landing_page/about/about.component';
import { ContactComponent } from './components/landing_page/contact/contact.component';
import { LoginComponent } from './components/landing_page/login/login.component';
import { SignupComponent } from './components/landing_page/signup/signup.component';
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
