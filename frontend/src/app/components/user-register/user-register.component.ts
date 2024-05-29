import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = 'user';

  submitted = false;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService
      .register(this.name, this.role, this.email, this.password)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e),
      });
  }

  goLogin() {
    this.router.navigate(['/login']);
  }
}
