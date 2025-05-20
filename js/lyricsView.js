// js/lyricsView.js
export class LyricsView {
  constructor(songState, app) {
    this.songState = songState;
    this.app = app;
    this.lyricsPlayer = document.getElementById('lyrics-player');
    this.lyricsBackground = document.getElementById('lyrics-background');
    this.lyricsSongTitle = document.getElementById('lyrics-song-title');
    this.lyricsArtist = document.getElementById('lyrics-artist');
    this.lyricsContainer = document.getElementById('lyrics-container');
    this.lyricsToggleBtn = document.getElementById('lyrics-toggle-btn');
    this.lyricsProgress = this.lyricsPlayer?.querySelector('.lyrics-progress .progress');
    this.lyricsProgressBar = this.lyricsPlayer?.querySelector('.lyrics-progress .progress-bar');
    this.lyricsCurrentTime = document.getElementById('lyrics-current-time');
    this.lyricsTotalTime = document.getElementById('lyrics-total-time');
    this.lyricsPlayBtn = document.getElementById('lyrics-play-btn');
    this.lyricsShuffleBtn = document.getElementById('lyrics-shuffle-btn');
    this.lyricsRepeatBtn = document.getElementById('lyrics-repeat-btn');
    this.lyricsPrevBtn = document.getElementById('lyrics-prev-btn');
    this.lyricsNextBtn = document.getElementById('lyrics-next-btn');
    this.lyricsRewindBtn = document.getElementById('lyrics-rewind-btn');
    this.lyricsForwardBtn = document.getElementById('lyrics-forward-btn');
    this.debounceTimeout = null;
    this.isStaticLyrics = false;
  }
  
  init(applyGradient) {
    if (!this.lyricsPlayer) {
      console.error('lyrics-player element not found');
      return;
    }
    console.log('LyricsView.init, lyricsToggleBtn:', !!this.lyricsToggleBtn, 'app:', !!this.app);
    if (!this.lyricsToggleBtn) {
      console.error('lyrics-toggle-btn element not found in DOM');
    }
    if (!this.app) {
      console.error('App instance not provided to LyricsView');
    }
    this.updateUI(this.songState.getState());
    this.songState.subscribe(state => this.updateUI(state));
    this.bindEvents();
    const state = this.songState.getState();
    const tempImg = new Image();
    tempImg.crossOrigin = 'anonymous';
    tempImg.src = state.currentSong.thumbnail || state.currentSong.cover || 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png';
    tempImg.addEventListener('load', () => applyGradient(tempImg));
    tempImg.addEventListener('error', () => {
      console.error('Failed to load image for gradient');
      document.body.style.background = 'linear-gradient(to bottom, #d4a5d9, #6b48ff)';
    });
    this.songState.audio.addEventListener('timeupdate', () => {
      if (!this.isStaticLyrics) this.syncLyrics();
      this.updateProgress();
    });
  }
  
  updateUI(state) {
    try {
      const song = state.currentSong;
      this.lyricsSongTitle.textContent = song.title || 'Select a track';
      this.lyricsArtist.textContent = song.artist || 'Frith Hilton';
      this.lyricsBackground.style.backgroundImage = `url(${song.thumbnail || song.cover || 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png'})`;
      this.lyricsContainer.innerHTML = '';
      
      const validLyrics = song.lyrics?.filter(({ line }) => line.trim() !== '') || [];
      this.isStaticLyrics = validLyrics.length > 0 && validLyrics.every(({ timestamp }) => timestamp === '0');
      
      if (validLyrics.length > 0) {
        validLyrics.forEach(({ line, timestamp }) => {
          if (line.trim() !== '') {
            const p = document.createElement('p');
            p.textContent = line;
            if (!this.isStaticLyrics) {
              p.dataset.timestamp = parseFloat(timestamp);
              p.classList.add('lyric-line');
              if (line.startsWith('[') && line.endsWith(']')) {
                p.classList.add('section');
              }
            } else {
              p.classList.add('static-lyric');
            }
            this.lyricsContainer.appendChild(p);
          }
        });
      } else {
        const p = document.createElement('p');
        p.textContent = 'Lyrics not available';
        this.lyricsContainer.appendChild(p);
      }
      
      this.lyricsCurrentTime.textContent = song.currentTime || '00:00';
      this.lyricsTotalTime.textContent = song.duration || '00:00';
      if (this.lyricsProgressBar) {
        this.lyricsProgressBar.style.width = `${song.progress || 0}%`;
      }
      if (this.lyricsPlayBtn) {
        this.lyricsPlayBtn.textContent = song.isPlaying ? '⏸' : '▶️';
      }
      if (this.lyricsShuffleBtn) {
        this.lyricsShuffleBtn.classList.toggle('active', state.shuffle);
      }
      if (this.lyricsRepeatBtn) {
        this.lyricsRepeatBtn.textContent = state.repeat === 'one' ? '🔂' : '🔁';
        this.lyricsRepeatBtn.classList.toggle('active', state.repeat !== 'off');
      }
    } catch (error) {
      console.error('Error in LyricsView.updateUI:', error);
    }
  }
  
  syncLyrics() {
    if (this.debounceTimeout || this.isStaticLyrics) return;
    this.debounceTimeout = setTimeout(() => {
      const currentTime = this.songState.audio.currentTime;
      const lyrics = this.songState.getState().currentSong.lyrics?.filter(
        ({ line, timestamp }) => line.trim() !== '' && timestamp !== '0'
      ) || [];
      
      let currentLine = null;
      for (let i = 0; i < lyrics.length; i++) {
        const currentTimestamp = parseFloat(lyrics[i].timestamp);
        const nextTimestamp = i < lyrics.length - 1 ? parseFloat(lyrics[i + 1].timestamp) : Infinity;
        if (currentTime >= currentTimestamp && currentTime < nextTimestamp) {
          currentLine = lyrics[i];
          break;
        }
      }
      
      const lyricElements = this.lyricsContainer.querySelectorAll('.lyric-line');
      lyricElements.forEach(line => {
        line.classList.remove('active');
        if (currentLine && parseFloat(line.dataset.timestamp) === parseFloat(currentLine.timestamp)) {
          line.classList.add('active');
          this.scrollToLyric(line);
        }
      });
      
      if (!currentLine && lyrics.length > 0) {
        const firstTimestamp = parseFloat(lyrics[0].timestamp);
        const lastTimestamp = parseFloat(lyrics[lyrics.length - 1].timestamp);
        if (currentTime < firstTimestamp || currentTime >= lastTimestamp + 5) {
          lyricElements.forEach(line => line.classList.remove('active'));
        }
      }
      
      this.debounceTimeout = null;
    }, 100);
  }
  
  scrollToLyric(line) {
    const container = this.lyricsContainer;
    const containerHeight = container.clientHeight;
    const lineHeight = line.offsetHeight;
    const lineTop = line.offsetTop;
    const scrollPosition = lineTop - (containerHeight / 2) + (lineHeight / 2);
    
    container.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  }
  
  updateProgress() {
    try {
      const state = this.songState.getState();
      this.lyricsCurrentTime.textContent = state.currentSong.currentTime || '00:00';
      this.lyricsTotalTime.textContent = state.currentSong.duration || '00:00';
      if (this.lyricsProgressBar) {
        this.lyricsProgressBar.style.width = `${state.currentSong.progress || 0}%`;
      }
    } catch (error) {
      console.error('Error in LyricsView.updateProgress:', error);
    }
  }
  
  bindEvents() {
    try {
      const buttons = [
        this.lyricsPlayBtn,
        this.lyricsShuffleBtn,
        this.lyricsRepeatBtn,
        this.lyricsPrevBtn,
        this.lyricsNextBtn,
        this.lyricsRewindBtn,
        this.lyricsForwardBtn,
        this.lyricsToggleBtn
      ];
      buttons.forEach(btn => {
        if (btn && btn._handler) {
          btn.removeEventListener('click', btn._handler);
          btn._handler = null;
        }
      });
      
      if (this.lyricsProgress) {
        this.lyricsProgress._handler = (e) => {
          console.log('Lyrics progress bar clicked');
          e.stopPropagation();
          const rect = this.lyricsProgress.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const width = rect.width;
          const percentage = clickX / width;
          this.songState.seekTo(percentage);
        };
        this.lyricsProgress.addEventListener('click', this.lyricsProgress._handler);
      }
      
      if (this.lyricsPlayBtn) {
        this.lyricsPlayBtn._handler = () => {
          console.log('Lyrics play button clicked, current view:', this.app?.currentView);
          this.songState.togglePlay();
        };
        this.lyricsPlayBtn.addEventListener('click', this.lyricsPlayBtn._handler);
      }
      
      if (this.lyricsShuffleBtn) {
        this.lyricsShuffleBtn._handler = () => {
          console.log('Shuffle button clicked');
          this.songState.toggleShuffle();
        };
        this.lyricsShuffleBtn.addEventListener('click', this.lyricsShuffleBtn._handler);
      }
      
      if (this.lyricsRepeatBtn) {
        this.lyricsRepeatBtn._handler = () => {
          console.log('Repeat button clicked');
          this.songState.toggleRepeat();
        };
        this.lyricsRepeatBtn.addEventListener('click', this.lyricsRepeatBtn._handler);
      }
      
      if (this.lyricsPrevBtn) {
        this.lyricsPrevBtn._handler = () => {
          console.log('Previous button clicked');
          this.songState.playPrevious();
        };
        this.lyricsPrevBtn.addEventListener('click', this.lyricsPrevBtn._handler);
      }
      
      if (this.lyricsNextBtn) {
        this.lyricsNextBtn._handler = () => {
          console.log('Next button clicked');
          this.songState.playNext();
        };
        this.lyricsNextBtn.addEventListener('click', this.lyricsNextBtn._handler);
      }
      
      if (this.lyricsRewindBtn) {
        this.lyricsRewindBtn._handler = () => {
          console.log('Rewind button clicked');
          this.songState.seek(-10);
        };
        this.lyricsRewindBtn.addEventListener('click', this.lyricsRewindBtn._handler);
      }
      
      if (this.lyricsForwardBtn) {
        this.lyricsForwardBtn._handler = () => {
          console.log('Forward button clicked');
          this.songState.seek(10);
        };
        this.lyricsForwardBtn.addEventListener('click', this.lyricsForwardBtn._handler);
      }
      
      if (this.lyricsToggleBtn) {
        this.lyricsToggleBtn._handler = () => {
          console.log('Lyrics toggle button (🎵) clicked, current view:', this.app?.currentView);
          if (this.app) {
            this.app.showOverlayView('detailed-player');
          } else {
            console.warn('App instance not available, falling back to DOM navigation');
            document.getElementById('lyrics-player').classList.remove('active');
            document.getElementById('detailed-player').classList.add('active');
            document.getElementById('playback-overlay').style.display = 'none';
          }
        };
        this.lyricsToggleBtn.addEventListener('click', this.lyricsToggleBtn._handler);
      } else {
        console.error('lyrics-toggle-btn not found, cannot bind event');
      }
    } catch (error) {
      console.error('Error in LyricsView.bindEvents:', error);
    }
  }
  
  show() {
    console.log('LyricsView.show called');
    this.lyricsPlayer.classList.add('active');
    document.getElementById('playback-overlay').style.display = 'none';
  }
  
  hide() {
    console.log('LyricsView.hide called');
    this.lyricsPlayer.classList.remove('active');
  }
}