import { Component } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environments';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
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
export class HeaderComponent {
  constructor(private router: Router, public common: CommonService, private http: HttpClient) {}
  error: string = '';
  redirectToLogin() {
    this.router.navigateByUrl('/login');
  }

  async logout() {
    try {
      const url = environment.baseUrl + '/logout/';
      let headers = new HttpHeaders();
      headers = headers.set(
        'Authorization',
        'Token' + localStorage.getItem('token')
      );
      await lastValueFrom(this.http.post(url, {}, { headers }));
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      this.common.openSnackBar('Now your are logged out', 'OK');
      this.router.navigateByUrl('/login');
    } catch (e) {
      this.error = 'Error while logging out';
    }
  }
}
