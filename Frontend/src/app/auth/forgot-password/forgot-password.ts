import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule,FormsModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {
  email = '';
  success = '';
  message:Boolean = false;
  constructor(private auth: Auth) {}

  onForgotPassword() {
    this.message = true;
    this.auth.forgotPassword({ email: this.email }).subscribe({
      next: (res: any) =>{ 
        this.message = true;
        return this.success = res.message},
      error: err => alert(err.error.message)
    });
  }
}


