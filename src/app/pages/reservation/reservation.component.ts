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
