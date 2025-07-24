import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email = '';
  password = '';

  constructor(private auth: Auth, private router: Router) {}

  onLogin() {
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.email = '';
        this.password = '';
        this.router.navigate(['/dashboard']);
      },
      error: err => alert(err?.error?.message || 'Login failed. Please try again.')
    });
  }
}
