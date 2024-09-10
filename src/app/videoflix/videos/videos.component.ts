import { Component } from '@angular/core';
import { CommonService } from '../../services/common.service';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {DatePipe} from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatListModule, MatDividerModule, DatePipe ],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.scss'
})
export class VideosComponent {

  folders: Section[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    },
  ];
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    },
  ];

  constructor(
    public common: CommonService
  ) {}

  ngOnInit(): void {
    this.common.component = "videos";
  }
}
