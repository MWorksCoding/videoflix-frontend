import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'videoflix-frontend';
  spinner_color: string = '#2e3edf'

  constructor(
    public common: CommonService
  ) {}
}
