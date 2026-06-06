import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { OrderService, OrderItem } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orderService = inject(OrderService);
  private router = inject(Router);

  showConfirmModal = false;
  modalTitle = '';
  modalMessage = '';
  private onConfirmCallback: (() => void) | null = null;

  confirmAction(title: string, message: string, onConfirm: () => void) {
    this.modalTitle = title;
    this.modalMessage = message;
    this.onConfirmCallback = onConfirm;
    this.showConfirmModal = true;
  }

  onConfirm() {
    if (this.onConfirmCallback) {
      this.onConfirmCallback();
    }
    this.closeModal();
  }

  closeModal() {
    this.showConfirmModal = false;
    this.onConfirmCallback = null;
  }

  increment(item: OrderItem) {
    this.orderService.updateQuantity(item.id, item.quantity + 1);
  }

  decrement(item: OrderItem) {
    if (item.quantity === 1) {
      this.confirmAction(
        'Remove Item',
        `Are you sure you want to remove ${item.name} from your order?`,
        () => this.orderService.updateQuantity(item.id, 0)
      );
    } else {
      this.orderService.updateQuantity(item.id, item.quantity - 1);
    }
  }

  remove(item: OrderItem) {
    this.confirmAction(
      'Remove Item',
      `Are you sure you want to remove ${item.name} from your order?`,
      () => this.orderService.removeFromOrder(item.id)
    );
  }

  clearAll() {
    this.confirmAction(
      'Clear Order',
      'Are you sure you want to clear all items from your order?',
      () => this.orderService.clearOrder()
    );
  }

  orderViaWhatsApp() {
    const items = this.orderService.items;
    if (items.length === 0) return;

    let message = `*New Order from Highway Grill Website:*\n`;
    message += `----------------------------------------\n`;
    items.forEach(item => {
      message += `• ${item.name} x ${item.quantity} (Rs. ${item.price * item.quantity})\n`;
    });
    message += `----------------------------------------\n`;
    message += `*Total Amount:* Rs. ${this.orderService.getTotalPrice()}\n\n`;
    message += `Please confirm my order and let me know the status. Thank you!`;

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919074501397?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  }
}
