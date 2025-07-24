import { TestBed } from '@angular/core/testing';
// import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
import { AuthGuard } from './auth-guard';
// import { Auth } from '../services/auth.service';
import { of, throwError } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<Auth>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('Auth', ['isAuthenticated']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Auth, useValue: authSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(Auth) as jasmine.SpyObj<Auth>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow access if authenticated', (done) => {
    authService.isAuthenticated.and.returnValue(of({ user: 'Dev' }));

    guard.canActivate().subscribe((result:any) => {
      expect(result).toBeTrue();
      done();
    });
  });

  it('should deny access if not authenticated', (done) => {
    authService.isAuthenticated.and.returnValue(throwError(() => new Error('Unauthorized')));

    guard.canActivate().subscribe((result:any) => {
      expect(result).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });
});
