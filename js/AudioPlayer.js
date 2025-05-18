class AudioPlayer {
  constructor(songState) {
    this.songState = songState;
    this.audio = document.getElementById('audio-player');
    this.playBtn = document.getElementById('detailed-play-btn');
    this.prevBtn = document.getElementById('prev-btn');
    this.nextBtn = document.getElementById('next-btn');
    this.rewindBtn = document.getElementById('rewind-btn');
    this.fastForwardBtn = document.getElementById('fast-forward-btn');
    this.progressBar = document.getElementById('progress-bar');
    this.progressFill = document.getElementById('progress-fill');
    this.progressDot = document.getElementById('progress-dot');
    this.currentTime = document.getElementById('detailed-current-time');
    this.totalTime = document.getElementById('detailed-total-time');
    this.volumeSlider = document.getElementById('volume-slider');
    this.playbackControl = document.getElementById('playback-control');
    this.lyricsBtn = document.getElementById('lyrics-btn');
    this.favouriteBtn = document.getElementById('favourite-btn');
    this.lyricsContainer = document.getElementById('lyrics-container');
    this.currentLyric = document.getElementById('current-lyric');
    this.lyricsBackBtn = document.getElementById('lyrics-back-btn');
    this.lyricsBackground = document.getElementById('lyrics-background');
    this.currentLyrics = [];
    this.currentLyricIndex = -1;
    this.init();
  }
  
  init() {
    // Load persisted state
    this.loadPersistedState();
    
    // Audio controls
    this.playBtn.addEventListener('click', () => this.songState.togglePlay());
    this.prevBtn.addEventListener('click', () => this.playPrevious());
    this.nextBtn.addEventListener('click', () => this.playNext());
    this.rewindBtn.addEventListener('click', () => this.seekBy(-10));
    this.fastForwardBtn.addEventListener('click', () => this.seekBy(10));
    this.playbackControl.addEventListener('click', (e) => {
      e.stopPropagation();
      this.songState.togglePlay();
    });
    this.volumeSlider.addEventListener('input', () => {
      this.audio.volume = parseFloat(this.volumeSlider.value);
      this.saveState();
    });
    this.favouriteBtn.addEventListener('click', () => {
      if (this.songState.state.currentSong.id) {
        this.songState.toggleFavourite(this.songState.state.currentSong.id);
        this.updateFavouriteBtn();
      }
    });
    
    // Navigation
    this.lyricsBtn.addEventListener('click', () => {
      document.getElementById('detailed-player').classList.add('hidden');
      document.getElementById('lyrics-player').classList.add('active');
      this.updateLyrics();
    });
    this.lyricsBackBtn.addEventListener('click', () => {
      document.getElementById('lyrics-player').classList.remove('active');
      document.getElementById('detailed-player').classList.remove('hidden');
    });
    
    // Audio events
    this.audio.addEventListener('timeupdate', () => {
      this.updateProgress();
      this.updateLyrics();
    });
    this.audio.addEventListener('loadedmetadata', () => this.updateTotalTime());
    this.audio.addEventListener('ended', () => this.playNext());
    this.audio.addEventListener('error', () => {
      console.error('Audio error:', this.audio.error);
      this.playNext();
    });
    
    // Seeking
    this.progressBar.addEventListener('click', (e) => this.seekTo(e));
    this.progressDot.addEventListener('mousedown', () => {
      document.addEventListener('mousemove', this.handleDrag.bind(this));
      document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', this.handleDrag.bind(this));
      }, { once: true });
    });
    
    // Subscribe to SongState
    this.songState.subscribe((state) => {
      this.updateUI(state.currentSong);
      if (state.currentSong.isPlaying && this.audio.src !== state.currentSong.mp3_url) {
        this.audio.src = state.currentSong.mp3_url || '';
        this.audio.play().catch((error) => console.error('Playback error:', error));
      } else if (!state.currentSong.isPlaying && !this.audio.paused) {
        this.audio.pause();
      }
      this.currentLyrics = state.currentSong.lyrics.filter(l => l.line && l.timestamp !== "0");
      this.currentLyricIndex = -1;
      this.updateLyrics();
      this.updateFavouriteBtn();
    });
  }
  
  playTrack(songId) {
    const index = this.songState.state.songs.findIndex(s => String(s.id) === String(songId));
    if (index >= 0) {
      this.songState.setSong(songId);
    }
  }
  
  togglePlay() {
    if (this.audio.paused && this.songState.state.currentSong.mp3_url) {
      this.audio.src = this.songState.state.currentSong.mp3_url;
      this.audio.play().catch((error) => console.error('Playback error:', error));
    } else {
      this.audio.pause();
    }
    this.saveState();
  }
  
  playPrevious() {
    const currentIndex = this.songState.state.songs.findIndex(s => String(s.id) === String(this.songState.state.currentSong.id));
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : this.songState.state.songs.length - 1;
    this.playTrack(this.songState.state.songs[prevIndex].id);
  }
  
  playNext() {
    const currentIndex = this.songState.state.songs.findIndex(s => String(s.id) === String(this.songState.state.currentSong.id));
    const nextIndex = currentIndex < this.songState.state.songs.length - 1 ? currentIndex + 1 : 0;
    this.playTrack(this.songState.state.songs[nextIndex].id);
  }
  
  seekBy(seconds) {
    this.audio.currentTime = Math.max(0, Math.min(this.audio.duration, this.audio.currentTime + seconds));
    this.saveState();
  }
  
  seekTo(event) {
    const rect = this.progressBar.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    this.audio.currentTime = percent * this.audio.duration;
    this.saveState();
  }
  
  handleDrag(event) {
    const rect = this.progressBar.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    this.audio.currentTime = percent * this.audio.duration;
    this.updateProgress();
    this.saveState();
  }
  
  updateProgress() {
    if (!this.audio.duration) return;
    const percent = (this.audio.currentTime / this.audio.duration) * 100;
    this.progressFill.style.width = `${percent}%`;
    this.progressBar.setAttribute('aria-valuenow', percent);
    this.currentTime.textContent = this.formatTime(this.audio.currentTime);
    this.songState.state.currentSong.currentTime = this.formatTime(this.audio.currentTime);
    this.notify();
  }
  
  updateTotalTime() {
    const duration = this.formatTime(this.audio.duration);
    this.totalTime.textContent = duration;
    this.songState.state.currentSong.duration = duration;
    this.notify();
  }
  
  updateLyrics() {
    if (!this.currentLyrics.length) {
      this.currentLyric.textContent = 'No lyrics available';
      return;
    }
    
    const currentTime = this.audio.currentTime;
    let newIndex = -1;
    for (let i = 0; i < this.currentLyrics.length; i++) {
      const timestamp = parseFloat(this.currentLyrics[i].timestamp);
      if (currentTime >= timestamp) {
        newIndex = i;
      } else {
        break;
      }
    }
    
    if (newIndex !== this.currentLyricIndex) {
      this.currentLyricIndex = newIndex;
      if (newIndex >= 0) {
        const lyric = this.currentLyrics[newIndex];
        this.currentLyric.textContent = lyric.line;
        this.currentLyric.className = `current-lyric ${lyric.line.startsWith('[') ? 'section' : ''}`;
      } else {
        this.currentLyric.textContent = '';
        this.currentLyric.className = 'current-lyric';
      }
    }
  }
  
  formatTime(seconds) {
    if (isNaN(seconds)) return '00:00';
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  }
  
  updateUI(song) {
    this.playBtn.textContent = song.isPlaying ? '⏸️' : '▶️';
    this.playbackControl.textContent = song.isPlaying ? '⏸' : '▶';
    if (song.id) {
      document.getElementById('detailed-song-title').textContent = song.title;
      document.getElementById('detailed-artist').textContent = song.artist;
      document.getElementById('detailed-album-art').src = song.cover || '/images/placeholder.jpg';
      document.getElementById('playback-title').textContent = song.title;
      document.getElementById('playback-album').textContent = song.album;
      document.getElementById('playback-cover').src = song.thumbnail || '/images/placeholder.jpg';
      document.getElementById('lyrics-background').style.backgroundImage = `url(${song.cover || '/images/placeholder.jpg'})`;
      document.getElementById('playback-overlay').style.display = 'flex';
    }
  }
  
  updateFavouriteBtn() {
    const isFavourited = this.songState.state.favourites.includes(this.songState.state.currentSong.id);
    this.favouriteBtn.classList.toggle('favourited', isFavourited);
  }
  
  saveState() {
    const state = {
      currentSongId: this.songState.state.currentSong.id,
      currentTime: this.audio.currentTime,
      isPlaying: this.songState.state.currentSong.isPlaying,
      volume: this.audio.volume,
      recentlyPlayed: this.songState.state.recentlyPlayed,
      favourites: this.songState.state.favourites
    };
    document.cookie = `playerState=${JSON.stringify(state)};path=/;max-age=${7 * 24 * 60 * 60}`;
  }
  
  loadPersistedState() {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {});
    const state = cookies.playerState ? JSON.parse(cookies.playerState) : {};
    if (state.currentSongId) {
      this.songState.setSong(state.currentSongId);
      this.audio.currentTime = state.currentTime || 0;
      this.audio.volume = state.volume || 1.0;
      this.volumeSlider.value = this.audio.volume;
      this.songState.state.recentlyPlayed = state.recentlyPlayed || [];
      this.songState.state.favourites = state.favourites || ['14'];
      localStorage.setItem('favourites', JSON.stringify(this.songState.state.favourites));
      if (state.isPlaying) {
        this.audio.play().catch(() => console.error('Auto-play failed'));
      }
    }
  }
  
  notify() {
    this.songState.notify();
  }
}