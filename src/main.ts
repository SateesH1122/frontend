import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { AuthInterceptor } from './app/services/auth.interceptor';

bootstrapApplication(AppComponent, {
   providers: [
      provideRouter(routes),
      provideHttpClient(),
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
   ]
}).catch(err => console.error(err));
