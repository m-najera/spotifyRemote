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

  play(): Observable<any> {
    return this.http.put(`${API_URL}/profile/listening/play`, null);
  }

  pause(): Observable<any> {
    return this.http.put(`${API_URL}/profile/listening/pause`, null);
  }

  next(): Observable<any>{
    return this.http.post(`${API_URL}/profile/listening/forwards`, null);
  }

  previous(): Observable<any>{
    return this.http.post(`${API_URL}/profile/listening/backwards`, null);
  }

  getMyPlaylists(): Observable<any> {
    return this.http.get(`${API_URL}/profile/playlists`);
  }

  getPlaylistInfo(id: string): Observable<any>{
    return this.http.get(`${API_URL}/profile/playlists/${id}`);
  }

  getPlaylistTracks(id: string): Observable<any>{
    return this.http.get(`${API_URL}/profile/playlist/${id}/tracks`);
  }

  addPlaylist(name: string): Observable<any>{
    return this.http.post(`${API_URL}/profile/playlist/${name}`, name);
  }
}
