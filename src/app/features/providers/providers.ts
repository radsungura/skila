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
  providers: any = []; // Liste des prestataires
  isLoading: boolean = true; // Indicateur de chargement

  constructor(private prov: ProvidersService) { 
    this.isLoading = true; // Activer le chargement
    this.prov.getAll().subscribe(el => {
      if (el.length) {
        this.allProviders.set(el); // Mettre à jour la liste complète des prestataires
      }
    });  
  }
  // Terme de recherche
  searchTerm = signal<string>('');
  
  // Catégorie sélectionnée
  selectedCategory = signal<string>('Tous');
  
  // Liste des catégories disponibles
  categories = signal<string[]>(['Tous', 'Music Band', 'Decoration', 'Traiteur', 'Photographie', 'Animation']);
  
  // Liste complète des prestataires
    private allProviders = signal<any[]>([]); // Liste complète des prestataires

  // ========== COMPUTED SIGNALS (filtres) ==========
  
  // Prestataires filtrés (recherche + catégorie)
  filteredProviders = computed(() => {
    let result = this.allProviders();
    const search = this.searchTerm().toLowerCase().trim();
    const category = this.selectedCategory();

    // Filtre par catégorie
    if (category !== 'Tous') {
      result = result.filter(Provider => Provider.services === category);
    }

    // Filtre par recherche (nom ou description)
    if (search) {
      console.log("search", search);
      
      result = result.filter(Provider =>
        
        Provider.name.toLowerCase().includes(search) ||
        Provider.desc.toLowerCase().includes(search) ||
        Provider.address.toLowerCase().includes(search),
      );
    console.log("data", result);

    }

    if (result.length === 0) {
      this.isLoading = false; // Désactiver le chargement si aucun résultat trouvé
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
