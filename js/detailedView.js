// js/detailedView.js
export class DetailedView {
  constructor(songState) {
    this.songState = songState;
    this.detailedPlayer = document.getElementById('detailed-player');
    this.toggleBtn = document.getElementById('detailed-toggle-btn');
    this.albumArt = document.getElementById('detailed-album-art');
    this.songTitle = document.getElementById('detailed-song-title');
    this.artist = document.getElementById('detailed-artist');
    this.playBtn = document.getElementById('detailed-play-btn');
    this.favouriteBtn = document.getElementById('favourite-btn');
    this.lyricsBtn = document.getElementById('lyrics-btn');
    this.queueBtn = document.getElementById('queue-btn');
    this.shuffleBtn = document.getElementById('shuffle-btn');
    this.rewindBtn = document.getElementById('rewind-btn');
    this.prevBtn = document.getElementById('prev-btn');
    this.nextBtn = document.getElementById('next-btn');
    this.forwardBtn = document.getElementById('forward-btn');
    this.repeatBtn = document.getElementById('repeat-btn');
    this.themeBtn = document.querySelector('#detailed-player .bottom-controls:not([id])');
    this.detailsBtn = document.querySelectorAll('#detailed-player .bottom-controls:not([id])')[1];
    this.progressBar = document.querySelector('#detailed-player .progress-bar');
    this.progressDot = document.querySelector('#detailed-player .progress-dot');
    this.currentTime = document.getElementById('detailed-current-time');
    this.totalTime = document.getElementById('detailed-total-time');
  }
  
  init() {
    if (!this.detailedPlayer) {
      console.error('detailed-player element not found');
      return;
    }
    this.render();
    this.bindEvents();
    this.songState.subscribe(state => this.render(state));
  }
  
  render(state = this.songState.getState()) {
    try {
      const { currentSong, albums, favourites, shuffle, repeat } = state;
      this.albumArt.src = currentSong.thumbnail || currentSong.cover || 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png'; // Revert to song thumbnail
      this.songTitle.textContent = currentSong.title || 'Select a track';
      this.artist.textContent = currentSong.artist || 'Frith Hilton';
      this.currentTime.textContent = currentSong.currentTime || '0:00';
      this.totalTime.textContent = currentSong.duration || '0:00';
      if (this.progressBar) {
        this.progressBar.style.width = `${currentSong.progress || 0}%`;
      }
      if (this.playBtn) {
        this.playBtn.textContent = currentSong.isPlaying ? '⏸️' : '▶️';
      }
      if (this.favouriteBtn) {
        this.favouriteBtn.textContent = favourites.includes(currentSong.id) ? '❤️' : '🤍';
      }
      if (this.shuffleBtn) {
        this.shuffleBtn.style.opacity = shuffle ? '1' : '0.5';
      }
      if (this.repeatBtn) {
        this.repeatBtn.textContent = repeat === 'one' ? '🔂' : '🔁';
        this.repeatBtn.style.opacity = repeat !== 'off' ? '1' : '0.5';
      }
    } catch (error) {
      console.error('Error in DetailedView.render:', error);
    }
  }
  
  bindEvents() {
    try {
      if (this.toggleBtn) {
        this.toggleBtn.addEventListener('click', () => {
          console.log('Toggle to previous allowed view clicked');
          this.songState.popView();
        });
      }
      
      if (this.playBtn) {
        this.playBtn.addEventListener('click', () => {
          this.songState.togglePlay();
        });
      }
      
      if (this.favouriteBtn) {
        this.favouriteBtn.addEventListener('click', () => {
          const { currentSong } = this.songState.getState();
          if (currentSong.id) {
            this.songState.toggleFavourite(currentSong.id);
          }
        });
      }
      
      if (this.lyricsBtn) {
        this.lyricsBtn.addEventListener('click', () => {
          this.songState.pushView('lyrics-player');
        });
      }
      
      if (this.queueBtn) {
        this.queueBtn.addEventListener('click', () => {
          this.songState.pushView('queue-player');
        });
      }
      
      if (this.shuffleBtn) {
        this.shuffleBtn.addEventListener('click', () => {
          this.songState.toggleShuffle();
        });
      }
      
      if (this.rewindBtn) {
        this.rewindBtn.addEventListener('click', () => {
          this.songState.seek(-10);
        });
      }
      
      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', () => {
          this.songState.playPrevious();
        });
      }
      
      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => {
          this.songState.playNext();
        });
      }
      
      if (this.forwardBtn) {
        this.forwardBtn.addEventListener('click', () => {
          this.songState.seek(10);
        });
      }
      
      if (this.repeatBtn) {
        this.repeatBtn.addEventListener('click', () => {
          this.songState.toggleRepeat();
        });
      }
      
      if (this.themeBtn) {
        this.themeBtn.addEventListener('click', () => {
          console.log('Theme toggle clicked (unimplemented)');
          document.body.classList.toggle('light-theme');
        });
      }
      
      if (this.detailsBtn) {
        this.detailsBtn.addEventListener('click', () => {
          console.log('View details clicked (unimplemented)');
          alert('Track details view not implemented');
        });
      }
      
      if (this.progressBar && this.progressDot) {
        const progressContainer = this.progressBar.parentElement;
        progressContainer.addEventListener('click', (e) => {
          const rect = progressContainer.getBoundingClientRect();
          const percentage = (e.clientX - rect.left) / rect.width;
          this.songState.seekTo(percentage);
        });
      }
    } catch (error) {
      console.error('Error in DetailedView.bindEvents:', error);
    }
  }
  
  show() {
    this.detailedPlayer.classList.add('active');
    document.getElementById('playback-overlay').style.display = 'none';
  }
  
  hide() {
    this.detailedPlayer.classList.remove('active');
  }
}