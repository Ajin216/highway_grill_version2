import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Highway Grill | Authentic Arabian Mandhi Experience'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'About Us | Highway Grill'
  },
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu.component').then(m => m.MenuComponent),
    title: 'Signature Mandhi Menu | Highway Grill'
  },
  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent),
    title: 'Gallery & Ambience | Highway Grill'
  },
  {
    path: 'videos',
    loadComponent: () => import('./pages/videos/videos.component').then(m => m.VideosComponent),
    title: 'Culinary Videos | Highway Grill'
  },
  {
    path: 'reservation',
    loadComponent: () => import('./pages/reservation/reservation.component').then(m => m.ReservationComponent),
    title: 'Table Reservation | Highway Grill'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),
    title: 'Contact Us | Highway Grill'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
