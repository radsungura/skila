// features/login/login.component.ts

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/login-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  // Formulaire
  email = signal<string>('');
  password = signal<string>('');
  rememberMe = signal<boolean>(false);
  showPassword = signal<boolean>(false);
  
  // États
  isLoading = this.authService.isLoading;
  error = signal<any>(this.authService.error);
  
  // Redirection après login
  returnUrl = signal<string>('/home');
  
  constructor() {
    // Récupérer l'URL de retour
    const navigation = this.router.getCurrentNavigation();
    this.returnUrl.set(navigation?.extras.state?.['returnUrl'] || '/home');
      // console.log('Check authenticated', this.authService.checkUser());
    
    // Rediriger si déjà connecté
    if (this.authService.isAuthenticated()) {
      console.log('Check authenticated', this.authService.isAuthenticated());
      this.router.navigate([this.returnUrl()]);
    }
  }
  
  onSubmit(): void {
    if (!this.isFormValid()) return;
    
    this.authService.login({
      email: this.email(),
      password: this.password(),
      rememberMe: this.rememberMe()
    });
  }
  
  isFormValid(): boolean {
    return this.email().trim() !== '' && 
           this.password().trim() !== '' &&
           this.isValidEmail(this.email());
  }
  
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  toggleShowPassword(): void {
    this.showPassword.update(v => !v);
  }
  register(): void {
    this.router.navigate(['/register']);
  }
}