import { Component, signal } from '@angular/core';
import { Navbar } from "../components/navbar/navbar";
@Component({
  selector: 'app-home',
  imports: [Navbar],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})

export class Home {
  // ========== STATISTIQUES ==========
  stats = signal([
    { value: '500+', label: 'Prestataires' },
    { value: '2 000+', label: 'Événements' },
    { value: '98%', label: 'Clients satisfaits' },
    { value: '5 ans', label: "d'expérience" }
  ]);

  // ========== CATÉGORIES ==========
  categories = signal([
    { 
      id: 1, 
      name: 'Music Band', 
      icon: '🎵', 
      description: 'Groupes de musique, DJs, artistes',
      color: '#3b82f6',
      bg: '#eff6ff'
    },
    { 
      id: 2, 
      name: 'Décoration', 
      icon: '🎨', 
      description: 'Décorateurs, fleuristes, scénographes',
      color: '#8b5cf6',
      bg: '#f5f3ff'
    },
    { 
      id: 3, 
      name: 'Traiteur', 
      icon: '🍽️', 
      description: 'Cuisiniers, buffets, pâtissiers',
      color: '#f59e0b',
      bg: '#fffbeb'
    },
    { 
      id: 4, 
      name: 'Photographie', 
      icon: '📸', 
      description: 'Photographes, vidéastes, drones',
      color: '#10b981',
      bg: '#ecfdf5'
    },
    { 
      id: 5, 
      name: 'Animation', 
      icon: '🎭', 
      description: 'Animateurs, magiciens, clown',
      color: '#ef4444',
      bg: '#fef2f2'
    },
    { 
      id: 6, 
      name: 'Son & Lumière', 
      icon: '🔊', 
      description: 'Sonorisation, éclairage, écrans',
      color: '#06b6d4',
      bg: '#ecfeff'
    },
    { 
      id: 7, 
      name: 'MC & Coordination', 
      icon: '🎤', 
      description: 'Maîtres de cérémonie, coordinateurs, planificateurs',
      color: '#14b8a6',
      bg: '#e0f2fe'
    },
    { 
      id: 8, 
      name: 'Live Streaming', 
      icon: '📡', 
      description: 'Diffusion en direct, captation vidéo, streaming professionnel',
      color: '#d179f0',
      bg: '#fdf4ff'
    }
  ]);

  // ========== PRESTATAIRES EN VEDETTE ==========
  featuredProviders = signal([
    {
      id: 1,
      name: 'la rose',
      category: 'Music Band',
      location: 'Ngagara',
      rating: 8.6,
      image: '🎤',
      price: 50000
    },
    {
      id: 2,
      name: 'El Magnifico',
      category: 'Decoration',
      location: 'Ngagara',
      rating: 8.2,
      image: '🎨',
      price: 50000
    },
    {
      id: 3,
      name: 'Golden Sound',
      category: 'Music Band',
      location: 'Kinindo',
      rating: 9.1,
      image: '🎸',
      price: 75000
    },
    {
      id: 4,
      name: 'Fleuriste Eden',
      category: 'Decoration',
      location: 'Rohero',
      rating: 8.8,
      image: '🌹',
      price: 35000
    }
  ]);

  // ========== TÉMOIGNAGES ==========
  testimonials = signal([
    {
      id: 1,
      name: 'Marie-Claire N.',
      role: 'Organisatrice de mariage',
      content: 'Grâce à Event Market, j\'ai trouvé des prestataires exceptionnels pour mon mariage. Service rapide et professionnel !',
      rating: 5,
      avatar: '👰'
    },
    {
      id: 2,
      name: 'Jean-Paul B.',
      role: 'Directeur d\'entreprise',
      content: 'Plateforme fiable et intuitive. Les prestataires sont de qualité et les tarifs transparents. Je recommande vivement !',
      rating: 5,
      avatar: '👔'
    },
    {
      id: 3,
      name: 'Chris K.',
      role: 'Responsable événementiel',
      content: 'Un gain de temps incroyable ! Tous les prestataires sont au même endroit, avec des avis vérifiés.',
      rating: 4,
      avatar: '💼'
    },
    {
      id: 3,
      name: 'Kizungu C.',
      role: 'Expert en Eclairage',
      content: 'Un gain de temps, d\'accessibilité et de qualité ! Tous les services sont au même endroit, avec possibilité de vérification.',
      rating: 4,
      avatar: '💡'
    }

  ]);

  // ========== COMMENT ÇA MARCHE ==========
  steps = signal([
    { step: 1, title: 'Recherchez', description: 'Trouvez le prestataire idéal par catégorie', icon: '🔍' },
    { step: 2, title: 'Comparez', description: 'Consultez les avis, tarifs et portfolios', icon: '⚖️' },
    { step: 3, title: 'Contactez', description: 'Discutez directement avec les prestataires', icon: '💬' },
    { step: 4, title: 'Réservez', description: 'Finalisez votre réservation en toute sécurité', icon: '✅' }
  ]);

  // ========== MÉTHODES ==========
  
  // Navigation vers la page des prestataires avec filtre
  navigateToCategory(categoryName: string): void {
    console.log('Filtrer par catégorie:', categoryName);
    // À décommenter avec le router
    // const router = inject(Router);
    // router.navigate(['/providers'], { queryParams: { category: categoryName } });
  }

  // Navigation vers les détails d'un prestataire
  viewProviderDetails(providerId: number): void {
    console.log('Voir prestataire:', providerId);
    // const router = inject(Router);
    // router.navigate(['/providers', providerId]);
  }
}