import { Routes } from '@angular/router';
import { HomeComponent } from './components/landing_page/home/home.component';
import { AboutComponent } from './components/landing_page/about/about.component';
import { ContactComponent } from './components/landing_page/contact/contact.component';
import { LoginComponent } from './components/landing_page/login/login.component';
import { SignupComponent } from './components/landing_page/signup/signup.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];
