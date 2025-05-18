export class TracklistView {
  constructor(songState) {
    this.songState = songState;
    this.tracklistView = document.getElementById('tracklist-view');
    this.navbar = document.getElementById('sticky-navbar');
    this.tracklist = document.getElementById('tracklist');
    this.albumHeader = document.getElementById('album-header');
    this.albumArtContainer = this.albumHeader.querySelector('.album-art-container');
    this.mainAlbumArt = document.getElementById('main-album-art');
    this.thumbnailArt = document.getElementById('thumbnail-art');
    this.albumTitle = document.getElementById('album-title');
    this.albumRelease = document.getElementById('album-release');
    this.navbarAlbumName = document.getElementById('navbar-album-name');
    this.backBtn = document.getElementById('tracklist-back-btn');
    this.playbackOverlay = document.getElementById('playback-overlay');
    this.playbackCover = this.playbackOverlay.querySelector('.playback-cover');
    this.playbackTitle = this.playbackOverlay.querySelector('.playback-title');
    this.playbackAlbum = this.playbackOverlay.querySelector('.playback-album');
    this.playbackControl = document.getElementById('playback-control');
    this.offcanvasElement = document.getElementById('trackMenu');
    this.offcanvas = new bootstrap.Offcanvas(this.offcanvasElement);
    this.offcanvasTitle = this.offcanvasElement.querySelector('.offcanvas-title');
    this.isTransitioning = false;
  }

  init() {
    this.updateUI(this.songState.getState());
    this.songState.subscribe(state => this.updateUI(state));
    this.bindEvents();
    this.updateNavbar();
  }

  updateUI(state) {
    const album = state.currentAlbum;
    if (album) {
      this.mainAlbumArt.src = album.cover;
      this.thumbnailArt.src = album.cover;
      this.albumTitle.textContent = album.title;
      this.albumRelease.textContent = album.release_date.split('-')[0];
      this.navbarAlbumName.textContent = album.title;
      this.tracklist.innerHTML = album.tracks
        .map((trackId, index) => {
          const song = state.songs.find(s => s.id === trackId);
          if (!song) return '';
          return `
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
          `;
        }).join('');
    }
    this.playbackTitle.textContent = state.currentSong.title;
    this.playbackAlbum.textContent = state.currentSong.album;
    this.playbackCover.src = state.currentSong.thumbnail;
    this.playbackControl.textContent = state.currentSong.isPlaying ? '⏸' : '▶';
  }

  bindEvents() {
    this.playbackControl.addEventListener('click', e => {
      e.stopPropagation();
      this.songState.togglePlay();
    });

    this.tracklist.addEventListener('click', e => {
      const item = e.target.closest('.tracklist-item');
      if (item && !e.target.classList.contains('menu-icon')) {
        document.querySelectorAll('.tracklist-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const songId = item.dataset.songId;
        this.songState.setSong(songId);
        this.tracklistView.classList.add('hidden');
        document.getElementById('detailed-player').classList.add('active');
        document.getElementById('playback-overlay').style.display = 'none';
        const img = document.getElementById('detailed-album-art');
        img.onload = () => this.applyGradient(img);
      }
    });

    this.backBtn.addEventListener('click', () => {
      this.tracklistView.classList.add('hidden');
      document.getElementById('home-view').classList.remove('hidden');
      document.getElementById('playback-overlay').style.display = 'flex';
      document.body.style.background = 'linear-gradient(to bottom, #1e1e2f, #2a2a4a)';
    });

    document.querySelectorAll('.menu-icon').forEach(icon => {
      icon.addEventListener('click', e => {
        e.stopPropagation();
        const trackItem = icon.closest('.tracklist-item');
        this.offcanvasTitle.textContent = trackItem.dataset.title;
        this.offcanvas.show();
      });
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
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
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
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  rgbToCssColor(rgb) {
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  }

  debounce(func, wait) {
    let timeout;
    return function (...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  updateNavbar() {
    if (this.isTransitioning || !this.tracklistView.classList.contains('hidden')) {
      const tracklistTop = this.tracklist.getBoundingClientRect().top;
      const snapThreshold = 50;

      if (tracklistTop <= snapThreshold && !this.navbar.classList.contains('show')) {
        this.isTransitioning = true;
        this.albumArtContainer.classList.add('transitioning');
        this.navbar.classList.add('show');
        this.tracklist.classList.add('navbar-active');
        requestAnimationFrame(() => {
          setTimeout(() => {
            this.albumArtContainer.classList.remove('transitioning');
            this.albumArtContainer.style.display = 'none';
            this.isTransitioning = false;
          }, 500);
        });
      } else if (tracklistTop > snapThreshold && this.navbar.classList.contains('show')) {
        this.isTransitioning = true;
        this.albumArtContainer.style.display = 'block';
        this.albumArtContainer.classList.add('transitioning-back');
        requestAnimationFrame(() => {
          setTimeout(() => {
            this.albumArtContainer.classList.remove('transitioning-back');
            this.navbar.classList.remove('show');
            this.tracklist.classList.remove('navbar-active');
            this.isTransitioning = false;
          }, 500);
        });
      }
    }
  }

  show() {
    this.tracklistView.classList.remove('hidden');
  }

  hide() {
    this.tracklistView.classList.add('hidden');
  }
}