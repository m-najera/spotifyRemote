import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL  } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any> {
    return this.http.get(`${API_URL}/profile`);
  }

  getCurrentSong(): Observable<any> {
    return this.http.get(`${API_URL}/profile/listening`);
  }

  getMyPlaylists(): Observable<any> {
    return this.http.get(`${API_URL}/profile/playlists`);
  }
}
