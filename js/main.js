// js/main.js
import { SongState } from './songState.js';
import { HomeView } from './homeView.js';
import { TracklistView } from './tracklistView.js';
import { DetailedView } from './detailedView.js';
import { LyricsView } from './lyricsView.js';
import { QueueView } from './queueView.js';

class App {
  constructor() {
    this.songState = new SongState();
    this.views = {
      'home-view': new HomeView(this.songState, this),
      'tracklist-view': new TracklistView(this.songState, 'tracklist-view', 'Album', 'tracks', 'album', this.views?.['home-view']?.applyGradient?.bind(this.views['home-view']), this),
      'detailed-player': new DetailedView(this.songState, this),
      'lyrics-player': new LyricsView(this.songState, this),
      'queue-player': new QueueView(this.songState, this)
    };
    this.currentView = 'home-view';
    this.isNavigating = false;
  }
  
  init() {
    console.log('App.init called, views:', Object.keys(this.views));
    Object.values(this.views).forEach(view => {
      console.log(`Initializing view: ${view.constructor.name}`);
      view.init(this.views['home-view']?.applyGradient?.bind(this.views['home-view']));
    });
    this.views['home-view'].show();
    this.songState.subscribe(state => this.handleNavigation(state));
    this.bindGlobalEvents();
  }
  
  handleNavigation(state) {
    const currentViewId = state.navigationHistory[state.navigationHistory.length - 1] || 'home-view';
    console.log('handleNavigation called, currentViewId:', currentViewId, 'previous currentView:', this.currentView, 'isPlaying:', state.currentSong.isPlaying);
    if (!this.views[currentViewId]) {
      console.warn(`View ${currentViewId} not found, defaulting to home-view`);
      this.songState.pushView('home-view');
      return;
    }
    // Skip history-based navigation if in overlay view
    const overlayViews = ['lyrics-player', 'queue-player'];
    if (overlayViews.includes(this.currentView)) {
      console.log(`In overlay view ${this.currentView}, skipping history navigation to ${currentViewId}`);
      return;
    }
    console.log(`Processing view: ${currentViewId}`);
    this.views[this.currentView]?.hide();
    this.views[currentViewId].show();
    this.currentView = currentViewId;
    this.isNavigating = false;
    const backBtn = document.getElementById('global-back-btn');
    if (backBtn) {
      backBtn.classList.toggle('d-none', state.navigationHistory.length <= 1);
    }
  }
  
  showOverlayView(viewId) {
    console.log(`showOverlayView called for: ${viewId}, currentView: ${this.currentView}, available views:`, Object.keys(this.views));
    if (this.views[viewId]) {
      this.views[this.currentView]?.hide();
      this.views[viewId].show();
      this.currentView = viewId;
      console.log(`Successfully showed overlay view: ${viewId}`);
    } else {
      console.error(`Overlay view ${viewId} not found in views:`, Object.keys(this.views));
    }
  }
  
  bindGlobalEvents() {
    const playbackOverlay = document.getElementById('playback-overlay');
    if (playbackOverlay) {
      const playbackCover = playbackOverlay.querySelector('.playback-cover');
      const playbackTitle = playbackOverlay.querySelector('.playback-title');
      const playbackAlbum = playbackOverlay.querySelector('.playback-album');
      const playbackControl = document.getElementById('playback-control');
      
      this.songState.subscribe(state => {
        console.log('Playback overlay updating, isPlaying:', state.currentSong.isPlaying, 'currentView:', this.currentView);
        playbackCover.src = state.currentSong.thumbnail || state.currentSong.cover || 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png';
        playbackTitle.textContent = state.currentSong.title || 'Select a track';
        playbackAlbum.textContent = state.currentSong.album || 'Unknown';
        playbackControl.textContent = state.currentSong.isPlaying ? '⏸' : '▶';
      });
      
      playbackOverlay.addEventListener('click', e => {
        if (e.target.closest('.playback-control') || this.songState.getState().currentSong.title === 'Select a track') return;
        if (this.isNavigating) {
          console.log('Navigation in progress, skipping playback overlay click');
          return;
        }
        const overlayViews = ['lyrics-player', 'queue-player'];
        if (overlayViews.includes(this.currentView)) {
          console.log(`In overlay view ${this.currentView}, skipping playback overlay navigation`);
          return;
        }
        this.isNavigating = true;
        console.log('Playback overlay clicked, current history:', this.songState.getState().navigationHistory, 'currentView:', this.currentView);
        if (this.songState.getState().navigationHistory[this.songState.getState().navigationHistory.length - 1] !== 'detailed-player') {
          this.songState.pushView('detailed-player');
        } else {
          console.log('Already in detailed-player, skipping push');
        }
      });
      
      if (playbackControl) {
        playbackControl.addEventListener('click', e => {
          e.stopPropagation();
          console.log('Playback control clicked, toggling play');
          this.songState.togglePlay();
        });
      }
    }
    
    const globalBackBtn = document.getElementById('global-back-btn');
    if (globalBackBtn) {
      globalBackBtn.addEventListener('click', () => {
        if (this.isNavigating) {
          console.log('Navigation in progress, skipping global back click');
          return;
        }
        this.isNavigating = true;
        console.log('Global back button clicked, current history:', this.songState.getState().navigationHistory);
        const previousView = this.songState.popView();
        console.log('Global back navigating to:', previousView);
      });
    }
    
    const offcanvas = document.getElementById('trackMenu');
    const addToQueue = document.getElementById('add-to-queue');
    const addToPlaylist = document.getElementById('add-to-playlist');
    const createPlaylist = document.getElementById('create-playlist');
    const deletePlaylist = document.getElementById('delete-playlist');
    const renamePlaylist = document.getElementById('rename-playlist');
    const playlistDropdown = document.getElementById('playlist-dropdown');
    const playlistModal = document.getElementById('playlist-modal');
    const playlistAction = document.getElementById('playlist-action');
    
    if (addToQueue && offcanvas) {
      addToQueue.addEventListener('click', () => {
        const songId = offcanvas.dataset.songId;
        if (songId) {
          this.songState.addToQueue(songId);
          bootstrap.Offcanvas.getInstance(offcanvas)?.hide();
        } else {
          console.warn('No songId set on offcanvas');
        }
      });
    }
    
    if (addToPlaylist && playlistDropdown) {
      addToPlaylist.addEventListener('show.bs.dropdown', () => {
        const state = this.songState.getState();
        playlistDropdown.innerHTML = Object.keys(state.playlists).length > 0 ?
          Object.keys(state.playlists).map(name => `
              <li><a class="dropdown-item" href="#" data-playlist="${name}">${name}</a></li>
            `).join('') :
          '<li><a class="dropdown-item disabled" href="#">No playlists</a></li>';
        playlistDropdown.querySelectorAll('a[data-playlist]').forEach(item => {
          item.addEventListener('click', e => {
            e.preventDefault();
            const playlistName = e.target.dataset.playlist;
            const songId = offcanvas.dataset.songId;
            if (songId && this.songState.addToPlaylist(playlistName, songId)) {
              bootstrap.Offcanvas.getInstance(offcanvas)?.hide();
            } else {
              alert('Failed to add to playlist');
            }
          });
        });
      });
    }
    
    if (createPlaylist && playlistModal && playlistAction) {
      createPlaylist.addEventListener('click', () => {
        const modal = new bootstrap.Modal(playlistModal, { backdrop: true });
        document.getElementById('playlist-modal-title').textContent = 'Create Playlist';
        document.getElementById('playlist-name-input').value = '';
        playlistAction.dataset.action = 'create';
        modal.show();
      });
    }
    
    if (deletePlaylist && offcanvas) {
      deletePlaylist.addEventListener('click', () => {
        const playlistName = offcanvas.dataset.playlistName;
        if (playlistName && confirm(`Delete playlist "${playlistName}"?`)) {
          this.songState.deletePlaylist(playlistName);
          bootstrap.Offcanvas.getInstance(offcanvas)?.hide();
        }
      });
    }
    
    if (renamePlaylist && playlistModal && playlistAction) {
      renamePlaylist.addEventListener('click', () => {
        const playlistName = offcanvas.dataset.playlistName;
        if (playlistName) {
          const modal = new bootstrap.Modal(playlistModal, { backdrop: true });
          document.getElementById('playlist-modal-title').textContent = 'Rename Playlist';
          document.getElementById('playlist-name-input').value = playlistName;
          playlistAction.dataset.action = `rename:${playlistName}`;
          modal.show();
        }
      });
    }
    
    if (playlistAction && playlistModal) {
      playlistAction.addEventListener('click', () => {
        const action = playlistAction.dataset.action;
        const nameInput = document.getElementById('playlist-name-input').value.trim();
        if (!nameInput) {
          alert('Playlist name cannot be empty');
          return;
        }
        let success = false;
        if (action === 'create') {
          success = this.songState.createPlaylist(nameInput);
          if (!success) alert('Playlist already exists!');
        } else if (action.startsWith('rename:')) {
          const oldName = action.split(':')[1];
          success = this.songState.renamePlaylist(oldName, nameInput);
          if (!success) alert('New name already exists or invalid!');
        }
        if (success) {
          const modal = bootstrap.Modal.getInstance(playlistModal);
          modal?.hide();
          document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
          document.body.classList.remove('modal-open');
          document.body.style.overflow = '';
        }
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded, creating App instance');
  const app = new App();
  document.querySelector('body').__app = app;
  console.log('App instance set on body.__app');
  app.init();
});