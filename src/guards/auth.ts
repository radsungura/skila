// core/auth/auth.guard.ts

import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../app/services/login-service';
import { UserRole } from '../model/interfaces';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  if (authService.getToken()) {
    return true;
  }
  
  router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  return false;
};

export const roleGuard = (allowedRoles: UserRole[]): CanActivateFn => {
  return (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    
    if (!authService.getToken()) {
      router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    
    const userRole = authService.userRole();
    
    if (userRole && allowedRoles.includes(userRole)) {
      return true;
    }
    
    // Redirection selon le rôle
    if (userRole === 'admin') {
      router.navigate(['/admin/dashboard']);
    } else if (userRole === 'provider') {
      router.navigate(['/provider/dashboard']);
    } else {
      router.navigate(['/dashboard']);
    }
    
    return false;
  };
};
