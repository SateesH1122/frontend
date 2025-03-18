// src/app/services/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) { }

    // canActivate(): boolean {
    //     if (this.userService.getUser().userid !== 0) {
    //         return true;
    //     } else {
    //         this.router.navigate(['']);
    //         return false;
    //     }
    // }

    canActivate(): boolean {
        if (this.userService.getUser().userid !== 0 && this.userService.isAuthenticated()) {
            return true;
        } else {
            // window.location.reload();
            this.userService.logout();
            alert('Your session has expired. Please log in again.');
            return false;
        }
    }
}