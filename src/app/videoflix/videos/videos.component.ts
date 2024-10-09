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
          opacity: 0.1, // The initial opacity when the element is not visible
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

  /**
   * Lifecycle hook that is called after the component has been initialized.
   * This method sets the `common.component` property to `'videos'` and
   * triggers the `getVideos` method.
   *
   * @returns {void}
   */
  ngOnInit(): void {
    this.common.component = 'videos';
    this.getVideos();
  }

  /**
   * Asynchronously fetches a list of videos from the server and groups them by category.
   *
   * This method performs the following steps:
   * 1. Constructs the URL to fetch videos using the base URL defined in the environment configuration.
   * 2. Sends a GET request to the video URL and waits for the response.
   * 3. If the request is successful, it assigns the response to the `videos` property and groups the videos by category.
   *
   * If an error occurs during the fetching process, it logs the error to the console.
   *
   * @async
   * @returns {Promise<void>} A promise that resolves when the videos have been successfully fetched and grouped.
   */
  async getVideos(): Promise<void> {
    try {
      const url = environment.baseUrl + '/videos/';
      const response = await lastValueFrom(this.http.get(url));
      this.videos = response as any[];
      this.groupVideosByCategory();
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  /**
   * Groups the fetched videos by their genre/category.
   *
   * This method iterates through the `videos` array and organizes the videos into an object where each key
   * corresponds to a genre. If a video does not have a genre, it is categorized as 'Uncategorized'.
   * It then calls `selectFirstVideo()` to select the first video for display.
   *
   * @returns {void}
   */
  groupVideosByCategory(): void {
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

  /**
   * Selects the first video from the grouped videos based on the lowest video ID.
   *
   * This method flattens the grouped videos and finds the video with the lowest ID. It then calls
   * the `showInfo` method to display the video's information.
   *
   * @returns {void}
   */
  selectFirstVideo(): void {
    const allVideos = Object.values(this.groupedVideos).flat();
    if (allVideos.length > 0) {
      const videoWithLowestId = allVideos.reduce((min, video) => {
        return video.id < min.id ? video : min;
      });
      this.showInfo(videoWithLowestId);
    }
  }

  /**
   * Returns the keys of the grouped videos, representing the categories.
   *
   * @returns {string[]} An array of strings, each representing a genre/category of the grouped videos.
   */
  getGroupedVideoKeys(): string[] {
    return Object.keys(this.groupedVideos);
  }

  /**
   * Displays information about the selected video in the console and updates the component properties.
   *
   * This method accepts a video object and logs it to the console. It updates the component properties:
   * `title`, `description`, `currentThumbnail`, and `videoUrl` to reflect the selected video's details.
   * It also triggers an animation.
   *
   * @param {Object} video - The video object containing details of the selected video.
   * @param {string} video.thumbnail_file - The URL of the video's thumbnail image.
   * @param {string} video.title - The title of the video.
   * @param {string} video.description - A description of the video.
   * @param {string} video.video_file - The URL of the video file.
   *
   * @returns {void}
   */
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

  /**
   * Triggers an animation by changing the animation state.
   * This method sets the `animationState` property to 'void' and then changes it to 'visible' after a delay of 250 milliseconds.
   * @returns {void}
   */
  triggerAnimation(): void {
    this.animationState = 'void';
    setTimeout(() => {
      this.animationState = 'visible';
    }, 250);
  }

  /**
   * Returns a style object for the background of the component based on the current thumbnail.
   * This method constructs a style object that sets the background image to a linear gradient overlay and the current thumbnail.
   * @returns {Object} An object containing CSS properties for the background style.
   */
  getBackgroundStyle(): { [key: string]: string } {
    return {
      'background-image': `linear-gradient(180deg, #000000 -19.89%, rgba(0, 0, 0, 0.55) 40.46%, #000000 100%), url(${this.currentThumbnail})`,
      'background-size': 'cover',
      'background-position': 'center',
      'background-repeat': 'no-repeat',
    };
  }

  /**
   * Opens a dialog to play the selected video.
   * This method opens a dialog using the `VideoDialogComponent`, passing the video URL as data for the dialog.
   * It also subscribes to the dialog's close event to perform actions based on the result.
   *
   * @returns {void}
   */
  openVideoDialog(): void {
    let dialogRef = this.dialog.open(VideoDialogComponent, {
      width: 'fit-content',
      height: 'fit-content',
      autoFocus: true,
      data: {
        videodata: this.videoUrl,
      },
    });
  }
}
