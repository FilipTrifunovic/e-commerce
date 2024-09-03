import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private defaultApiUrl = 'http://localhost:5000/api'; // Default API URL

  constructor(private http: HttpClient) { }

  get<T>(endpoint: string, baseApiUrl?: string): Observable<T> {
    const apiUrl = baseApiUrl || this.defaultApiUrl;
    return this.http.get<T>(`${apiUrl}/${endpoint}`, this.getHttpOptions());
  }

  post<T>(endpoint: string, body: any, baseApiUrl?: string): Observable<T> {
    const apiUrl = baseApiUrl || this.defaultApiUrl;
    return this.http.post<T>(`${apiUrl}/${endpoint}`, body, this.getHttpOptions());
  }

  put<T>(endpoint: string, body: any, baseApiUrl?: string): Observable<T> {
    const apiUrl = baseApiUrl || this.defaultApiUrl;
    return this.http.put<T>(`${apiUrl}/${endpoint}`, body, this.getHttpOptions());
  }

  delete<T>(endpoint: string, baseApiUrl?: string): Observable<T> {
    const apiUrl = baseApiUrl || this.defaultApiUrl;
    return this.http.delete<T>(`${apiUrl}/${endpoint}`, this.getHttpOptions());
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
}
