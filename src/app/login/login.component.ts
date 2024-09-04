import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
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
export class LoginComponent {

  loading: boolean = false;
  failedLogin: boolean = false;
  loginCard: boolean = true;
  signupCard: boolean = false;
  forgotPasswordCard: boolean = false;
  wrongEmail: boolean = false;
  wrongEntries: boolean = false;
  rememberMe: boolean = false;
  wrongPasswordEntries: boolean = false;
  resetPasswordCard: boolean = false;
  resetPasswordSuccess: boolean = false;
  signUpSuccess: boolean = false;
  wrongPassword: boolean = false;
  wrongEmailValidation: boolean = false;

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: number = +49;
  color: string = 'Choose a color';
  confirmPassword: string = '';
  username: string = '';
  password: string = '';


  constructor(
    private router: Router,
    // private auth: AuthService,
    private http: HttpClient
  ) {}

}
