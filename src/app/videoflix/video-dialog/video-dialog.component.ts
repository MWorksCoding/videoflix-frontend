import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { CommonService } from '../../services/common.service';
import { MaterialDesignModule } from '../../shared/material-design.module';

@Component({
  selector: 'app-video-dialog',
  standalone: true,
  imports: [MaterialDesignModule],
  templateUrl: './video-dialog.component.html',
  styleUrl: './video-dialog.component.scss',
})
export class VideoDialogComponent {
  video: any[] = [];
  videoUrl: any;

  constructor(
    public common: CommonService,
    public dialogRef: MatDialogRef<VideoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { videodata: any },
    private http: HttpClient
  ) {
    console.log('videodata', this.data);
  }

  ngOnInit(): void {
    this.common.component = 'videos';
    this.playVideo();
  }

  async playVideo() {
    try {
      const url = `${this.data.videodata}/`;
      const response = await lastValueFrom(this.http.get(url, { responseType: 'blob' }));
      const videoBlob = response as Blob;
      this.videoUrl = URL.createObjectURL(videoBlob);
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  }
}
