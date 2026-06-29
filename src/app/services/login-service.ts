// core/auth/auth.service.ts

import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User, LoginData, RegisterData, AuthResponse, DecodedToken, UserRole } from '../../model/interfaces';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  //  private api = 'https://skila-api.onrender.com/providers';
  private readonly API_URL = 'http://localhost:3000'; // À adapter
  
  private readonly TOKEN_KEY = 'event_market_token';
  private readonly USER_KEY = 'event_market_user';

  // ========== SIGNALS ==========
  private currentUserSignal = signal<User | null>(null);
  private isLoadingSignal = signal<boolean>(false);
  private errorSignal = signal<string | null>(null);
  
  // ========== COMPUTED SIGNALS ==========
  currentUser = computed(() => this.currentUserSignal());
  isAuthenticated = computed(() => !!this.currentUserSignal());
  isLoading = computed(() => this.isLoadingSignal());
  error = computed(() => this.errorSignal());
  
  // Rôle utilisateur
  userRole = computed(() => this.currentUserSignal()?.role || null);
  isAdmin = computed(() => this.userRole() === 'admin');
  isProvider = computed(() => this.userRole() === 'provider');
  isClient = computed(() => this.userRole() === 'client');

  constructor() {
    this.loadStoredUser();
  }

  // ========== LOGIN ==========
  login(credentials: LoginData): void {
    this.isLoadingSignal.set(true);
    this.errorSignal.set(null);
    
    this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials).subscribe({
      next: (response) => {
        if (response.success) {
          this.handleAuthSuccess(response.data.user, response.data.token, credentials.rememberMe || false);
          // console.log("res", response.data);          
          this.router.navigate(['/myservices']);
        } else {
          this.errorSignal.set(response.message || 'Erreur de connexion');
        }
        this.isLoadingSignal.set(false);
      },
      error: (error) => {
        this.handleAuthError(error);
        this.isLoadingSignal.set(false);
      }
    });
  }

  // ========== REGISTER ==========
  register(data: RegisterData): void {

    // console.log("data", data);
    
    this.isLoadingSignal.set(true);
    this.errorSignal.set(null);
    
    // Définir le rôle par défaut (client) si non spécifié
    const registerData = {
      ...data,
      role: data.role || 'client'
    };
    
    this.http.post<AuthResponse>(`${this.API_URL}/register`, registerData).subscribe({
      next: (response) => {
        if (response.success) {
          this.handleAuthSuccess(response.data.user, response.data.token, false);
          this.router.navigate(['/providers']);
        } else {
          this.errorSignal.set(response.message || 'Erreur d\'inscription');
        }
        this.isLoadingSignal.set(false);
      },
      error: (error) => {
        this.handleAuthError(error);
        this.isLoadingSignal.set(false);
      }
    });
  }

  // ========== LOGOUT ==========
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSignal.set(null);
    this.router.navigate(['/login']);
  }

  // ========== GESTION DU TOKEN ==========
  getToken(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY) || sessionStorage.getItem(this.TOKEN_KEY) || null;
    return token;
  }

  private setToken(token: string, rememberMe: boolean = false): void {
    if (rememberMe) {
      localStorage.setItem(this.TOKEN_KEY, token);
    } else {
      sessionStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  private setUser(user: User, rememberMe: boolean = false): void {
    if (rememberMe) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    } else {
      sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
    this.currentUserSignal.set(user);
  }

  // checkUser(){
  //   // Vérifier d'abord localStorage, puis sessionStorage
  //   let token = localStorage.getItem(this.TOKEN_KEY);
  //   let userStr = localStorage.getItem(this.USER_KEY);
    
  //   if (!token) {
  //     token = sessionStorage.getItem(this.TOKEN_KEY);
  //     userStr = sessionStorage.getItem(this.USER_KEY);
  //   }
    
  //   if (token && userStr) {
      
  //     try {
  //       const user = JSON.parse(userStr);
  //       this.currentUserSignal.set(user);
  //       const validateToken = this.validateToken(token);
  //     console.log('New curent user:', user);

  //     } catch (error) {
  //       this.logout();
  //     }

  //   }
  // }
  private loadStoredUser(): void {
    // Vérifier d'abord localStorage, puis sessionStorage
    let token = localStorage.getItem(this.TOKEN_KEY);
    let userStr = localStorage.getItem(this.USER_KEY);
    
    if (!token) {
      token = sessionStorage.getItem(this.TOKEN_KEY);
      userStr = sessionStorage.getItem(this.USER_KEY);
    }
    
    if (token && userStr) {
      
      try {
        const user = JSON.parse(userStr);
        this.currentUserSignal.set(user);
        this.validateToken(token);
      } catch (error) {
        this.logout();
      }

    }
  }

  private validateToken(token: string): void {
    // this.http.post<{ valid: boolean }>(`${this.API_URL}/validate-token`, { token }).subscribe({
    //   next: (response) => {
    //     console.log('Token validation response:', response);
    //     if (!response.valid) {
    //     console.log('Token validation response:', response);

    //       this.logout();
    //     }
    //     console.log("res", response);
    //   },
    //   error: (err) => {
    //     console.log("res", err);
    //     this.logout();
    //   }
      
      
    // });
  }

  // ========== GESTION DES ERREURS ==========
  private handleAuthSuccess(user: any, token: any, rememberMe: boolean): void {
    this.setToken(token, rememberMe);
    this.setUser(user, rememberMe);
    this.errorSignal.set(null);
    // console.log("handle stor token", token, user, rememberMe);    
  }

  private handleAuthError(error: any): void {
    let message = 'Une erreur est survenue';
    
    if (error.error?.message) {
      message = error.error.message;
    } else if (error.status === 401) {
      message = 'Email ou mot de passe incorrect';
    } else if (error.status === 400) {
      message = 'Données invalides';
    } else if (error.status === 0) {
      message = 'Impossible de contacter le serveur';
    }
    
    this.errorSignal.set(message);
  }

  // ========== UTILITAIRES ==========
  hasRole(requiredRole: UserRole): boolean {
    const userRole = this.userRole();
    if (!userRole) return false;
    
    const hierarchy: Record<UserRole, number> = {
      admin: 3,
      provider: 2,
      client: 1
    };
    
    return hierarchy[userRole] >= hierarchy[requiredRole];
  }

  hasPermission(permission: string): boolean {
    const userRole = this.userRole();
    if (!userRole) return false;
    
    if (userRole === 'admin') return true;
    
    const permissions = this.getRolePermissions(userRole);
    return permissions.includes(permission);
  }

  private getRolePermissions(role: UserRole): string[] {
    const permissions: Record<UserRole, string[]> = {
      admin: ['*'],
      provider: ['manage_services', 'view_bookings', 'manage_profile'],
      client: ['view_services', 'create_bookings', 'manage_profile']
    };
    return permissions[role];
  }
}