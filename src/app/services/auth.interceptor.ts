import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private userService: UserService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.userService.token;
        if (token) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}
// export class AuthInterceptor implements HttpInterceptor {
//     constructor(private userService: UserService, private router: Router) { }

//     intercept(req: HttpRequest<any>, next: HttpHandler) {
//         const token = this.userService.token;
//         if (token) {
//             const cloned = req.clone({
//                 headers: req.headers.set('Authorization', `Bearer ${token}`)
//             });
//             return next.handle(cloned).pipe(
//                 catchError((error: HttpErrorResponse) => {
//                     console.log(error);
//                     console.log(error.status);
//                     console.log(this.userService.isAuthenticated());
//                     if (error.status === 401 || this.userService.isAuthenticated()) {
//                         // Token expired or unauthorized
//                         // this.router.navigate(['']);
//                         // window.location.reload();
//                         // alert('Your session has expired. Please log in again.');
//                         // this.userService.logout();
//                     }
//                     return throwError(error);
//                 })
//             );
//         } else {
//             return next.handle(req);
//         }
//     }
// }