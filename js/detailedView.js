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
    this.lyricsBtn = document.getElementById('lyrics-btn');
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
    this.progressBar.style.width = '0%';
  }
  
  bindEvents() {
    this.detailedPlayBtn.addEventListener('click', () => this.songState.togglePlay());
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