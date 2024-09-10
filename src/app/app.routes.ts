import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { PrivacyComponent } from './videoflix/privacy/privacy.component';
import { VideosComponent } from './videoflix/videos/videos.component';
import { LegalNoticeComponent } from './videoflix/legal-notice/legal-notice.component';
import { LoginHelpComponent } from './login-help/login-help.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'login-help', component: LoginHelpComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'legal-notice', component: LegalNoticeComponent },
    { path: 'privacy', component: PrivacyComponent },
    { path: 'videos', component: VideosComponent }
];
