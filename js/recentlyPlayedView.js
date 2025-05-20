// js/recentlyPlayedView.js
import { generateCollage } from './utils.js';

export class RecentlyPlayedView {
  constructor(songState, applyGradient, app) {
    this.songState = songState;
    this.applyGradient = applyGradient;
    this.app = app;
    this.view = document.getElementById('recently-played-view');
    this.previousView = null;
  }
  
  init(previousView) {
    if (!this.view) {
      console.error('recently-played-view element not found');
      return;
    }
    this.previousView = previousView;
    this.render();
    this.songState.subscribe((state) => this.render(state));
    this.bindEvents();
  }
  
  async render(state = this.songState.getState()) {
    try {
      const songs = Array.isArray(state.recentlyPlayed) ?
        state.recentlyPlayed
        .map((id) => state.songs.find((song) => song.id === id))
        .filter((song) => song) :
        [];
      const collageSrc = songs.length > 0 ?
        await generateCollage(songs.slice(0, 4)) :
        'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png';
      
      this.view.innerHTML = `
        <div class="album-header" id="recently-played-header">
          <div class="album-art-container mt-5">
            <img id="recently-played-main-art" class="album-art" src="${collageSrc}" alt="Recently Played" onerror="this.src='https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png'">
          </div>
          <div class="album-info">
            <div class="album-name fs-4 fw-bold" id="recently-played-title">Recently Played</div>
            <div class="release-year fs-5 opacity-75" id="recently-played-song-count">${songs.length} song${songs.length !== 1 ? 's' : ''}</div>
          </div>
        </div>
        <div id="recently-played-tracklist" class="tracklist">
          ${songs.length > 0
            ? songs
                .map(
                  (song) => `
                    <div class="tracklist-item" data-song-id="${song.id}">
                      <img src="${song.thumbnail || 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png'}" alt="${song.title}">
                      <div class="track-info">
                        <div class="track-title">${song.title}</div>
                        <div class="track-artist">${song.artist}</div>
                      </div>
                    </div>
                  `
                )
                .join('')
            : '<p>No songs in Recently Played</p>'}
        </div>
      `;
      
      // Update navbar thumbnail and name
      const navbarArt = document.getElementById('recently-played-thumbnail-art');
      const navbarName = document.getElementById('recently-played-navbar-name');
      if (navbarArt) {
        navbarArt.src = collageSrc;
      }
      if (navbarName) {
        navbarName.textContent = 'Recently Played';
      }
    } catch (error) {
      console.error('Error in RecentlyPlayedView.render:', error);
      this.view.innerHTML = '<p>Error loading Recently Played view. Please try again.</p>';
    }
  }
  
  bindEvents() {
    const tracklist = document.getElementById('recently-played-tracklist');
    if (tracklist) {
      tracklist.addEventListener('click', (e) => {
        const trackItem = e.target.closest('.tracklist-item');
        if (trackItem) {
          const songId = trackItem.dataset.songId;
          this.songState.setSong(songId);
          this.app.showView('detailed-player');
        }
      });
    }
    
    const backBtn = document.getElementById('recently-played-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.app.showView(this.previousView);
        this.songState.popView();
      });
    }
  }
  
  show() {
    this.view.classList.remove('hidden');
    document.getElementById('playback-overlay').style.display = 'flex';
  }
  
  hide() {
    this.view.classList.add('hidden');
  }
}