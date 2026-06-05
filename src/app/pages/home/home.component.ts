import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Review {
  name: string;
  role: string;
  rating: number;
  comment: string;
  placeholderLabel: string;
  imagePath?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;
  activeReviewIndex = 0;
  private carouselInterval: any;
  private videoTimeout: any;
  videoPlaying = false;

  onVideoPlaying() {
    this.videoPlaying = true;
  }

  reviews: Review[] = [
    {
      name: 'Faisal Bin Ahmad',
      role: 'Arabian Cuisine Enthusiast',
      rating: 5,
      comment: 'Absolutely authentic! The Mutton Mandhi took me back to my days in Hadhramaut. The meat was incredibly tender, perfectly infused with spices, and the rice was cooked to absolute perfection. The atmosphere is truly luxury.',
      placeholderLabel: 'Faisal Profile Image',
      imagePath: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80'
    },
    {
      name: 'Sarah Joseph',
      role: 'Food Blogger & Reviewer',
      rating: 5,
      comment: 'Highway Grill has raised the bar for Arabian cuisine! Their Al Faham Mandhi has that perfect charcoal smoky flavor, and the garlic sauce is heavenly. Premium presentation and superb Middle Eastern hospitality.',
      placeholderLabel: 'Sarah Profile Image',
      imagePath: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80'
    },
    {
      name: 'Rahman K.P.',
      role: 'Family Dining Patron',
      rating: 5,
      comment: 'We ordered the Family Pack Mandhi, and it was a royal feast! Generous portions, delicious accompaniments, and the chicken was succulent. The spacious seating and premium hospitality made our family evening unforgettable.',
      placeholderLabel: 'Rahman Profile Image',
      imagePath: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80'
    },
    {
      name: 'Aisha Al-Hashmi',
      role: 'Diplomatic Council Member',
      rating: 5,
      comment: 'Highly recommended for anyone seeking genuine Arabian culinary hospitality. The Arabian Special Mandhi is a masterpiece of blend of spices and cooking techniques. Outstanding, premium service!',
      placeholderLabel: 'Aisha Profile Image',
      imagePath: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80'
    },
    {
      name: 'Nikhil Menon',
      role: 'Local Food Guide',
      rating: 5,
      comment: 'The absolute best dining spot along the highway! Outstanding direct highway parking, super accessible, and the Mandhi is always piping hot. Excellent speed of service!',
      placeholderLabel: 'Nikhil Profile Image',
      imagePath: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&h=100&q=80'
    },
    {
      name: 'Farhana Sherin',
      role: 'Malabar Gourmet Critic',
      rating: 5,
      comment: 'Superb kids-friendly setup! The private family cabins are incredibly cozy, and the staff happily tailored the spices to be milder for our kids. High chairs are clean and spacious. A true Malabar culinary gem!',
      placeholderLabel: 'Farhana Profile Image',
      imagePath: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&h=100&q=80'
    }
  ];

  ngOnInit() {
    this.startCarousel();
  }

  ngAfterViewInit() {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadAndPlayVideo();
            observer.disconnect();
          }
        });
      }, { rootMargin: '100px' });
      
      const hero = document.querySelector('.hero-section');
      if (hero) {
        observer.observe(hero);
      } else {
        this.loadAndPlayVideo();
      }
    } else {
      this.loadAndPlayVideo();
    }
  }

  private loadAndPlayVideo() {
    this.videoTimeout = setTimeout(() => {
      if (this.heroVideo && this.heroVideo.nativeElement) {
        const video = this.heroVideo.nativeElement;
        video.play().catch(err => {
          console.log('Autoplay was prevented or video failed to play: ', err);
        });
      }
    }, 4000);
  }

  ngOnDestroy() {
    this.stopCarousel();
    if (this.videoTimeout) {
      clearTimeout(this.videoTimeout);
    }
  }

  startCarousel() {
    this.carouselInterval = setInterval(() => {
      this.nextReview(false);
    }, 5000);
  }

  stopCarousel() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  slides = [0, 1, 2];

  setActiveReview(index: number) {
    this.activeReviewIndex = index;
    this.stopCarousel();
    this.startCarousel();
  }

  prevReview() {
    this.activeReviewIndex = (this.activeReviewIndex === 0) ? 2 : this.activeReviewIndex - 1;
    this.stopCarousel();
    this.startCarousel();
  }

  nextReview(isManual: boolean = false) {
    this.activeReviewIndex = (this.activeReviewIndex === 2) ? 0 : this.activeReviewIndex + 1;
    if (isManual) {
      this.stopCarousel();
      this.startCarousel();
    }
  }
}
