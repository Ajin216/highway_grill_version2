import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface ReviewItem {
  id: number;
  name: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  avatarColor: string;
  initials: string;
  photo?: string;
  verified: boolean;
}

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}



@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  selectedFilter: number = 0; // 0 means 'All'
  displayedReviewsLimit: number = 4;

  // Global ratings stats
  totalReviewsCount = 29;
  averageRating = 4.2;
  satisfactionRate = 98;
  happyCustomersCount = '5,000+';

  ratingDistribution = [
    { stars: 5, percentage: 85, count: 295 },
    { stars: 4, percentage: 10, count: 35 },
    { stars: 3, percentage: 3, count: 10 },
    { stars: 2, percentage: 1, count: 5 },
    { stars: 1, percentage: 1, count: 3 }
  ];

  reviewsList: ReviewItem[] = [
    {
      id: 1,
      name: 'Mohammed Al-Fayed',
      rating: 5,
      date: 'June 01, 2026',
      title: 'Absolutely Majestic Mandhi!',
      content: 'Highway Grill Mandhi serves delicious and flavorful mandhi that truly stands out. The rice is perfectly cooked, aromatic, and pairs very well with the tender and juicy chicken. The portion size is generous, making it great for sharing with friends and family. The taste feels authentic, and the overall quality is consistent on every visit. The ambiance is comfortable and clean, and the staff are friendly and attentive. Pricing is also reasonable considering the quantity and quality provided. If you’re a mandhi lover looking for a satisfying and budget-friendly meal, Highway Grill Mandhi is definitely worth trying. Highly recommended!',
      avatarColor: '#D4A017',
      initials: 'MA',
      verified: true
    },
    {
      id: 2,
      name: 'Priya Sharma',
      rating: 5,
      date: 'May 28, 2026',
      title: 'Unforgettable Family Dinner',
      content: 'While we travelling through NH , we can’t find any mandhi shop nearby kakkancherry , There this restaurant showed up , We got less expectations of their mandhi but , it was soo good by the experience, where rice is too good and also the chicken, overall the atmosphere is well . I do recommend for long travelers passing there to try their mandhi , but it is not a special one if only you craving for it',
      avatarColor: '#8B0000',
      initials: 'PS',
      verified: true
    },
    {
      id: 3,
      name: 'John Doe',
      rating: 4,
      date: 'May 24, 2026',
      title: 'Authentic taste and premium service',
      content: 'Food tastey food and not too pricey even for manthi, and also you wont get tired waiting for so long staffs are so fast and very cooperative. 😋👍',
      avatarColor: '#2A52BE',
      initials: 'JD',
      verified: true
    },
    {
      id: 4,
      name: 'Aisha Rahman',
      rating: 5,
      date: 'May 15, 2026',
      title: 'The Saffron Rice is Divine',
      content: 'Amazing food,excellent serviceMandi starting 150 rs,If your hungry come here and get your food in 5 minutes',
      avatarColor: '#10B981',
      initials: 'AR',
      verified: true
    },
    {
      id: 5,
      name: 'Rohan Kurian',
      rating: 5,
      date: 'May 08, 2026',
      title: 'Amazing charcoal flavor',
      content: 'If you love authentic Al Faham, this place is a must-visit. The special dry spice blend they use is incredible. The service is fast and staff are extremely welcoming.',
      avatarColor: '#8B5CF6',
      initials: 'RK',
      verified: true
    },
    {
      id: 6,
      name: 'Fatima Zahra',
      rating: 5,
      date: 'May 02, 2026',
      title: 'Pure Perfection in Yemen Style',
      content: 'The clay oven-roasted mutton is insanely tender and flavorful. Eating inside their luxury booths feels like dining in a palace. Highway Grill is a gem.',
      avatarColor: '#F59E0B',
      initials: 'FZ',
      verified: true
    }
  ];



  faqs: FAQItem[] = [
    {
      question: 'How do I leave a review for Highway Grill?',
      answer: 'You can submit your experience directly on this page using our "Write a Review" form below, or you can write a review on our official Google Business Profile by clicking the Google Reviews button.',
      isOpen: false
    },
    {
      question: 'Are all customer reviews verified?',
      answer: 'Yes! Reviews displaying the "Verified Diner" badge are compiled from customers who completed a table reservation or placed an order directly with our branch.',
      isOpen: false
    },
    {
      question: 'How does the Google Reviews integration work?',
      answer: 'Our summary displays the live average score across our Google reviews. The button redirects you to our official Google page where you can help support us by sharing your rating with the world.',
      isOpen: false
    }
  ];

  get filteredReviews(): ReviewItem[] {
    let list = this.reviewsList;
    if (this.selectedFilter > 0) {
      list = this.reviewsList.filter(r => r.rating === this.selectedFilter);
    }
    return list;
  }

  setFilter(rating: number) {
    this.selectedFilter = rating;
    this.displayedReviewsLimit = 4; // Reset limit when filter changes
  }

  loadMore() {
    this.displayedReviewsLimit += 4;
  }

  toggleFaq(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }
}
