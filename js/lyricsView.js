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
    this.debounceTimeout = null;
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
    this.songState.audio.addEventListener('timeupdate', () => this.syncLyrics());
  }
  
  updateUI(state) {
    const song = state.currentSong;
    this.lyricsSongTitle.textContent = song.title;
    this.lyricsArtist.textContent = song.artist;
    this.lyricsBackground.style.backgroundImage = `url(${song.cover})`;
    this.lyricsContainer.innerHTML = '';
    if (song.lyrics.length > 0) {
      song.lyrics.forEach(({ line, timestamp }) => {
        if (line.trim() !== '' && timestamp !== '0') {
          const p = document.createElement('p');
          p.textContent = line;
          p.dataset.timestamp = parseFloat(timestamp);
          p.classList.add('lyric-line');
          if (line.startsWith('[') && line.endsWith(']')) {
            p.classList.add('section');
          }
          this.lyricsContainer.appendChild(p);
        }
      });
    } else {
      const p = document.createElement('p');
      p.textContent = 'Lyrics not available';
      this.lyricsContainer.appendChild(p);
    }
  }
  
  syncLyrics() {
    if (this.debounceTimeout) return; // Debounce updates
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
      
      this.debounceTimeout = null;
    }, 100); // Update every 100ms
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
  
  bindEvents() {
    this.backBtn.addEventListener('click', (e) => {
      console.log('Lyrics back button clicked');
      e.stopPropagation();
      this.lyricsPlayer.classList.remove('active');
      document.getElementById('detailed-player').classList.add('active');
      const img = document.getElementById('detailed-album-art');
      img.onload = () => applyGradient(img);
    });
  }
  
  show() {
    this.lyricsPlayer.classList.add('active');
  }
  
  hide() {
    this.lyricsPlayer.classList.remove('active');
  }
}