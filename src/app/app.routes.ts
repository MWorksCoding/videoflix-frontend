import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './videoflix/home/home.component';
import { PrivacyComponent } from './videoflix/privacy/privacy.component';
import { UserSettingsComponent } from './videoflix/user-settings/user-settings.component';
import { LegalNoticeComponent } from './videoflix/legal-notice/legal-notice.component';
import { LoginHelpComponent } from './login-help/login-help.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'login-help', component: LoginHelpComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'logout', component: LogoutComponent },
    {
        path: 'videoflix', component: HomeComponent,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'legal-notice',
                component: LegalNoticeComponent
            },
            {
                path: 'privacy',
                component: PrivacyComponent
            },
            {
                path: 'user-settings',
                component: UserSettingsComponent
            }
        ]
    },
];
