import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {
  profile: any;
  profile$: any;
  currentSong$: any;
  currentSong: any;
  isPlaying: boolean;
  loading = false;
  isPaused: boolean;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.loading = true;
    // window.setInterval(() => {
    //   this.checkCurrentSong();
    // }, 3000);
  }

  ionViewWillEnter() {
    this.getProfile();
    this.getCurrentSong();
  }

  getProfile() {
    this.profile$ = this.profileService.getProfile()
      .subscribe((data) => {
        return this.profile = data;
      },
        (err) => {
          console.error(err);
        });
  }

  checkCurrentSong() {
    this.profileService.getCurrentSong()
      .subscribe((data) => {
        if (data.item.id !== this.currentSong.item.id) {
          return this.currentSong = data;
        }
      }, (err) => {
        console.error(err);
      });
  }

  getCurrentSong() {
    this.currentSong$ = this.profileService.getCurrentSong()
      .subscribe((data) => {
        this.loading = false;
        if (!data) {
          this.isPlaying = true;
          this.isPaused = false;
        } else {
          if (!data.is_playing) {
            this.isPaused = true;
            this.isPlaying = false;
          } else {
            this.isPlaying = true;
            this.isPaused = false;
          }
          return this.currentSong = data;
        }
      }, (err) => {
        this.loading = false;
        console.error(err);
      });
  }

  playPause() {
    if (this.isPlaying) {
      this.profileService.pause()
        .subscribe(() => {
          this.isPlaying = false;
          this.isPaused = true;
        },
          (err) => {
            console.error(err);
          });
    } else {
      this.profileService.play()
        .subscribe(() => {
          this.isPlaying = true;
          this.isPaused = false;
        },
          (err) => {
            console.error(err);
          });
    }
  }

  skipBack() {
    this.profileService.previous()
      .subscribe(() => {
        this.getCurrentSong();
      },
        (error) => console.error(error)
      );
  }

  skipForward() {
    this.profileService.next()
      .subscribe(() => {
        this.getCurrentSong();
      },
        (error) => console.error(error)
      );
  }
}
