import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    children: [], // Home route - main content shown in app.ts
  },
  {
    path: 'registration',
    loadComponent: () =>
      import('./pages/registration/registration.component').then((m) => m.RegistrationComponent),
  },
];
