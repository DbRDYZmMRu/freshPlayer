// js/tracklistView.js
export class TracklistView {
  constructor(songState, containerId, title, tracksKey, type = 'album', applyGradientCallback = null, app) {
    this.songState = songState;
    this.app = app;
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
    this.backBtn = document.getElementById('tracklist-back-btn');
    this.playbackOverlay = document.getElementById('playback-overlay');
    this.playbackCover = this.playbackOverlay.querySelector('.playback-cover');
    this.playbackTitle = this.playbackOverlay.querySelector('.playback-title');
    this.playbackAlbum = this.playbackOverlay.querySelector('.playback-album');
    this.playbackControl = document.getElementById('playback-control');
    this.offcanvasElement = document.getElementById('trackMenu');
    this.offcanvas = new bootstrap.Offcanvas(this.offcanvasElement);
    this.offcanvasTitle = this.offcanvasElement.querySelector('.offcanvas-title');
    this.title = title;
    this.tracksKey = tracksKey;
    this.type = type;
    this.applyGradientCallback = applyGradientCallback;
    this.isTransitioning = false;
  }
  
  init(backTarget = 'home-view') {
    if (!this.backBtn) {
      console.error('tracklist-back-btn element not found in DOM');
    } else {
      console.log('tracklist-back-btn found, binding event');
    }
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
        if (this.mainAlbumArt) this.mainAlbumArt.src = album.cover || 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png';
        if (this.thumbnailArt) this.thumbnailArt.src = album.cover || 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png';
      }
    } else if (this.type === 'queue') {
      tracks = state.queue.map(songId => state.songs.find(s => s.id === songId)).filter(s => s);
      subtitle = `${tracks.length} songs`;
    } else if (this.type === 'playlist') {
      tracks = (state.playlists[this.tracksKey] || []).map(songId => state.songs.find(s => s.id === songId)).filter(s => s);
      subtitle = `${tracks.length} songs`;
    }
    
    if (this.titleElement) this.titleElement.textContent = displayTitle;
    if (this.subtitleElement) this.subtitleElement.textContent = subtitle;
    if (this.navbarTitle) this.navbarTitle.textContent = displayTitle;
    
    this.tracklist.innerHTML = tracks.length > 0 ? tracks
      .map((song, index) => `
        <div class="tracklist-item ${state.currentSong.id === song.id ? 'active' : ''}" data-track="${index + 1}" data-song-id="${song.id}" data-title="${song.title}" data-duration="${song.duration}" ${this.type === 'playlist' ? 'draggable="true"' : ''}>
          <div class="track-info">
            <img src="${song.cover || 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png'}" class="track-thumbnail" alt="${song.title}">
            <span class="track-number opacity-75">${index + 1}</span>
            <div class="track-details">
              <div class="track-title">${song.title}</div>
              <div class="track-duration">${song.duration}</div>
            </div>
          </div>
          ${this.type === 'playlist' ? `<button class="remove-song btn p-0" data-song-id="${song.id}">🗑️</button>` : ''}
          <span class="menu-icon" data-bs-toggle="offcanvas" data-bs-target="#trackMenu">⋮</span>
        </div>
      `).join('') : '<p>No songs available</p>';
    
    this.playbackTitle.textContent = state.currentSong.title;
    this.playbackAlbum.textContent = state.currentSong.album;
    this.playbackCover.src = state.currentSong.cover || 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png';
    this.playbackControl.textContent = state.currentSong.isPlaying ? '⏸' : '▶';
  }
  
  bindEvents(backTarget) {
    if (this.playbackControl) {
      if (this.playbackControl._handler) {
        this.playbackControl.removeEventListener('click', this.playbackControl._handler);
      }
      this.playbackControl._handler = e => {
        e.stopPropagation();
        const state = this.songState.getState();
        if (state.currentSong.id && state.currentSong.mp3_url) {
          this.songState.togglePlay();
        } else {
          console.log('No song selected for playback');
        }
      };
      this.playbackControl.addEventListener('click', this.playbackControl._handler);
    }
    
    if (this.playbackOverlay) {
      if (this.playbackOverlay._handler) {
        this.playbackOverlay.removeEventListener('click', this.playbackOverlay._handler);
      }
      this.playbackOverlay._handler = e => {
        if (e.target.classList.contains('playback-control')) return;
        if (this.songState.getState().currentSong.title === 'Play a record') return;
        this.songState.pushView('detailed-player');
        this.container.classList.add('hidden');
        document.getElementById('detailed-player').classList.add('active');
        this.playbackOverlay.style.display = 'none';
        if (this.applyGradientCallback) {
          const img = document.getElementById('detailed-album-art');
          img.onload = () => this.applyGradientCallback(img);
        }
      };
      this.playbackOverlay.addEventListener('click', this.playbackOverlay._handler);
    }
    
    if (this.tracklist) {
      this.tracklist._handler = e => {
        const item = e.target.closest('.tracklist-item');
        if (item && !e.target.classList.contains('menu-icon') && !e.target.classList.contains('remove-song')) {
          document.querySelectorAll('.tracklist-item').forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          const songId = item.dataset.songId;
          this.songState.setSong(songId);
          this.songState.pushView('detailed-player');
          this.container.classList.add('hidden');
          document.getElementById('detailed-player').classList.add('active');
          document.getElementById('playback-overlay').style.display = 'none';
          if (this.applyGradientCallback) {
            const img = document.getElementById('detailed-album-art');
            img.onload = () => this.applyGradientCallback(img);
          }
        }
      };
      this.tracklist.addEventListener('click', this.tracklist._handler);
    }
    
    if (this.backBtn) {
      this.backBtn.removeEventListener('click', this.handleBackClick);
      this.handleBackClick = () => {
        console.log('Tracklist back button clicked, current history:', this.songState.getState().navigationHistory);
        const previousView = this.songState.popView();
        console.log('Navigating to previous view:', previousView);
      };
      this.backBtn.addEventListener('click', this.handleBackClick);
    } else {
      console.warn('tracklist-back-btn not found, cannot bind event');
    }
    
    document.querySelectorAll('.menu-icon').forEach(icon => {
      if (icon._handler) {
        icon.removeEventListener('click', icon._handler);
      }
      icon._handler = e => {
        e.stopPropagation();
        const trackItem = icon.closest('.tracklist-item');
        this.offcanvasTitle.textContent = trackItem.dataset.title;
        this.offcanvas.dataset.songId = trackItem.dataset.songId;
        this.offcanvas.dataset.playlistName = this.type === 'playlist' ? this.tracksKey : '';
        this.offcanvas.show();
      };
      icon.addEventListener('click', icon._handler);
    });
    
    window.addEventListener('scroll', this.debounce(this.updateNavbar.bind(this), 150));
    window.addEventListener('resize', this.updateNavbar.bind(this));
  }
  
  getDragAfterElement(y) {
    const draggableElements = [...this.tracklist.querySelectorAll('.tracklist-item:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
  
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  updateNavbar() {
    if (!this.navbar || !this.header || !this.albumArtContainer) return;
    const navbarRect = this.navbar.getBoundingClientRect();
    const headerRect = this.header.getBoundingClientRect();
    if (navbarRect.top <= 0 && headerRect.bottom <= 0) {
      this.navbar.classList.add('sticky');
      this.albumArtContainer.classList.add('sticky');
    } else {
      this.navbar.classList.remove('sticky');
      this.albumArtContainer.classList.remove('sticky');
    }
  }
  
  show() {
    this.container.classList.remove('hidden');
    document.getElementById('playback-overlay').style.display = this.type === 'album' ? 'flex' : 'none';
  }
  
  hide() {
    this.container.classList.add('hidden');
  }
}