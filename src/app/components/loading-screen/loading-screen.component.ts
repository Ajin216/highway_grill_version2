import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit {
  isVisible = true;

  ngOnInit() {
    // Hide the loader after 1.5 seconds for a premium intro feel
    setTimeout(() => {
      this.isVisible = false;
    }, 1500);
  }
}
