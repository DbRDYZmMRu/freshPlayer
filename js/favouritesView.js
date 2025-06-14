// js/favouritesView.js
import { generateCollage } from './utils.js';

export class FavouritesView {
  constructor(songState, containerId, title = 'Favourites', tracksKey = 'favourites', applyGradientCallback = null, app) {
    this.songState = songState;
    this.app = app;
    this.container = document.getElementById(containerId);
    this.navbar = document.getElementById('favourites-sticky-navbar');
    this.header = document.getElementById('favourites-header');
    this.albumArtContainer = this.header?.querySelector('.album-art-container');
    this.mainAlbumArt = this.header?.querySelector('.album-art') || document.getElementById('favourites-main-art');
    this.thumbnailArt = this.navbar?.querySelector('.thumbnail-art') || document.getElementById('favourites-thumbnail-art');
    this.titleElement = this.header?.querySelector('.album-name') || document.getElementById('favourites-title');
    this.subtitleElement = this.header?.querySelector('.release-year') || document.getElementById('favourites-song-count');
    this.navbarTitle = this.navbar?.querySelector('.album-name') || document.getElementById('favourites-navbar-name');
    this.tracklist = this.container.querySelector('.tracklist') || document.getElementById('favourites-tracklist');
    this.backBtn = document.getElementById('favourites-back-btn');
    this.playbackOverlay = document.getElementById('playback-overlay');
    this.title = title;
    this.tracksKey = tracksKey;
    this.applyGradientCallback = applyGradientCallback;
    this.collageCache = null;
  }

  init(backTarget = 'home-view') {
    if (!this.backBtn) console.error('favourites-back-btn element not found in DOM');
    if (!this.navbar) console.error('favourites-sticky-navbar element not found in DOM');
    if (!this.header) console.error('favourites-header element not found in DOM');
    if (!this.albumArtContainer) console.error('album-art-container element not found in DOM');
    if (!this.thumbnailArt) console.error('thumbnail-art element not found in DOM');
    this.updateUI(this.songState.getState());
    this.songState.subscribe((state) => this.updateUI(state));
    this.bindEvents(backTarget);
    this.updateNavbar();
  }

  generateCollage(tracks) {
    const placeholder = '/images/placeholder.png';
    return tracks.length > 0
      ? generateCollage(tracks.map((t) => ({ ...t, thumbnail: t.thumbnail || placeholder })), 'large')
      : `<img src="${placeholder}" class="collage-single collage-single-large" alt="Placeholder" onerror="this.src='${placeholder}'">`;
  }

  async updateUI(state) {
    const tracks = (state.favourites || [])
      .map((songId) => state.songs.find((s) => s.id === songId))
      .filter((s) => s);
    this.titleElement.textContent = this.title;
    this.subtitleElement.textContent = `${tracks.length} songs`;
    this.navbarTitle.textContent = this.title;

    const collageHtml = this.collageCache && tracks.length > 0 ? this.collageCache : this.generateCollage(tracks);
    this.collageCache = collageHtml;

    if (this.mainAlbumArt) {
      this.mainAlbumArt.innerHTML = collageHtml;
      console.log('Set favourites-main-art HTML:', collageHtml);
    }
    if (this.thumbnailArt) {
      const firstTrack = tracks[0];
      this.thumbnailArt.src = firstTrack?.thumbnail || '/images/placeholder.png';
      console.log('Set favourites-thumbnail-art src:', this.thumbnailArt.src);
    }

    this.tracklist.innerHTML = tracks.length > 0
      ? tracks
          .map(
            (song, index) => `
        <div class="tracklist-item ${state.currentSong.id === song.id ? 'active' : ''}" data-track="${index + 1}" data-song-id="${song.id}" data-title="${song.title}" data-duration="${song.duration}" draggable="true">
          <div class="track-info">
            <img src="${song.thumbnail || '/images/placeholder.png'}" class="track-thumbnail" alt="${song.title}" onerror="this.src='/images/placeholder.png'">
            <span class="track-number opacity-75">${index + 1}</span>
            <div class="track-details">
              <div class="track-title">${song.title}</div>
              <div class="track-duration">${song.duration}</div>
            </div>
          </div>
          <button class="remove-song btn p-0" data-song-id="${song.id}" title="Remove from Favourites">🗑️</button>
        </div>
      `
          )
          .join('')
      : '<p>No songs in Favourites</p>';
  }

  bindEvents(backTarget) {
    if (this.backBtn) {
      this.backBtn.addEventListener('click', () => {
        console.log('Favourites back button clicked, current history:', this.songState.getState().navigationHistory);
        const previousView = this.songState.popView();
        console.log('Navigating to previous view:', previousView);
        this.app.showView(previousView || backTarget);
      });
    }

    if (this.tracklist) {
      this.tracklist.addEventListener('dragstart', (e) => {
        const item = e.target.closest('.tracklist-item');
        if (item) {
          e.dataTransfer.setData('text/plain', item.dataset.songId);
          item.classList.add('dragging');
        }
      });

      this.tracklist.addEventListener('dragend', (e) => {
        const item = e.target.closest('.tracklist-item');
        if (item) item.classList.remove('dragging');
      });

      this.tracklist.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = this.getDragAfterElement(e.clientY);
        const draggable = this.tracklist.querySelector('.dragging');
        if (afterElement == null) {
          this.tracklist.appendChild(draggable);
        } else {
          this.tracklist.insertBefore(draggable, afterElement);
        }
      });

      this.tracklist.addEventListener('drop', (e) => {
        e.preventDefault();
        const songId = e.dataTransfer.getData('text/plain');
        const newOrder = Array.from(this.tracklist.querySelectorAll('.tracklist-item')).map((item) => item.dataset.songId);
        this.songState.reorderFavourites(newOrder);
      });

      this.tracklist.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.remove-song');
        if (removeBtn) {
          const songId = removeBtn.dataset.songId;
          this.songState.toggleFavourite(songId);
          console.log(`Removed song ${songId} from Favourites`);
          return;
        }
        const item = e.target.closest('.tracklist-item');
        if (item) {
          document.querySelectorAll('.tracklist-item').forEach((i) => i.classList.remove('active'));
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
      });
    }

    window.addEventListener('scroll', this.debounce(this.updateNavbar.bind(this), 150));
    window.addEventListener('resize', this.updateNavbar.bind(this));
  }

  getDragAfterElement(y) {
    const draggableElements = [...this.tracklist.querySelectorAll('.tracklist-item:not(.dragging)')];
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        }
        return closest;
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
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
    if (!this.navbar || !this.header || !this.albumArtContainer) {
      console.error('Missing elements in updateNavbar:', {
        navbar: !!this.navbar,
        header: !!this.header,
        albumArtContainer: !!this.albumArtContainer,
        thumbnailArt: !!this.thumbnailArt,
      });
      return;
    }
    const navbarRect = this.navbar.getBoundingClientRect();
    const headerRect = this.header.getBoundingClientRect();
    console.log('updateNavbar called, navbarRect.top:', navbarRect.top, 'headerRect.bottom:', headerRect.bottom, 'thumbnailArt src:', this.thumbnailArt?.src);
    if (navbarRect.top <= 0 && headerRect.bottom <= 0) {
      console.log('Adding sticky class to navbar');
      this.navbar.classList.add('sticky');
      this.albumArtContainer.classList.add('sticky');
      if (this.thumbnailArt) {
        this.thumbnailArt.style.display = 'none';
        this.thumbnailArt.offsetHeight;
        this.thumbnailArt.style.display = 'block';
      }
    } else {
      console.log('Removing sticky class from navbar');
      this.navbar.classList.remove('sticky');
      this.albumArtContainer.classList.remove('sticky');
    }
  }

  show() {
    this.container.classList.remove('hidden');
    document.getElementById('playback-overlay').style.display = 'flex';
    this.updateNavbar();
  }

  hide() {
    this.container.classList.add('hidden');
  }
}