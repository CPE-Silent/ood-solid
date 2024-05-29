import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

const publicPaths: string[] = ['/login', '/register'];

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const currentUrl = this.router.url;

    if (publicPaths.includes(currentUrl)) {
      console.log('Can Activate (Public Path)');
      return true; // Allow access to public paths
    }

    if (this.authService.isLoggedIn()) {
      console.log('Can Activate');

      return true;
    } else {
      console.log('Can not Activate');

      this.router.navigate(['/login']);
      return false;
    }
  }
}
