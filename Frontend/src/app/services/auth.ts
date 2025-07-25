import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private baseUrl = 'http://localhost:5000/api/v1/auth';


  constructor(private http: HttpClient, private router: Router) {}

  register(data: any) {
    return this.http.post(`${this.baseUrl}/register`, data, { withCredentials: true });
  }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/login`, data, { withCredentials: true });
  }

  logout(): void {
    this.http.get(`${this.baseUrl}/logout`).subscribe(() => {
      this.router.navigate(['/login']);
  })}

  forgotPassword(data: any) {
    return this.http.post(`${this.baseUrl}/forgot-password`, data);
  }

  resetPassword(token: string, data: any) {
   return this.http.post(`${this.baseUrl}/reset-password/${token}`, data);
  }

  sendOtp(data: { email: string }) {
  return this.http.post<{ message: string }>(`${this.baseUrl}/send-otp`, data);
}

verifyOtp(data: { email: string, otp: string }) {
  return this.http.post<{ message: string }>(`${this.baseUrl}/verify-otp`, data);
}

  
  isAuthenticated() {
  return this.http.get('http://localhost:5000/api/v1/auth/verify', { withCredentials: true })

}
}
