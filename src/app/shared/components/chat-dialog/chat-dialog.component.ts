import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ChatService } from '../../services/chat.service';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: [`./chat-dialog.component.scss`],
  imports: [MatToolbarModule, MatIconModule, MatFormFieldModule, CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatInputModule],
  standalone: true
})
export class ChatDialogComponent {
  message: string;
  messages: { text: string, sender: 'user' | 'bot' }[] = [];

  constructor(
    private chatService: ChatService,
    private shopingCartService: ShoppingCartService
  ) {

  }

  sendMessage(): void {
    if (this.message) {
      this.messages.push({ text: this.message, sender: 'user' });
      this.chatService.sendMessage(this.message).subscribe(response => {
        this.addToCart(response);
        response.forEach((msg: any) => this.messages.push({ text: msg.text, sender: 'bot' }));
      });
      this.message = '';
    }
  }

  addToCart(response: any): void {
    if (response.length > 1 && response[1].custom.action === 'add_to_cart') {
      var productId = response[1].custom.product_id;
      this.shopingCartService.addProduct(productId, 1);
    }
  }


  closeDialog(): void {
  }

}
