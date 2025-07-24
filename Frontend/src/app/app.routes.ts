import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { ForgotPassword } from './auth/forgot-password/forgot-password';
import { ResetPassword } from './auth/reset-password/reset-password';
import { Dashboard } from './auth/dashboard/dashboard';
import { AuthGuard } from './guards/auth-guard';
// import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'forgot-password', component: ForgotPassword },
   {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard],
  },
  { path: 'reset-password/:token', component: ResetPassword },
  { path: '', redirectTo: 'register', pathMatch: 'full' }
];
