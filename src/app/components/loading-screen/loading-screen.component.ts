import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
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
  isFadingOut = false;
  private timeoutId: any;
  private isListening = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Enable user-triggered dismiss after 500ms to ignore initial browser layout scroll events
    setTimeout(() => {
      this.isListening = true;
      this.cdr.detectChanges();
    }, 500);

    // Automatically fade out after 2.5 seconds, or dismiss sooner if the user scrolls/clicks
    this.timeoutId = setTimeout(() => {
      this.dismissLoader();
    }, 2500);
  }

  @HostListener('window:scroll', [])
  @HostListener('window:wheel', [])
  @HostListener('window:touchmove', [])
  onUserScroll() {
    if (this.isListening) {
      this.dismissLoader();
    }
  }

  dismissLoader() {
    if (this.isFadingOut) return;
    this.isFadingOut = true;
    this.cdr.detectChanges();

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    // Let the 0.5s fade-out CSS transition complete before removing component from DOM
    setTimeout(() => {
      this.isVisible = false;
      this.cdr.detectChanges();
    }, 500);
  }
}

