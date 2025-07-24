import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  name = '';
  email = '';
  password = '';

  constructor(private auth: Auth, private router: Router) {}

  onRegister() {
    this.auth.register({ name: this.name, email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => alert(err.error.message)
    });
  }
}


