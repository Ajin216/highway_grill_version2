import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ReservationData {
  name: string;
  phone: string;
  email: string;
  guests: number;
  date: string;
  time: string;
  requests: string;
}

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  reservation: ReservationData = {
    name: '',
    phone: '',
    email: '',
    guests: 2,
    date: '',
    time: '',
    requests: ''
  };

  isSubmitted = false;
  showSuccessModal = false;

  onSubmit(form: any) {
    if (form.valid) {
      this.isSubmitted = true;
      this.showSuccessModal = true;

      // Construct professional WhatsApp message
      const phone = '919074501397';
      const specialRequests = this.reservation.requests ? this.reservation.requests : 'None';
      const messageText = `👑 *HIGHWAY GRILL - NEW TABLE RESERVATION*\n` +
                          `---------------------------------------------\n` +
                          `👤 *Name:* ${this.reservation.name}\n` +
                          `📞 *Phone:* ${this.reservation.phone}\n` +
                          `📧 *Email:* ${this.reservation.email}\n\n` +
                          `👥 *Number of Guests:* ${this.reservation.guests}\n` +
                          `📅 *Date:* ${this.reservation.date}\n` +
                          `🕒 *Time Slot:* ${this.reservation.time}\n\n` +
                          `📝 *Special Requests:* \n${specialRequests}\n` +
                          `---------------------------------------------\n` +
                          `_Sent via Highway Grill Reservation Portal_`;
      
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(messageText)}`;
      
      if (typeof window !== 'undefined') {
        window.open(whatsappUrl, '_blank');
      }
    }
  }

  closeModal() {
    this.showSuccessModal = false;
    // Reset form data
    this.reservation = {
      name: '',
      phone: '',
      email: '',
      guests: 2,
      date: '',
      time: '',
      requests: ''
    };
    this.isSubmitted = false;
  }
}
