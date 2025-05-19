// detailedView.js
export class DetailedView {
  constructor(songState) {
    this.songState = songState;
    this.detailedPlayer = document.getElementById('detailed-player');
    this.backBtn = document.getElementById('back-btn');
    this.detailedAlbumArt = document.getElementById('detailed-album-art');
    this.detailedSongTitle = document.getElementById('detailed-song-title');
    this.detailedArtist = document.getElementById('detailed-artist');
    this.detailedPlayBtn = document.getElementById('detailed-play-btn');
    this.detailedCurrentTime = document.getElementById('detailed-current-time');
    this.detailedTotalTime = document.getElementById('detailed-total-time');
    this.progressBar = this.detailedPlayer.querySelector('.progress-bar');
    this.progressContainer = this.detailedPlayer.querySelector('.progress');
    this.lyricsBtn = document.getElementById('lyrics-btn');
    this.shuffleBtn = document.getElementById('shuffle-btn');
    this.repeatBtn = document.getElementById('repeat-btn');
    this.prevBtn = this.detailedPlayer.querySelector('.control-btn[innerText="⏮️"]');
    this.nextBtn = this.detailedPlayer.querySelector('.control-btn[innerText="⏭️"]');
    this.rewindBtn = this.detailedPlayer.querySelector('.control-btn[innerText="⏪"]');
    this.forwardBtn = this.detailedPlayer.querySelector('.control-btn[innerText="⏩"]');
  }
  
  init(applyGradient) {
    if (!this.backBtn || !this.lyricsBtn || !this.shuffleBtn || !this.repeatBtn) {
      console.error('Button not found in DOM');
    }
    this.updateUI(this.songState.getState());
    this.songState.subscribe(state => this.updateUI(state));
    this.bindEvents();
    this.detailedAlbumArt.addEventListener('load', () => {
      console.log(`Album art loaded: ${this.detailedAlbumArt.src}`);
      applyGradient(this.detailedAlbumArt);
    });
    this.detailedAlbumArt.addEventListener('error', () => {
      console.error(`Failed to load album art: ${this.detailedAlbumArt.src}`);
      const fallback = '/images/placeholder.jpg';
      if (this.detailedAlbumArt.src !== fallback) {
        this.detailedAlbumArt.src = fallback;
      } else {
        document.body.style.background = 'linear-gradient(to bottom, #d4a5d9, #6b48ff)';
      }
    });
  }
  
  updateUI(state) {
    const song = state.currentSong;
    this.detailedSongTitle.textContent = song.title;
    this.detailedArtist.textContent = song.artist;
    const coverUrl = song.cover && typeof song.cover === 'string' && song.cover.startsWith('http') ?
      song.cover : '/images/placeholder.jpg';
    if (this.detailedAlbumArt.src !== coverUrl) {
      console.log(`Setting album art to: ${coverUrl}`);
      this.detailedAlbumArt.src = coverUrl;
    }
    this.detailedTotalTime.textContent = song.duration;
    this.detailedCurrentTime.textContent = song.currentTime;
    this.detailedPlayBtn.textContent = song.isPlaying ? '⏸' : '▶️';
    this.progressBar.style.width = `${song.progress || 0}%`;
    this.shuffleBtn.classList.toggle('active', state.shuffle);
    this.repeatBtn.textContent = state.repeat === 'one' ? '🔂' : '🔁';
    this.repeatBtn.classList.toggle('active', state.repeat !== 'off');
  }
  
  bindEvents() {
    const buttons = [this.detailedPlayBtn, this.prevBtn, this.nextBtn, this.rewindBtn, this.forwardBtn, this.backBtn, this.lyricsBtn, this.shuffleBtn, this.repeatBtn];
    buttons.forEach(btn => {
      if (btn && btn._handler) {
        btn.removeEventListener('click', btn._handler);
        btn._handler = null;
      }
    });
    
    if (this.detailedPlayBtn) {
      this.detailedPlayBtn._handler = () => {
        console.log('Play button clicked');
        this.songState.togglePlay();
      };
      this.detailedPlayBtn.addEventListener('click', this.detailedPlayBtn._handler);
    }
    
    if (this.prevBtn) {
      this.prevBtn._handler = () => {
        console.log('Previous button clicked');
        this.songState.playPrevious();
      };
      this.prevBtn.addEventListener('click', this.prevBtn._handler);
    }
    
    if (this.nextBtn) {
      this.nextBtn._handler = () => {
        console.log('Next button clicked');
        this.songState.playNext();
      };
      this.nextBtn.addEventListener('click', this.nextBtn._handler);
    }
    
    if (this.rewindBtn) {
      this.rewindBtn._handler = () => {
        console.log('Rewind button clicked');
        this.songState.seek(-10);
      };
      this.rewindBtn.addEventListener('click', this.rewindBtn._handler);
    }
    
    if (this.forwardBtn) {
      this.forwardBtn._handler = () => {
        console.log('Forward button clicked');
        this.songState.seek(10);
      };
      this.forwardBtn.addEventListener('click', this.forwardBtn._handler);
    }
    
    if (this.progressContainer) {
      this.progressContainer._handler = (e) => {
        if (e.target === this.progressContainer || e.target === this.progressBar) {
          console.log('Progress bar clicked');
          e.stopPropagation();
          const rect = this.progressContainer.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const width = rect.width;
          const percentage = clickX / width;
          this.songState.seekTo(percentage);
        }
      };
      this.progressContainer.addEventListener('click', this.progressContainer._handler);
    }
    
    if (this.backBtn) {
      this.backBtn._handler = (e) => {
        console.log('Back button clicked');
        e.stopPropagation();
        e.preventDefault();
        this.detailedPlayer.classList.remove('active');
        document.getElementById('tracklist-view').classList.remove('hidden');
        document.getElementById('playback-overlay').style.display = 'flex';
        document.body.style.background = 'linear-gradient(to bottom, #1e1e2f, #2a2a4a)';
      };
      this.backBtn.addEventListener('click', this.backBtn._handler);
    }
    
    if (this.lyricsBtn) {
      this.lyricsBtn._handler = (e) => {
        console.log('Lyrics button clicked');
        e.stopPropagation();
        e.preventDefault();
        this.detailedPlayer.classList.remove('active');
        document.getElementById('lyrics-player').classList.add('active');
        window.scrollTo(0, 0);
      };
      this.lyricsBtn.addEventListener('click', this.lyricsBtn._handler);
    }
    
    if (this.shuffleBtn) {
      this.shuffleBtn._handler = () => {
        console.log('Shuffle button clicked');
        this.songState.toggleShuffle();
      };
      this.shuffleBtn.addEventListener('click', this.shuffleBtn._handler);
    }
    
    if (this.repeatBtn) {
      this.repeatBtn._handler = () => {
        console.log('Repeat button clicked');
        this.songState.toggleRepeat();
      };
      this.repeatBtn.addEventListener('click', this.repeatBtn._handler);
    }
  }
  
  show() {
    this.detailedPlayer.classList.add('active');
    this.bindEvents();
  }
  
  hide() {
    this.detailedPlayer.classList.remove('active');
  }
}