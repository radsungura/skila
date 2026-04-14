import { Component, signal, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Provider, Place, User } from './../../../model/interfaces';
@Component({
  selector: 'app-places',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './places.html',
  styleUrl: './places.scss',
})

export class PlacesComponent {

  places = signal<Place[]>([
    {
      id: '1',
      name: 'la rose',
      category: 'Music Band',
      location: 'ngagara',
      description: 'On rend vos événements inoubliable en vous offrant un service de Karaoké unique avec des chanteurs et musiciens expérimentés',
      rating: 8.6,
      reviews: 120,
      price: 50000,
      capacity: 0,
      images: '',
      tel: '',
      email: '',
      ville: '',
      address: ''
    },
    {
      id: '2',
      name: 'Muhira',
      category: 'Music Band',
      location: 'ngagara',
      description: 'Avec nous vos événements ne sont plus comme les autres, ils sont uniques',
      rating: 7.1,
      reviews: 150,
      price: 50000,
      capacity: 0,
      images: '',
      tel: '',
      email: '',
      ville: '',
      address: ''
    },
    {
      id: '3',
      name: 'El Magnifico',
      category: 'Decoration',
      location: 'ngagara',
      description: 'On décore pas vos places d\'événements mais on les transforme en vos rêves',
      rating: 8.2,
      reviews: 200,
      price: 50000,
      capacity: 0,
      images: '',
      tel: '',
      email: '',
      ville: '',
      address: ''
    }
  ]);

  viewDetails(providerId: string): void {
    console.log('Voir détails du prestataire:', providerId);
    // Navigation vers la page de détail
    // this.router.navigate(['/providers', providerId]);
  }
}
