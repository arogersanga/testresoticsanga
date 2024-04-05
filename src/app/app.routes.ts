import { Routes } from '@angular/router';
import { ClientsVisitesComponent } from './clients-visites/clients-visites.component';
import { ClientVisiteDetailComponent } from './client-visite-detail/client-visite-detail.component';

export const routes:  Routes = [
    { path: '', component: ClientsVisitesComponent},
    { path: 'remove-client-detail/:id', component: ClientVisiteDetailComponent },
    { path: 'add-client-detail', component: ClientVisiteDetailComponent },
    { path: 'edit-client-detail/:id', component: ClientVisiteDetailComponent }
];
