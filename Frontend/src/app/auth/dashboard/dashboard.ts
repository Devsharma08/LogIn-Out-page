import { Component } from '@angular/core';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  imports: [],
   template: `
    <h2>Welcome to your Dashboard!</h2>
    <button (click)="logout()">Logout</button>
  `,
  styleUrl: './dashboard.css'
})
export class Dashboard {
  constructor(private auth: Auth) {}

  logout() {
    this.auth.logout();
  }
}


