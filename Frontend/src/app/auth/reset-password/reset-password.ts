import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-reset-password',
  imports: [FormsModule,CommonModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword {
  password = '';
  token = '';

  constructor(
    private route: ActivatedRoute,
    private auth: Auth,
    private router: Router
  ) {
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }

  onResetPassword() {
    this.auth.resetPassword(this.token, { password: this.password }).subscribe({
      next: () => {
        alert('Password reset successful');
        this.router.navigate(['/login']);
      },
      error: err => alert(err.error.message)
    });
  }
}

