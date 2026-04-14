import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from "./../../components/navbar/navbar";
import { RouterModule } from '@angular/router';
import { ProvidersService } from '../../services/providers-service';
import { MatButtonModule } from '@angular/material/button';
// Interface pour un prestataire
export interface Provider {
  id: number;
  name: string;
  category: string;
  location: string;
  description: string;
  rating: number;
  reviews: number;
  price: number;
  image?: string;
}

@Component({
  selector: 'app-providers',
  standalone: true,
  imports: [CommonModule, Navbar, RouterModule, MatButtonModule],
  templateUrl: './providers.html',
  styleUrl: './providers.scss',
})

export class ProvidersComponent {
  // providers: any; // Liste des prestataires
  isLoading: boolean = true; // Indicateur de chargement

  // constructor(private prov: ProvidersService) { 
  //   this.providers = this.prov.getAll().subscribe(el => {
  //     console.log("data", el);
  //         if (el) {
  //           this.providers = el;
  //           this.isLoading = false;
  //         } else {
  //           this.providers = [];
  //         }
  //   });  
  // }

  // Terme de recherche
  searchTerm = signal<string>('');
  
  // Catégorie sélectionnée
  selectedCategory = signal<string>('Tous');
  
  // Liste des catégories disponibles
  categories = signal<string[]>(['Tous', 'Music Band', 'Decoration', 'Traiteur', 'Photographie']);
  
  // Liste complète des prestataires
  private allProviders = signal<Provider[]>([
    {
      id: 1,
      name: 'la rose',
      category: 'Music Band',
      location: 'Ngagara',
      description: 'On rend vos événements inoubliable en vous offrant un service de Karaoké unique avec des chanteurs et musiciens expérimentés',
      rating: 8.6,
      reviews: 120,
      price: 50000
    },
    {
      id: 2,
      name: 'Muhira',
      category: 'Music Band',
      location: 'Ngagara',
      description: 'Avec nous vos événements ne sont plus comme les autres, ils sont uniques',
      rating: 7.1,
      reviews: 150,
      price: 50000
    },
    {
      id: 3,
      name: 'El Magnifico',
      category: 'Decoration',
      location: 'Ngagara',
      description: 'On décore pas vos Providers d\'événements mais on les transforme en vos rêves',
      rating: 8.2,
      reviews: 200,
      price: 50000
    },
    {
      id: 4,
      name: 'Golden Sound',
      category: 'Music Band',
      location: 'Kinindo',
      description: 'Sonorisation professionnelle et ambiance musicale de qualité pour tous vos événements',
      rating: 9.1,
      reviews: 85,
      price: 75000
    },
    {
      id: 5,
      name: 'Fleuriste Eden',
      category: 'Decoration',
      location: 'Rohero',
      description: 'Compositions florales élégantes et originales pour mariages et réceptions',
      rating: 8.8,
      reviews: 95,
      price: 35000
    }
  ]);

  // ===========test data===========
  providers = [
    {
      id: 1,
      name: 'la rose',
      category: 'Music Band',
      location: 'Ngagara',
      desc: 'On rend vos événements inoubliable en vous offrant un service de Karaoké unique avec des chanteurs et musiciens expérimentés',
      services: 'efdffd',
      image: '../../../assets/images/band1.jpeg',
      address: 'Ngagara, Bujumbura',
      rating: 8.6,
      reviews: 120,
      price: 50000
    },
    {
      id: 2,
      name: 'Muhira',
      category: 'Music Band',
      location: 'Ngagara',
      desc: 'Avec nous vos événements ne sont plus comme les autres, ils sont uniques',
      services: 'efdffd',
      address: 'Ngagara, Bujumbura',
      image: 'sdsdsfdf',
      rating: 7.1,
      reviews: 150,
      price: 50000
    },
    {
      id: 3,
      name: 'El Magnifico',
      category: 'Decoration',
      location: 'Ngagara',
      desc: 'On décore pas vos Providers d\'événements mais on les transforme en vos rêves',
      services: 'efdffd',
      address: 'Ngagara, Bujumbura',
      image: 'sdsdsfdf',
      rating: 8.2,
      reviews: 200,
      price: 50000
    },
    {
      id: 4,
      name: 'Golden Sound',
      category: 'Music Band',
      location: 'Kinindo',
      desc: 'Sonorisation professionnelle et ambiance musicale de qualité pour tous vos événements',
      services: 'efdffd',
      address: 'Ngagara, Bujumbura',
      image: 'sdsdsfdf',
      rating: 9.1,
      reviews: 85,
      price: 75000
    },
    {
      id: 5,
      name: 'Fleuriste Eden',
      category: 'Decoration',
      location: 'Rohero',
      desc: 'Compositions florales élégantes et originales pour mariages et réceptions',
      image: 'sdsdsfdf',
      rating: 8.8,
      address: 'Ngagara, Bujumbura',
      services: 'efdffd',
      reviews: 95,
      price: 35000
    }
  ];

  // ========== COMPUTED SIGNALS (filtres) ==========
  
  // Prestataires filtrés (recherche + catégorie)
  filteredProviders = computed(() => {
    let result = this.allProviders();
    const search = this.searchTerm().toLowerCase().trim();
    const category = this.selectedCategory();

    // Filtre par catégorie
    if (category !== 'Tous') {
      result = result.filter(Provider => Provider.category === category);
    }

    // Filtre par recherche (nom ou description)
    if (search) {
      result = result.filter(Provider =>
        Provider.name.toLowerCase().includes(search) ||
        Provider.description.toLowerCase().includes(search) ||
        Provider.location.toLowerCase().includes(search)
      );
    }

    return result;
  });

  // Nombre de résultats trouvés
  resultsCount = computed(() => this.filteredProviders().length);

  // ========== MÉTHODES ==========
  
  // Recherche
  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  // Filtre par catégorie
  filterByCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  // Réinitialiser les filtres
  resetFilters(): void {
    this.searchTerm.set('');
    this.selectedCategory.set('Tous');
  }

  // Voir les détails d'un prestataire
  viewDetails(ProviderId: number): void {
    console.log('Navigation vers le prestataire:', ProviderId);
    // À décommenter quand le router sera configuré
    // const router = inject(Router);
    // router.navigate(['/Providers', ProviderId]);
  }

  // Formater le prix
  formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-BI').format(price);
  }
}
