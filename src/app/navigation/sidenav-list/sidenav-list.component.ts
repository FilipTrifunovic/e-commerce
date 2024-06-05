import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  imports: [MatListModule, MatIconModule, RouterModule],
  styleUrls: ['./sidenav-list.component.scss'],
  standalone: true,
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onClose() {
    this.closeSidenav.emit();
  }

  logout() {
    this.authService.signOut();
  }

}
