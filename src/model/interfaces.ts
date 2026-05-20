export interface Provider {
  id: string;
  name: string;
  category: 'Music Band' | 'Decoration' | 'Traiteur' | 'Salle de reception' | string;
  location: Object;
  description: string;
  rating: number;
  reviews: number;
  capacity: number;
  price: number;
  images: string;
  tel: string;
  email: string;
  ville: string;
  address: string;
}

export interface Place {
  id: string;
  name: string;
  category: 'Music Band' | 'Decoration' | 'Traiteur' | 'Salle de reception' | string;
  location: Object;
  description: string;
  rating: number;
  reviews: number;
  capacity: number;
  price: number;
  images: string;
  tel: string;
  email: string;
  ville: string;
  address: string;
}

export interface User {
    name: string;
    fullname: string;
    email: string;
    role: 'admin' | 'provider' | 'client';
    pass: string;
    phone: string
}

// interface User {
//   id: number;
//   email: string;
//   name: string;
//   role: 'admin' | 'provider' | 'client';
//   avatar?: string;
//   phone?: string;
// }