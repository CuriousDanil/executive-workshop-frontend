import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    children: [], // Home route - hello world shown in app.ts
  },
];
