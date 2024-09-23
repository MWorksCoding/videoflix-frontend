import { Component } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { DatePipe } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    DatePipe,
    CommonModule
  ],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss',
})
export class VideosComponent {
  videos: any[] = [];
  groupedVideos: { [key: string]: any[] } = {};
  title: string = 'Breakout';
  description: string =
    'Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können';
  currentThumbnail: string = '/assets/img/bg-login.jpeg';

  constructor(public common: CommonService, private http: HttpClient) {}

  ngOnInit(): void {
    this.common.component = 'videos';
    this.getVideos();
  }

  async getVideos() {
    try {
      const url = environment.baseUrl + '/videos/';
      const response = await lastValueFrom(this.http.get(url));
      this.videos = response as any[];
      this.groupVideosByCategory();
      console.error('this.videos:', this.videos);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  groupVideosByCategory(): void {
    this.groupedVideos = this.videos.reduce((acc, video) => {
      const genre = video.genre || 'Uncategorized'; // Default to 'Uncategorized' if genre is missing
      if (!acc[genre]) {
        acc[genre] = [];
      }
      acc[genre].push(video);
      return acc;
    }, {});
  }

  getGroupedVideoKeys(): string[] {
    return Object.keys(this.groupedVideos);
  }

  showInfo(video: {
    thumbnail_file: string;
    title: string;
    description: string;
  }) {
    this.title = video.title;
    this.description = video.description;
    this.currentThumbnail = video.thumbnail_file;
  }
}
