import { Component } from '@angular/core';
import { MaterialDesignModule } from '../shared/material-design.module';
import { CommonModule } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonService } from '../services/common.service';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    MaterialDesignModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
        })
      ),
      transition('void <=> *', animate('0.5s ease-in-out')),
    ]),
  ],
})
export class NotFoundComponent {
  constructor(public common: CommonService) {}

  /**
   * Initializes the component.
   */
  ngOnInit(): void {
    this.common.component = 'login';
  }
}
