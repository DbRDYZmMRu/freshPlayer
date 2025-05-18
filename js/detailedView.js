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
    this.prevBtn = this.detailedPlayer.querySelector('.control-btn[innerText="⏮️"]');
    this.nextBtn = this.detailedPlayer.querySelector('.control-btn[innerText="⏭️"]');
    this.rewindBtn = this.detailedPlayer.querySelector('.control-btn[innerText="⏪"]');
    this.forwardBtn = this.detailedPlayer.querySelector('.control-btn[innerText="⏩"]');
  }
  
  init(applyGradient) {
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
      song.cover :
      '/images/placeholder.jpg';
    if (this.detailedAlbumArt.src !== coverUrl) {
      console.log(`Setting album art to: ${coverUrl}`);
      this.detailedAlbumArt.src = coverUrl;
    }
    this.detailedTotalTime.textContent = song.duration;
    this.detailedCurrentTime.textContent = song.currentTime;
    this.detailedPlayBtn.textContent = song.isPlaying ? '⏸' : '▶';
    this.progressBar.style.width = `${song.progress || 0}%`;
  }
  
  bindEvents() {
    this.detailedPlayBtn.addEventListener('click', () => this.songState.togglePlay());
    this.prevBtn.addEventListener('click', () => this.songState.playPrevious());
    this.nextBtn.addEventListener('click', () => this.songState.playNext());
    this.rewindBtn.addEventListener('click', () => this.songState.seek(-10));
    this.forwardBtn.addEventListener('click', () => this.songState.seek(10));
    this.progressContainer.addEventListener('click', (e) => {
      const rect = this.progressContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const percentage = clickX / width;
      this.songState.seekTo(percentage);
    });
    this.backBtn.addEventListener('click', () => {
      this.detailedPlayer.classList.remove('active');
      document.getElementById('tracklist-view').classList.remove('hidden');
      document.getElementById('playback-overlay').style.display = 'flex';
      document.body.style.background = 'linear-gradient(to bottom, #1e1e2f, #2a2a4a)';
    });
  }
  
  show() {
    this.detailedPlayer.classList.add('active');
  }
  
  hide() {
    this.detailedPlayer.classList.remove('active');
  }
}