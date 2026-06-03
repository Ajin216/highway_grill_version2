import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface VideoItem {
  title: string;
  category: string;
  description: string;
  videoPath: string;
  duration: string;
  isPlaying: boolean;
}

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent {
  selectedCategory: string = 'All';
  categories: string[] = ['All', 'Behind The Scenes', 'Culinary Secrets', 'Dining Experience', 'Gourmet Art'];

  videoItems: VideoItem[] = [
    {
      title: 'The Art of Mandhi Roasting',
      category: 'Behind The Scenes',
      description: 'Watch our master chefs slow-cook succulent chicken and mutton inside traditional underground clay pits, seasoned with hand-ground Arabian spices for unmatched depth of flavor.',
      videoPath: '/videos/8477270-hd_1920_1080_24fps.mp4',
      duration: '0:15',
      isPlaying: false
    },
    {
      title: 'Signature Rice Preparation',
      category: 'Culinary Secrets',
      description: 'Experience the boiling and steaming of premium long-grain Basmati rice, infused with Arabian dry spices, saffron, ghee, and roasted nuts to create the aromatic foundation of our Mandhi.',
      videoPath: '/videos/15603343_1920_1080_25fps.mp4',
      duration: '0:10',
      isPlaying: false
    },
    {
      title: 'Premium Majlis Ambience',
      category: 'Dining Experience',
      description: 'Step into our luxury Majlis dining halls. An exquisite, warm, and inviting Arabic seating layout designed for comfort, perfect for hosting unforgettable family gatherings.',
      videoPath: '/videos/5243071-hd_1920_1080_25fps.mp4',
      duration: '0:12',
      isPlaying: false
    },
    {
      title: 'The Sizzling Serving Platter',
      category: 'Gourmet Art',
      description: 'The grand reveal of the Royal Arabian Mandhi Platter, served smoking and sizzling hot, topped with crispy onions, fresh coriander, and served alongside our signature tomato chutneys.',
      videoPath: '/videos/15509247_3840_2160_60fps.mp4',
      duration: '0:14',
      isPlaying: false
    }
  ];

  activeModalVideo: VideoItem | null = null;

  hoverPlay(video: HTMLVideoElement) {
    if (!window.matchMedia('(hover: hover)').matches) {
      return;
    }
    video.play().catch(error => {
      if (error.name !== 'AbortError') {
        console.error('Video play failed:', error);
      }
    });
  }

  hoverPause(video: HTMLVideoElement) {
    if (!window.matchMedia('(hover: hover)').matches) {
      return;
    }
    video.pause();
  }

  get filteredVideos(): VideoItem[] {
    if (this.selectedCategory === 'All') {
      return this.videoItems;
    }
    return this.videoItems.filter(item => item.category === this.selectedCategory);
  }

  setCategory(category: string) {
    this.selectedCategory = category;
  }

  openVideoModal(item: VideoItem, videoEl?: HTMLVideoElement) {
    if (videoEl) {
      videoEl.pause();
    }
    this.activeModalVideo = item;
    // Disable background scrolling while modal is open
    document.body.style.overflow = 'hidden';
  }

  closeVideoModal() {
    this.activeModalVideo = null;
    // Restore scrolling
    document.body.style.overflow = '';
  }
}

