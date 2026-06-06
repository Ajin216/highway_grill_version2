import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  priceString: string;
  quantity: number;
  imagePath?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private itemsSubject = new BehaviorSubject<OrderItem[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('highway_grill_orders');
      if (saved) {
        try {
          this.itemsSubject.next(JSON.parse(saved));
        } catch (e) {
          console.error('Error loading orders from localStorage', e);
        }
      }
    }
  }

  private saveToLocalStorage(items: OrderItem[]) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('highway_grill_orders', JSON.stringify(items));
    }
  }

  get items(): OrderItem[] {
    return this.itemsSubject.value;
  }

  addToOrder(id: string, name: string, priceString: string, imagePath?: string) {
    const current = this.items.map(item => ({ ...item }));
    const existing = current.find(item => item.id === id);
    const price = this.parsePrice(priceString);

    if (existing) {
      existing.quantity += 1;
    } else {
      current.push({
        id,
        name,
        price,
        priceString,
        quantity: 1,
        imagePath
      });
    }

    this.itemsSubject.next(current);
    this.saveToLocalStorage(current);
  }

  updateQuantity(id: string, quantity: number) {
    let current = this.items.map(item => ({ ...item }));
    const existing = current.find(item => item.id === id);
    if (existing) {
      existing.quantity = quantity;
      if (existing.quantity <= 0) {
        current = current.filter(item => item.id !== id);
      }
      this.itemsSubject.next(current);
      this.saveToLocalStorage(current);
    }
  }

  removeFromOrder(id: string) {
    const filtered = this.items.filter(item => item.id !== id);
    this.itemsSubject.next(filtered);
    this.saveToLocalStorage(filtered);
  }

  clearOrder() {
    this.itemsSubject.next([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('highway_grill_orders');
    }
  }

  getTotalPrice(): number {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  private parsePrice(priceStr: string): number {
    const cleaned = priceStr.replace(/[^0-9]/g, '');
    return parseInt(cleaned, 10) || 0;
  }
}
