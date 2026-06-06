import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

interface MenuItem {
  id: string;
  name: string;
  category: 'individual' | 'family' | 'special';
  description: string;
  price: string;
  label: string;
  imagePath?: string;
}

interface FeatureItem {
  title: string;
  description: string;
  iconPath: string; // inline SVG descriptions instead of file paths
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  private orderService = inject(OrderService);
  private router = inject(Router);

  selectedCategory: 'all' | 'individual' | 'family' | 'special' = 'all';
  activeMenuImage: string = 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80';

  setActiveImage(imagePath?: string) {
    if (imagePath) {
      this.activeMenuImage = imagePath;
    }
  }

  addToOrder(item: MenuItem) {
    this.orderService.addToOrder(item.id, item.name, item.price, item.imagePath);
    this.router.navigate(['/orders']);
  }

  menuItems: MenuItem[] = [
    {
      id: 'chicken-mandhi',
      name: 'Chicken Mandhi',
      category: 'individual',
      description: 'Slow-cooked succulent chicken flavored with traditional Hadhrami dry spice blend, served over premium aromatic long-grain steamed Mandhi rice.',
      price: 'Rs. 249',
      label: 'Chicken Mandhi Image Placeholder',
      imagePath: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'al-faham-mandhi',
      name: 'Al Faham Mandhi',
      category: 'individual',
      description: 'Charcoal-grilled chicken marinated in special Arabian green yogurt and garlic-mint infusion, served on a bed of smoky fragrant Mandhi rice.',
      price: 'Rs. 269',
      label: 'Al Faham Mandhi Image Placeholder',
      imagePath: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'mutton-mandhi',
      name: 'Mutton Mandhi',
      category: 'individual',
      description: 'Ultra-tender milk-fed baby mutton, slow-cooked in our underground clay pit-oven for 6 hours, melting off the bone on our spiced saffron rice.',
      price: 'Rs. 429',
      label: 'Mutton Mandhi Image Placeholder',
      imagePath: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'family-pack-mandhi',
      name: 'Family Pack Mandhi',
      category: 'family',
      description: 'A grand royal platter comprising a full chicken, double portion mutton, served over a massive mound of Mandhi rice with multiple hot sauces.',
      price: 'Rs. 949',
      label: 'Family Pack Mandhi Image Placeholder',
      imagePath: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'mixed-grill-mandhi',
      name: 'Mixed Grill Mandhi',
      category: 'special',
      description: 'A luxurious combination of charcoal-grilled Al Faham chicken, seekh kebab, and grilled lamb chops, served over aromatic golden Mandhi rice.',
      price: 'Rs. 579',
      label: 'Mixed Grill Mandhi Image Placeholder',
      imagePath: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'arabian-special-mandhi',
      name: 'Arabian Special Mandhi',
      category: 'special',
      description: 'Chef Al-Maitah’s signature masterpiece: layered saffron Mandhi rice topped with slow-braised shoulder of lamb, roasted almonds, raisins, and ghee.',
      price: 'Rs. 619',
      label: 'Arabian Special Mandhi Image Placeholder',
      imagePath: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80'
    }
  ];

  whyChooseUs: FeatureItem[] = [
    {
      title: 'Authentic Arabian Recipes',
      description: 'Our recipes have been handed down through generations, ensuring absolute Yemeni authenticity in every spice grain.',
      iconPath: 'recipes'
    },
    {
      title: 'Fresh Ingredients',
      description: 'We source premium meat, daily-milled spices, and premium basmati rice to preserve freshness and taste.',
      iconPath: 'fresh'
    },
    {
      title: 'Family-Friendly Dining',
      description: 'Spacious floor layouts and dedicated family dining rooms that guarantee privacy, warmth, and luxury.',
      iconPath: 'family'
    },
    {
      title: 'Fast Service',
      description: 'Our traditional underground pits run continuously, guaranteeing that your feast is served piping hot in minutes.',
      iconPath: 'fast'
    },
    {
      title: 'Spacious Seating',
      description: 'Beautiful Middle Eastern majlis and modern premium tables designed for ultimate comfort and royal feel.',
      iconPath: 'seating'
    },
    {
      title: 'Affordable Pricing',
      description: 'Royal feast experiences at extremely competitive prices, perfect for regular dining and large gatherings.',
      iconPath: 'pricing'
    }
  ];

  get filteredItems(): MenuItem[] {
    if (this.selectedCategory === 'all') {
      return this.menuItems;
    }
    return this.menuItems.filter(item => item.category === this.selectedCategory);
  }

  filterCategory(category: 'all' | 'individual' | 'family' | 'special') {
    this.selectedCategory = category;
    const items = this.filteredItems;
    if (items.length > 0 && items[0].imagePath) {
      this.activeMenuImage = items[0].imagePath;
    }
  }
}
