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
import { ActivatedRoute, Router } from '@angular/router';
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
import { environment } from '../../environments/environments';
import { lastValueFrom } from 'rxjs';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [
    MaterialDesignModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss',
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
export class PasswordResetComponent {
  passwordFormControl = new FormControl('', [Validators.required]);
  confirmPasswordFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();
  rememberMe: boolean = false;
  email: string = '';
  password: string = '';
  form: FormGroup | undefined;
  resetForm: FormGroup;
  code: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    public common: CommonService
  ) {
    this.resetForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    });

  }

  passwordsMatch(): boolean {
    return (
      this.passwordFormControl.value === this.confirmPasswordFormControl.value
    );
  }

  isFormValid(): boolean {
    return (
      this.passwordFormControl.valid &&
      this.confirmPasswordFormControl.valid &&
      this.passwordsMatch()
    );
  }

  ngOnInit(): void {
    this.common.component = 'home';
    this.route.queryParamMap.subscribe((params) => {
      this.code = params.get('code');
    });
  }

  async resetPassword() {
    try {
      let url = environment.baseUrl + '/api/accounts/password/reset/verified/';
      let body = {
        code:this.code,
        password: this.passwordFormControl.value,
      };
      const response = await lastValueFrom(this.http.post(url, body));
      this.passwordFormControl = new FormControl('', [Validators.required]);
      this.confirmPasswordFormControl = new FormControl('', [
        Validators.required,
      ]);
      this.common.openSnackBar(
        'Password reset was successfull. Now we redirect you to the login',
        ''
      );
      setTimeout(() => {
        this.router.navigateByUrl('/login');
      }, 5000);
    } catch (error) {
      console.error('Error resetting your password. Please try again later.', error);
      setTimeout(() => {
        this.common.openSnackBar(
          'Error resetting your password. Please try again later.',
          'OK'
        );
      }, 5000);
    }
  }
}
