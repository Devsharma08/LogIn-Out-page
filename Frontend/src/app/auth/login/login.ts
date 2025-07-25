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
  otp = '';
  otpFieldVisible = false;
  otpVerified = false;
  message = '';
  error = '';

  constructor(private auth: Auth, private router: Router) {}

  sendOtp() {
    this.otpFieldVisible = true;
    this.message = '...';
    this.error = '';
    this.auth.sendOtp({ email: this.email }).subscribe({
      next: (res) => {
        this.otpFieldVisible = true;
        this.message = res.message;
        this.error = '';
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to send OTP';
        this.message = '';
      }
    });
  }

  verifyOtp() {
    this.auth.verifyOtp({ email: this.email, otp: this.otp }).subscribe({
      next: (res) => {
        this.message = res.message;
        this.error = '';
        this.otpVerified = true;
        this.router.navigate(['/dashboard'])
      },
      error: (err) => {
        this.error = err.error?.message || 'Invalid OTP';
        this.message = '';
      }
    });
  }

  onLogin() {
    if (!this.otpVerified) {
      this.error = 'Please verify OTP first.';
      return;
    }

    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.message = 'Login successful!';
        this.error = '';
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Login failed';
        this.message = '';
      }
    });
  }
}

