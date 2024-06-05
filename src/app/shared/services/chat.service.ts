import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private rasaUrl = '/api/webhooks/rest/webhook';

  constructor(private http: HttpClient) { }

  sendMessage(message: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    //headers.append('Access-Control-Allow-Origin', 'http://localhost:5005');
    const body = { sender: 'user', message: message };
    return this.http.post(this.rasaUrl, body, { headers: headers });
  }
}
