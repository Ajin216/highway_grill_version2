import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  messageData: ContactMessage = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSent = false;
  showStatusMessage = false;

  onSubmit(form: any) {
    if (form.valid) {
      this.isSent = true;
      this.showStatusMessage = true;
      
      // Auto close/reset feedback after 4 seconds
      setTimeout(() => {
        this.showStatusMessage = false;
        this.messageData = {
          name: '',
          email: '',
          subject: '',
          message: ''
        };
        form.resetForm();
      }, 4000);
    }
  }
}
