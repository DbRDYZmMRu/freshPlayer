// tracklistView.js
export class TracklistView {
  constructor(songState, containerId, title, tracksKey, type = 'album') {
    this.songState = songState;
    this.container = document.getElementById(containerId);
    this.navbar = document.getElementById(`${containerId}-navbar`) || document.getElementById('sticky-navbar');
    this.tracklist = this.container.querySelector('.tracklist') || document.getElementById('tracklist');
    this.header = this.container.querySelector('.header') || document.getElementById('album-header');
    this.albumArtContainer = this.header?.querySelector('.album-art-container');
    this.mainAlbumArt = this.header?.querySelector('.album-art') || document.getElementById('main-album-art');
    this.thumbnailArt = this.navbar?.querySelector('.thumbnail-art') || document.getElementById('thumbnail-art');
    this.titleElement = this.header?.querySelector('.title') || document.getElementById('album-title');
    this.subtitleElement = this.header?.querySelector('.subtitle') || document.getElementById('album-release');
    this.navbarTitle = this.navbar?.querySelector('.album-name') || document.getElementById('navbar-album-name');
    this.backBtn = this.container.querySelector('.back-btn') || document.getElementById('tracklist-back-btn');
    this.playbackOverlay = document.getElementById('playback-overlay');
    this.playbackCover = this.playbackOverlay.querySelector('.playback-cover');
    this.playbackTitle = this.playbackOverlay.querySelector('.playback-title');
    this.playbackAlbum = this.playbackOverlay.querySelector('.playback-album');
    this.playbackControl = document.getElementById('playback-control');
    this.offcanvasElement = document.getElementById('trackMenu');
    this.offcanvas = new bootstrap.Offcanvas(this.offcanvasElement);
    this.offcanvasTitle = this.offcanvasElement.querySelector('.offcanvas-title');
    this.title = title;
    this.tracksKey = tracksKey; // 'tracks' (album), 'queue', 'favourites', or playlist name
    this.type = type; // 'album', 'queue', 'playlist'
    this.isTransitioning = false;
  }
  
  init(backTarget = 'home-view') {
    this.updateUI(this.songState.getState());
    this.songState.subscribe(state => this.updateUI(state));
    this.bindEvents(backTarget);
    this.updateNavbar();
  }
  
  updateUI(state) {
    let tracks = [];
    let displayTitle = this.title;
    let subtitle = '';
    
    if (this.type === 'album') {
      const album = state.currentAlbum;
      if (album) {
        tracks = album.tracks.map(trackId => state.songs.find(s => s.id === trackId)).filter(s => s);
        displayTitle = album.title;
        subtitle = album.release_date.split('-')[0];
        if (this.mainAlbumArt) this.mainAlbumArt.src = album.cover;
        if (this.thumbnailArt) this.thumbnailArt.src = album.cover;
      }
    } else if (this.type === 'queue') {
      tracks = state.queue.map(songId => state.songs.find(s => s.id === songId)).filter(s => s);
      subtitle = `${tracks.length} songs`;
    } else if (this.type === 'playlist') {
      tracks = (state[this.tracksKey] || state.playlists[this.tracksKey] || []).map(songId => state.songs.find(s => s.id === songId)).filter(s => s);
      subtitle = `${tracks.length} songs`;
    }
    
    if (this.titleElement) this.titleElement.textContent = displayTitle;
    if (this.subtitleElement) this.subtitleElement.textContent = subtitle;
    if (this.navbarTitle) this.navbarTitle.textContent = displayTitle;
    
    this.tracklist.innerHTML = tracks
      .map((song, index) => `
        <div class="tracklist-item ${state.currentSong.id === song.id ? 'active' : ''}" data-track="${index + 1}" data-song-id="${song.id}" data-title="${song.title}" data-duration="${song.duration}">
          <div class="track-info">
            <img src="${song.thumbnail}" class="track-thumbnail" alt="${song.title}">
            <span class="track-number opacity-75">${index + 1}</span>
            <div class="track-details">
              <div class="track-title">${song.title}</div>
              <div class="track-duration">${song.duration}</div>
            </div>
          </div>
          <span class="menu-icon" data-bs-toggle="offcanvas" data-bs-target="#trackMenu">⋮</span>
        </div>
      `).join('');
    
    this.playbackTitle.textContent = state.currentSong.title;
    this.playbackAlbum.textContent = state.currentSong.album;
    this.playbackCover.src = state.currentSong.thumbnail;
    this.playbackControl.textContent = state.currentSong.isPlaying ? '⏸' : '▶';
  }
  
  bindEvents(backTarget) {
    if (this.playbackControl) {
      this.playbackControl._handler = e => {
        e.stopPropagation();
        this.songState.togglePlay();
      };
      this.playbackControl.addEventListener('click', this.playbackControl._handler);
    }
    
    if (this.playbackOverlay) {
      this.playbackOverlay._handler = e => {
        if (e.target.classList.contains('playback-control')) return;
        if (this.songState.getState().currentSong.title === 'Select a track') return;
        this.container.classList.add('hidden');
        document.getElementById('detailed-player').classList.add('active');
        this.playbackOverlay.style.display = 'none';
        const img = document.getElementById('detailed-album-art');
        img.onload = () => this.applyGradient(img);
      };
      this.playbackOverlay.addEventListener('click', this.playbackOverlay._handler);
    }
    
    if (this.tracklist) {
      this.tracklist._handler = e => {
        const item = e.target.closest('.tracklist-item');
        if (item && !e.target.classList.contains('menu-icon')) {
          document.querySelectorAll('.tracklist-item').forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          const songId = item.dataset.songId;
          this.songState.setSong(songId);
          this.container.classList.add('hidden');
          document.getElementById('detailed-player').classList.add('active');
          document.getElementById('playback-overlay').style.display = 'none';
          const img = document.getElementById('detailed-album-art');
          img.onload = () => this.applyGradient(img);
        }
      };
      this.tracklist.addEventListener('click', this.tracklist._handler);
    }
    
    if (this.backBtn) {
      this.backBtn._handler = () => {
        this.container.classList.add('hidden');
        document.getElementById(backTarget).classList.remove('hidden');
        document.getElementById('playback-overlay').style.display = 'flex';
        document.body.style.background = 'linear-gradient(to bottom, #1e1e2f, #2a2a4a)';
      };
      this.backBtn.addEventListener('click', this.backBtn._handler);
    }
    
    document.querySelectorAll('.menu-icon').forEach(icon => {
      icon._handler = e => {
        e.stopPropagation();
        const trackItem = icon.closest('.tracklist-item');
        this.offcanvasTitle.textContent = trackItem.dataset.title;
        this.offcanvas.dataset.songId = trackItem.dataset.songId;
        this.offcanvas.show();
      };
      icon.addEventListener('click', icon._handler);
    });
    
    window.addEventListener('scroll', this.debounce(this.updateNavbar.bind(this), 150));
    window.addEventListener('resize', this.updateNavbar.bind(this));
  }
  
  applyGradient(image) {
    const colorThief = new ColorThief();
    try {
      const dominantColor = colorThief.getColor(image);
      const palette = colorThief.getPalette(image, 3);
      const saturatedDominant = this.adjustSaturation(dominantColor, 80);
      const saturatedSecondary = this.adjustSaturation(palette[1] || dominantColor, 30);
      const color1 = this.rgbToCssColor(saturatedDominant);
      const color2 = this.rgbToCssColor(saturatedSecondary);
      document.body.style.background = `linear-gradient(to bottom, ${color1}, ${color2})`;
    } catch (error) {
      console.error('Error generating gradient:', error);
      document.body.style.background = 'linear-gradient(to bottom, #d4a5d9, #6b48ff)';
    }
  }
  
  adjustSaturation(rgb, saturationIncrease = 20) {
    const [h, s, l] = this.rgbToHsl(rgb[0], rgb[1], rgb[2]);
    const newSaturation = Math.min(100, s + saturationIncrease);
    return this.hslToRgb(h, newSaturation, l);
  }
  
  rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return [h * 360, s * 100, l * 100];
  }
  
  hslToRgb(h, s, l) {
    h /= 360, s /= 100, l /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }
  
  rgbToCssColor(rgb) {
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  }
  
  debounce(func, wait) {
    let timeout;
    return function(...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  updateNavbar() {
    if (this.isTransitioning || !this.container.classList.contains('hidden')) {
      const tracklistTop = this.tracklist.getBoundingClientRect().top;
      const snapThreshold = 50;
      
      if (tracklistTop <= snapThreshold && !this.navbar.classList.contains('show')) {
        this.isTransitioning = true;
        if (this.albumArtContainer) this.albumArtContainer.classList.add('transitioning');
        this.navbar.classList.add('show');
        this.tracklist.classList.add('navbar-active');
        requestAnimationFrame(() => {
          setTimeout(() => {
            if (this.albumArtContainer) {
              this.albumArtContainer.classList.remove('transitioning');
              this.albumArtContainer.style.display = 'none';
            }
            this.isTransitioning = false;
          }, 500);
        });
      } else if (tracklistTop > snapThreshold && this.navbar.classList.contains('show')) {
        this.isTransitioning = true;
        if (this.albumArtContainer) this.albumArtContainer.style.display = 'block';
        if (this.albumArtContainer) this.albumArtContainer.classList.add('transitioning-back');
        requestAnimationFrame(() => {
          setTimeout(() => {
            if (this.albumArtContainer) this.albumArtContainer.classList.remove('transitioning-back');
            this.navbar.classList.remove('show');
            this.tracklist.classList.remove('navbar-active');
            this.isTransitioning = false;
          }, 500);
        });
      }
    }
  }
  
  show() {
    this.container.classList.remove('hidden');
  }
  
  hide() {
    this.container.classList.add('hidden');
  }
}