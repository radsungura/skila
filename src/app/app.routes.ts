import { Routes } from '@angular/router';
import { Home } from './home/home';
import { PlacesComponent } from './features/places/places';
import { ProvidersComponent } from './features/providers/providers';
import { MyServices } from './components/my-services/my-services';

export const routes: Routes = [
    { path: '', component: Home,},    
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'places', component: PlacesComponent },
    { path: 'providers', component: ProvidersComponent },
    { path: 'myservices', component: MyServices }
];
