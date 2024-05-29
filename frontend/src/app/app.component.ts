import { Component, DoCheck } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  title = 'CPE OOD';
  isLoggedIn: boolean = false;
  userEmail: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userEmail = localStorage.getItem('email');
  }

  ngDoCheck(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userEmail = localStorage.getItem('email');
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userEmail = null;
  }

  goLogin() {
    this.router.navigate(['/login']);
  }
}
