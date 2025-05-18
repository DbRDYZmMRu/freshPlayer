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
        if (line.trim() !== '') {
          const p = document.createElement('p');
          p.textContent = line;
          p.dataset.timestamp = timestamp;
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
    const currentTime = this.songState.audio.currentTime;
    const lyrics = this.songState.getState().currentSong.lyrics;
    let currentLine = null;
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (currentTime >= parseFloat(lyrics[i].timestamp)) {
        currentLine = lyrics[i];
        break;
      }
    }
    this.lyricsContainer.querySelectorAll('.lyric-line').forEach(line => {
      line.classList.remove('active');
      if (currentLine && line.dataset.timestamp === currentLine.timestamp) {
        line.classList.add('active');
        line.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }
  
  bindEvents() {
    this.backBtn.addEventListener('click', () => {
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