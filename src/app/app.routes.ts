import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthGuard } from './authentication/services/auth.guard';
import { ShoppingCartComponent } from './store/shopping-cart/shopping-cart.component';
import { UserProfileComponent } from './authentication/user-profile/user-profile.component';
import { ProductDetailComponent } from './store/product-details/product-details.component';
import { CallbackComponent } from './authentication/callback/callback.component';
import { LoginRedirectGuard } from './authentication/services/login-guard.service';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'callback', component: CallbackComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'shoppingCart', component: ShoppingCartComponent, canActivate: [AuthGuard] },
  { path: 'userProfile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'productDetails/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' },
];
