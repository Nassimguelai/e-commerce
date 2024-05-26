import { Routes } from '@angular/router';
import { AddFormComponent } from './components/add-form/add-form.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'add-product', component: AddFormComponent },
    { path: 'home', redirectTo: '/', pathMatch: 'full' }
];
