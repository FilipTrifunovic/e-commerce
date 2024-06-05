import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './navigation/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ChatDialogComponent } from './shared/components/chat-dialog/chat-dialog.component';
import { SearchToolbarComponent } from './shared/components/search-toolbar/search-toolbar.component';
import { ProductService } from './shared/services/product.sevice';
import { AuthService } from './authentication/auth.service';
import { ShoppingCartService } from './shared/services/shopping-cart.service';
import { ShoppingCartComponent } from './store/shopping-cart/shopping-cart.component';
import { UserService } from './authentication/user-profile.service';
import { UserProfileComponent } from './authentication/user-profile/user-profile.component';
import { ChatService } from './shared/services/chat.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    SidenavListComponent,
    HeaderComponent,
    MatIconModule,
    MatButtonModule,
    ChatDialogComponent,
    SearchToolbarComponent,
    ShoppingCartComponent,
    RouterModule,
    UserProfileComponent,
    HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    ProductService,
    ShoppingCartService,
    AuthService,
    UserService,
    ChatService]
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;
  title = 'e-commerce';
  private dialogRef: MatDialogRef<ChatDialogComponent>;
  searchResults: any;

  constructor(
    private dialog: MatDialog,
    public authService: AuthService,
    private http: HttpClient) { }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  openChatDialog(): void {
    this.dialogRef = this.dialog.open(ChatDialogComponent, {
      width: '400px',
      height: '500px',
      position: { right: '10px', bottom: '10px' },
      panelClass: 'custom-dialog-container',
      backdropClass: 'transparent-backdrop'
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
