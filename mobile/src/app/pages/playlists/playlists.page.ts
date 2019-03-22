import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-playlists',
  templateUrl: 'playlists.page.html',
  styleUrls: ['playlists.page.scss']
})
export class PlaylistsPage implements OnInit {
  playlists: any;
  loading = true;
  playlists$: any;
  searchTerm: string;
  playlistsTem: any;
  constructor(private profileService: ProfileService, private _alertController: AlertController) { }

  ngOnInit() {
    this.loading = true;
    this.getPlaylists();
  }

  getPlaylists() {
    this.playlists$ = this.profileService.getMyPlaylists()
      .subscribe((data) => {
        this.playlists = data;
        this.playlistsTem = Object.assign(this.playlists);
        this.loading = false;
        if (this.searchTerm) {
          this.filterPlaylists();
        }
      },
        (err) => {
          this.loading = false;
        });
  }

  filterPlaylists() {
    if (this.searchTerm) {
      this.playlists = this.playlists.filter(x => x.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
    } else {
      this.playlists = this.playlistsTem;
    }
  }

  async newPlaylistPrompt() {
    const alert = await this._alertController.create({
      header: 'Create a playlist',
      inputs: [
        {
          name: 'playlistName',
          type: 'text',
          placeholder: 'Playlist'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Add',
          handler:  data => {
            this.addPlaylist(data.playlistName);
          }
        }
      ]
    });

    await alert.present();
  }
  addPlaylist(name) {
    this.profileService.addPlaylist(name).subscribe(() => {
      this.getPlaylists();
    });
  }

}

