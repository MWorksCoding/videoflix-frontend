import { Component } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { DatePipe } from '@angular/common';
import { MaterialDesignModule } from '../../shared/material-design.module';
import { VideoDialogComponent } from '../video-dialog/video-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [MaterialDesignModule, DatePipe],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss',
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0, // The initial opacity when the element is not visible
        })
      ),
      state(
        'visible',
        style({
          opacity: 1, // The final opacity when the element is fully visible
        })
      ),
      transition('void => visible', animate('0.25s ease-in-out')), // 500ms fade-in
    ]),
  ],
})
export class VideosComponent {
  videos: any[] = [];
  groupedVideos: { [key: string]: any[] } = {};
  title: string = 'Breakout';
  videoUrl: string = '';
  description: string = '';
  currentThumbnail: string = '';
  animationState: string = 'visible';

  constructor(
    public common: CommonService,
    private http: HttpClient,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.common.component = 'videos';
    this.getVideos();
  }

  async getVideos() {
    try {
      const url = environment.baseUrl + '/videos/';
      const response = await lastValueFrom(this.http.get(url));
      console.error('response:', response);
      this.videos = response as any[];
      this.groupVideosByCategory();
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  groupVideosByCategory() {
    this.groupedVideos = this.videos.reduce((acc, video) => {
      const genre = video.genre || 'Uncategorized';
      if (!acc[genre]) {
        acc[genre] = [];
      }
      acc[genre].push(video);
      return acc;
    }, {});
    this.selectFirstVideo();
  }

  selectFirstVideo() {
    const allVideos = Object.values(this.groupedVideos).flat();
    if (allVideos.length > 0) {
      const videoWithLowestId = allVideos.reduce((min, video) => {
        return video.id < min.id ? video : min;
      });
      this.showInfo(videoWithLowestId);
    }
  }

  getGroupedVideoKeys(): string[] {
    return Object.keys(this.groupedVideos);
  }

  showInfo(video: {
    thumbnail_file: string;
    title: string;
    description: string;
    video_file: string;
  }) {
    console.log(video);
    this.title = video.title;
    this.description = video.description;
    this.currentThumbnail = video.thumbnail_file;
    this.videoUrl = video.video_file;
    this.triggerAnimation();
  }

  triggerAnimation() {
    this.animationState = 'void';
    setTimeout(() => {
      this.animationState = 'visible';
    }, 250);
  }

  getBackgroundStyle() {
    return {
      'background-image': `linear-gradient(180deg, #000000 -19.89%, rgba(0, 0, 0, 0.55) 40.46%, #000000 100%), url(${this.currentThumbnail})`,
      'background-size': 'cover',
      'background-position': 'center',
      'background-repeat': 'no-repeat',
    };
  }

  openVideoDialog() {
    const dialogRef = this.dialog.open(VideoDialogComponent, {
      width: 'fit-content',
      height: 'fit-content',
      autoFocus: true,
      data: {
        videodata: this.videoUrl,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'video-closed') {
      }
    });
  }
}
