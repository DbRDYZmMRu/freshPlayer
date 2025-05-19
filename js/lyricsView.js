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
    this.lyricsPlayBtn = document.getElementById('lyrics-play-btn');
    this.lyricsShuffleBtn = document.getElementById('lyrics-shuffle-btn');
    this.lyricsRepeatBtn = document.getElementById('lyrics-repeat-btn');
    this.lyricsPrevBtn = document.getElementById('lyrics-prev-btn');
    this.lyricsNextBtn = document.getElementById('lyrics-next-btn');
    this.lyricsRewindBtn = document.getElementById('lyrics-rewind-btn');
    this.lyricsForwardBtn = document.getElementById('lyrics-forward-btn');
    this.lyricsFavouriteBtn = document.getElementById('lyrics-favourite-btn');
    this.lyricsQueueBtn = document.getElementById('lyrics-queue-btn');
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
    
    const validLyrics = song.lyrics.filter(({ line }) => line.trim() !== '');
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
    
    this.lyricsCurrentTime.textContent = song.currentTime;
    this.lyricsTotalTime.textContent = song.duration;
    this.lyricsProgressBar.style.width = `${song.progress || 0}%`;
    this.lyricsPlayBtn.textContent = song.isPlaying ? '⏸' : '▶️';
    this.lyricsShuffleBtn.classList.toggle('active', state.shuffle);
    this.lyricsRepeatBtn.textContent = state.repeat === 'one' ? '🔂' : '🔁';
    this.lyricsRepeatBtn.classList.toggle('active', state.repeat !== 'off');
    this.lyricsFavouriteBtn.textContent = state.favourites.includes(song.id) ? '❤️' : '🤍';
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
    const state = this.songState.getState();
    this.lyricsCurrentTime.textContent = state.currentSong.currentTime;
    this.lyricsTotalTime.textContent = state.currentSong.duration;
    this.lyricsProgressBar.style.width = `${state.currentSong.progress || 0}%`;
  }
  
  bindEvents() {
    const buttons = [this.backBtn, this.lyricsPlayBtn, this.lyricsShuffleBtn, this.lyricsRepeatBtn, this.lyricsPrevBtn, this.lyricsNextBtn, this.lyricsRewindBtn, this.lyricsForwardBtn, this.lyricsFavouriteBtn, this.lyricsQueueBtn];
    buttons.forEach(btn => {
      if (btn && btn._handler) {
        btn.removeEventListener('click', btn._handler);
        btn._handler = null;
      }
    });
    
    if (this.backBtn) {
      this.backBtn._handler = (e) => {
        console.log('Lyrics back button clicked');
        e.stopPropagation();
        this.lyricsPlayer.classList.remove('active');
        document.getElementById('detailed-player').classList.add('active');
      };
      this.backBtn.addEventListener('click', this.backBtn._handler);
    }
    
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
        console.log('Lyrics play button clicked');
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
    
    if (this.lyricsFavouriteBtn) {
      this.lyricsFavouriteBtn._handler = () => {
        console.log('Favourite button clicked');
        this.songState.toggleFavourite(this.songState.getState().currentSong.id);
      };
      this.lyricsFavouriteBtn.addEventListener('click', this.lyricsFavouriteBtn._handler);
    }
    
    if (this.lyricsQueueBtn) {
      this.lyricsQueueBtn._handler = (e) => {
        console.log('Queue button clicked');
        e.stopPropagation();
        e.preventDefault();
        this.lyricsPlayer.classList.remove('active');
        document.getElementById('queue-player').classList.add('active');
      };
      this.lyricsQueueBtn.addEventListener('click', this.lyricsQueueBtn._handler);
    }
    
  }
  
  show() {
    this.lyricsPlayer.classList.add('active');
  }
  
  hide() {
    this.lyricsPlayer.classList.remove('active');
  }
}