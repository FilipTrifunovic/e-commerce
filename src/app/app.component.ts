import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './navigation/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ChatDialogComponent } from './shared/components/chat-dialog/chat-dialog.component';
import { ProductService } from './shared/services/product.service';
import { AuthService } from './authentication/services/auth.service';
import { ShoppingCartService } from './shared/services/shopping-cart.service';
import { ShoppingCartComponent } from './store/shopping-cart/shopping-cart.component';
import { UserService } from './authentication/services/user-profile.service';
import { UserProfileComponent } from './authentication/user-profile/user-profile.component';
import { ChatService } from './shared/services/chat.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRedirectGuard } from './authentication/services/login-guard.service';
import { AuthGuard } from './authentication/services/auth.guard';
import { CallbackComponent } from './authentication/callback/callback.component';
import { ApiService } from './shared/services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    SidenavListComponent,
    HeaderComponent,
    MatIconModule,
    MatButtonModule,
    ChatDialogComponent,
    ShoppingCartComponent,
    RouterModule,
    UserProfileComponent,
    HttpClientModule,
    CallbackComponent],
  providers: [
    ProductService,
    ShoppingCartService,
    UserService,
    ChatService,
    LoginRedirectGuard,
    AuthGuard,
    ApiService]
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  title = 'e-commerce';
  private dialogRef: MatDialogRef<ChatDialogComponent>;
  searchResults: any;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private dialog: MatDialog,
    public authService: AuthService,
    private viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
    this.authService.configureOAuth();
    this.isAuthenticated$ = this.authService.isAuthenticated();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  openChatDialog(): void {
    this.dialogRef = this.dialog.open(ChatDialogComponent, {
      width: '400px',
      height: '500px',
      position: { right: '10px', bottom: '10px' },
      panelClass: 'custom-dialog-container',
      backdropClass: 'transparent-backdrop',
      viewContainerRef: this.viewContainerRef
    });

    this.dialogRef.afterClosed().subscribe(() => {
      const dialogContainer = document.querySelector('.custom-dialog-container');
      if (dialogContainer) {
        dialogContainer.classList.add('slide-out');
        setTimeout(() => this.dialogRef.close(), 300); // wait for animation to finish
      }
    });
  }

  handleSearch(searchCriteria: any) {
    // Simulate a search operation
    this.searchResults = searchCriteria;
  }
}


// rasa run -m models --enable-api --cors “*” --endpoints endpoints.yml --debug
// rasa run actions --port 5055

