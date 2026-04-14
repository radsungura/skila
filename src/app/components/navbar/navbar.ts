import { Component, signal } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  isMenuOpen : boolean = false;
  
  constructor(public route: Router,) { }

  toggleMenu(): void {
    console.log("before", this.isMenuOpen);
    this.isMenuOpen = this.isMenuOpen ? false : true;
    console.log("after", this.isMenuOpen);

    // Empêcher le scroll du body quand le menu est ouvert
    if (this.isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    document.body.style.overflow = '';
  }

  onLogin(): void {
    console.log('Login clicked');
    // Naviguer vers la page de login
    // this.router.navigate(['/login']);
  }

  onRegister(): void {
    console.log('Register clicked');
    // Naviguer vers la page d'inscription
    // this.router.navigate(['/register']);
  }
}
