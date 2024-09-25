import { Component } from '@angular/core';
import { MaterialDesignModule } from '../shared/material-design.module';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
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
import { CommonService } from '../services/common.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
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
export class RegisterComponent {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  confirmPasswordFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  rememberMe: boolean = false;
  email: string = '';
  password: string = '';
  form: FormGroup | undefined;


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    public common: CommonService
  ) {}

  passwordsMatch(): boolean {
    return this.passwordFormControl.value === this.confirmPasswordFormControl.value;
  }

  // Check if the form is valid for enabling the submit button
  isFormValid(): boolean {
    return this.emailFormControl.valid && this.passwordFormControl.valid && this.confirmPasswordFormControl.valid && this.passwordsMatch();
  }

  ngOnInit(): void {
    this.common.component = "home";
  }

}
