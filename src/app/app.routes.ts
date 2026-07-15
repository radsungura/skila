import { Routes } from '@angular/router';
import { Home } from './home/home';
import { PlacesComponent } from './features/places/places';
import { ProvidersComponent } from './features/providers/providers';
import { MyServices } from './components/my-services/my-services';
import { authGuard } from '../guards/auth';
import { Login } from './features/login/login';
import { RegisterComponent } from './features/register/register';

export const routes: Routes = [
    { path: '', component: Home,},    
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: RegisterComponent },
    { path: 'places', component: PlacesComponent },
    { path: 'providers', component: ProvidersComponent },
    { path: 'myservices', component: MyServices , canActivate: [authGuard] }
];
