import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GalleryItem {
  title: string;
  category: 'food' | 'interior';
  placeholderLabel: string;
  dimension: string;
  imagePath?: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent {
  selectedFilter: 'all' | 'food' | 'interior' = 'all';

  galleryItems: GalleryItem[] = [
    {
      title: 'Authentic Chicken Mandhi',
      category: 'food',
      placeholderLabel: 'Food Image Placeholder 1',
      dimension: '800 x 600 px',
      imagePath: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Smoky Al Faham Mandhi Platter',
      category: 'food',
      placeholderLabel: 'Food Image Placeholder 2',
      dimension: '800 x 600 px',
      imagePath: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Underground Roasted Mutton Mandhi',
      category: 'food',
      placeholderLabel: 'Food Image Placeholder 3',
      dimension: '800 x 600 px',
      imagePath: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Arabian Special Royal Family Platter',
      category: 'food',
      placeholderLabel: 'Food Image Placeholder 4',
      dimension: '800 x 600 px',
      imagePath: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Majlis Luxury Dining Seating Area',
      category: 'interior',
      placeholderLabel: 'Restaurant Image Placeholder 1',
      dimension: '800 x 600 px',
      imagePath: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Royal Arch Entrance & Interior Design',
      category: 'interior',
      placeholderLabel: 'Restaurant Image Placeholder 2',
      dimension: '800 x 600 px',
      imagePath: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
    }
  ];

  get filteredGallery(): GalleryItem[] {
    if (this.selectedFilter === 'all') {
      return this.galleryItems;
    }
    return this.galleryItems.filter(item => item.category === this.selectedFilter);
  }

  setFilter(filter: 'all' | 'food' | 'interior') {
    this.selectedFilter = filter;
  }
}
