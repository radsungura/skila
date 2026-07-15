// features/register/register.component.ts

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/login-service';
import { UserRole } from '../../../model/interfaces';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {
  private authService = inject(AuthService);
  
  // Formulaire
  name = signal<string>('');
  email = signal<string>('');
  password = signal<string>('');
  confirmPassword = signal<string>('');
  phone = signal<string>('');
  role = signal<UserRole>('client');
  showPassword = signal<boolean>(false);
  
  // États
  isLoading = this.authService.isLoading;
  error = signal<any>(this.authService.error);
  
  // Options de rôle
  roleOptions = [
    { value: 'client', label: 'Client', icon: '👤', description: 'Je cherche des prestataires' },
    { value: 'provider', label: 'Prestataire', icon: '🎪', description: 'Je propose mes services' }
  ];

  constructor(public router: Router) {
    // Rediriger si déjà connecté
    if (this.authService.isAuthenticated()) {
      this.authService.userRole() === 'provider' ? this.router.navigate(['/myservices']) : this.router.navigate(['/providers']);
      this.authService.userRole() === 'client' ? this.router.navigate(['/providers']) : this.router.navigate(['/home']);
    }
  }


  isFormValid(): boolean {
    return this.name().trim() !== '' &&
           this.isValidEmail(this.email()) &&
           this.password().length >= 6 &&
           this.password() === this.confirmPassword();
  }
  
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  getPasswordStrength(): number {
    const pwd = this.password();
    let strength = 0;
    if (pwd.length >= 6) strength++;
    if (pwd.match(/[A-Z]/)) strength++;
    if (pwd.match(/[0-9]/)) strength++;
    if (pwd.match(/[^A-Za-z0-9]/)) strength++;
    return strength;
  }
  
  getPasswordStrengthText(): string {
    const strength = this.getPasswordStrength();
    if (strength === 0) return '';
    if (strength <= 2) return 'Faible';
    if (strength === 3) return 'Moyen';
    return 'Fort';
  }
  
  getPasswordStrengthColor(): string {
    const strength = this.getPasswordStrength();
    if (strength <= 2) return '#ef4444';
    if (strength === 3) return '#f59e0b';
    return '#10b981';
  }
  
  onSubmit(): void {
    if (!this.isFormValid()) return;
    
    this.authService.register({
      name: this.name(),
      email: this.email(),
      password: this.password(),
      confirmPassword: this.confirmPassword(),
      phone: this.phone(),
      role: this.role()
    });

    console.log(this.authService.register);
    
  }
  
  toggleShowPassword(): void {
    this.showPassword.update(v => !v);
  }
}
