import { Routes } from '@angular/router';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { NewPaymentComponent } from './pages/new-payment/new-payment.component';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { SplashComponent } from './pages/splash/splash.component';
import { StatementsComponent } from './pages/statements/statements.component';

export const routes: Routes = [
  {
    path: '',
    component: SplashComponent,
  },
  {
    path: 'onboarding',
    component: OnboardingComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomepageComponent,
  },
  {
    path: 'statements',
    component: StatementsComponent,
  },
  {
    path: 'newPayment',
    component: NewPaymentComponent,
  },
  {
    path: 'confirmation',
    component: ConfirmationComponent,
  },
];
