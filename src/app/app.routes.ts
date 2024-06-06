import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthGuard } from './authentication/auth-guard.service';
import { ShoppingCartComponent } from './store/shopping-cart/shopping-cart.component';
import { UserProfileComponent } from './authentication/user-profile/user-profile.component';
import { ProductDetailComponent } from './store/product-details/product-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'shoppingCart', component: ShoppingCartComponent, canActivate: [AuthGuard] },
  { path: 'userProfile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'productDetails/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' }
];
