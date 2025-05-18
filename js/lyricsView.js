// lyricsView.js
export class LyricsView {
  constructor(songState) {
    this.songState = songState;
    this.lyricsPlayer = document.getElementById('lyrics-player');
    this.lyricsBackground = document.getElementById('lyrics-background');
    this.backBtn = document.getElementById('lyrics-back-btn');
    this.lyricsSongTitle = document.getElementById('lyrics-song-title');
    this.lyricsArtist = document.getElementById('lyrics-artist');
    this.lyricsContainer = document.getElementById('lyrics-container');
    this.lyricsProgress = this.lyricsPlayer.querySelector('.lyrics-progress .progress');
    this.lyricsProgressBar = this.lyricsPlayer.querySelector('.lyrics-progress .progress-bar');
    this.lyricsCurrentTime = document.getElementById('lyrics-current-time');
    this.lyricsTotalTime = document.getElementById('lyrics-total-time');
    this.debounceTimeout = null;
    this.isStaticLyrics = false;
  }
  
  init(applyGradient) {
    this.updateUI(this.songState.getState());
    this.songState.subscribe(state => this.updateUI(state));
    this.bindEvents();
    const tempImg = new Image();
    tempImg.crossOrigin = 'anonymous';
    tempImg.src = this.songState.getState().currentSong.cover;
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
    const song = state.currentSong;
    this.lyricsSongTitle.textContent = song.title;
    this.lyricsArtist.textContent = song.artist;
    this.lyricsBackground.style.backgroundImage = `url(${song.cover})`;
    this.lyricsContainer.innerHTML = '';
    
    // Check if all timestamps are "0"
    const validLyrics = song.lyrics.filter(({ line, timestamp }) => line.trim() !== '');
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
    
    // Update time displays
    this.lyricsCurrentTime.textContent = song.currentTime;
    this.lyricsTotalTime.textContent = song.duration;
    this.lyricsProgressBar.style.width = `${song.progress || 0}%`;
  }
  
  syncLyrics() {
    if (this.debounceTimeout || this.isStaticLyrics) return;
    this.debounceTimeout = setTimeout(() => {
      const currentTime = this.songState.audio.currentTime;
      const lyrics = this.songState.getState().currentSong.lyrics.filter(
        ({ line, timestamp }) => line.trim() !== '' && timestamp !== '0'
      );
      
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
      
      // Clear highlight before first lyric or after last
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
    // Center the lyric, keeping past lyrics visible
    const scrollPosition = lineTop - (containerHeight / 2) + (lineHeight / 2);
    
    container.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  }
  
  updateProgress() {
    const state = this.songState.getState();
    this.lyricsCurrentTime.textContent = state.currentSong.currentTime;
    this.lyricsTotalTime.textContent = state.currentSong.duration;
    this.lyricsProgressBar.style.width = `${state.currentSong.progress || 0}%`;
  }
  
  bindEvents() {
    this.backBtn.addEventListener('click', (e) => {
      console.log('Lyrics back button clicked');
      e.stopPropagation();
      this.lyricsPlayer.classList.remove('active');
      document.getElementById('detailed-player').classList.add('active');
      const img = document.getElementById('detailed-album-art');
      img.onload = () => applyGradient(img);
    });
    
    if (this.lyricsProgress) {
      this.lyricsProgress.addEventListener('click', (e) => {
        console.log('Lyrics progress bar clicked');
        e.stopPropagation();
        const rect = this.lyricsProgress.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const percentage = clickX / width;
        this.songState.seekTo(percentage);
      });
    }
  }
  
  show() {
    this.lyricsPlayer.classList.add('active');
  }
  
  hide() {
    this.lyricsPlayer.classList.remove('active');
  }
}