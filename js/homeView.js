// js/homeView.js
import { TracklistView } from './tracklistView.js';
import { RecentlyPlayedView } from './recentlyPlayedView.js';
import { FavouritesView } from './favouritesView.js';
import { generateCollage } from './utils.js';

export class HomeView {
  constructor(songState, app) {
    this.songState = songState;
    this.app = app;
    this.homeView = document.getElementById('home-view');
    this.carouselInner = document.getElementById('carousel-inner');
    this.recentlyPlayed = document.getElementById('recently-played');
    this.favourites = document.getElementById('favourites');
    this.freshPicks = document.getElementById('fresh-picks');
    this.playlistsContainer = document.getElementById('playlists');
    this.albumsSection = document.getElementById('albums-section');
    this.carousel = null;
  }

  init() {
    if (!this.homeView) {
      console.error('home-view element not found');
      return;
    }
    const carouselElement = document.getElementById('latest-releases-carousel');
    if (carouselElement) {
      try {
        this.carousel = new bootstrap.Carousel(carouselElement, {
          interval: 5000,
          ride: 'carousel',
          pause: false,
          touch: true,
        });
        console.log('Carousel initialized');
      } catch (error) {
        console.error('Failed to initialize carousel:', error);
      }
    }
    this.render();
    this.songState.subscribe(this.debounce((state) => {
      console.log('HomeView: State updated, favourites:', state.favourites, 'length:', state.favourites?.length || 0);
      this.render(state);
    }, 150));
    this.bindEvents();
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

  async render(state = this.songState.getState()) {
    try {
      console.log('Rendering HomeView, state:', state);
      if (!this.carouselInner) {
        console.error('carousel-inner element not found');
      } else {
        this.carouselInner.innerHTML = Array.isArray(state.albums) && state.albums.length > 0
          ? state.albums
              .map(
                (album, index) => `
              <div class="carousel-item ${index === 0 ? 'active' : ''}" data-album-id="${album.id}">
                <img src="${album.cover || '/images/placeholder.png'}" class="d-block w-100" alt="${album.title}" onerror="this.src='/images/placeholder.png'">
                <div class="carousel-caption d-block">
                  <h5>${album.title}</h5>
                  <p>${album.artist}</p>
                </div>
              </div>
            `
              )
              .join('')
          : '<div class="carousel-item active"><p>No albums available</p></div>';
      }

      // Render playlists
      this.renderPlaylist(this.recentlyPlayed, state.recentlyPlayed || [], state.songs, 'Recently Played');
      this.renderPlaylist(this.freshPicks, state.freshPicks || [], state.songs, 'Fresh Picks');

      if (this.favourites) {
        const favouriteSongs =
          Array.isArray(state.favourites) && state.favourites.length > 0
            ? state.favourites
                .slice(0, 4)
                .map((id) => state.songs.find((song) => song.id === id))
                .filter((song) => song)
            : [];
        console.log('Favourites rendering, songs:', favouriteSongs, 'total count:', state.favourites?.length || 0);
        const collageHtml = generateCollage(favouriteSongs, 'small');
        this.favourites.innerHTML =
          favouriteSongs.length > 0
            ? favouriteSongs
                .map(
                  (song) => `
              <div class="playlist-item" data-song-id="${song.id}">
                <img src="${song.thumbnail || '/images/placeholder.png'}" alt="${song.title}" onerror="this.src='/images/placeholder.png'">
                <div class="track-title">${song.title}</div>
                <div class="track-artist">${song.artist}</div>
              </div>
            `
                )
                .join('') +
              (state.favourites.length > 4
                ? `
            <div class="view-all-cover-container" data-view="favourites-view">
              ${collageHtml}
              <div class="overlay-label">View All</div>
            </div>
          `
                : '')
            : '<p>No songs in Favourites</p>';
      }

      if (this.playlistsContainer) {
        this.playlistsContainer.innerHTML =
          Array.isArray(Object.keys(state.playlists)) && Object.keys(state.playlists).length > 0
            ? await Promise.all(
                Object.entries(state.playlists).map(async ([name, songIds]) => {
                  const tracks = songIds.map((id) => state.songs.find((s) => s.id === id)).filter((s) => s);
                  const collageHtml = generateCollage(tracks, 'small');
                  return `
              <div class="playlist-item" data-playlist-name="${name}">
                ${collageHtml}
                <div class="track-title">${name}</div>
                <div class="track-artist">${tracks.length} songs</div>
              </div>
            `;
                })
              ).then((html) => html.join(''))
            : '<p>No playlists available</p>';
      }

      if (this.albumsSection) {
        this.albumsSection.innerHTML =
          Array.isArray(state.albums) && state.albums.length > 0
            ? state.albums
                .map(
                  (album) => `
              <div class="album-item" data-album-id="${album.id}">
                <img src="${album.cover || '/images/placeholder.png'}" alt="${album.title}" class="album-thumbnail" onerror="this.src='/images/placeholder.png'">
                <div class="album-details">
                  <div class="album-title">${album.title}</div>
                  <div class="album-artist">${album.artist}</div>
                </div>
              </div>
            `
                )
                .join('')
            : '<p>No albums available</p>';
      }
    } catch (error) {
      console.error('Error in HomeView.render:', error);
      this.homeView.innerHTML = '<p>Error loading home view. Please try again.</p>';
    }
  }

  async renderPlaylist(container, songIds, songs, sectionName) {
    if (!container) {
      console.warn(`Container for ${sectionName} not found`);
      return;
    }
    const validSongIds = Array.isArray(songIds) ? songIds : [];
    console.log(`Rendering ${sectionName}, songIds:`, validSongIds, 'songs:', songs);

    const playlistSongs =
      validSongIds.length > 0
        ? validSongIds
            .slice(0, 4)
            .map((id) => songs.find((song) => song.id === id))
            .filter((song) => song)
        : [];
    const collageHtml = generateCollage(playlistSongs, 'small');
    container.innerHTML =
      playlistSongs.length > 0
        ? playlistSongs
            .map(
              (song) => `
          <div class="playlist-item" data-song-id="${song.id}">
            <img src="${song.thumbnail || '/images/placeholder.png'}" alt="${song.title}" onerror="this.src='/images/placeholder.png'">
            <div class="track-title">${song.title}</div>
            <div class="track-artist">${song.artist}</div>
          </div>
        `
            )
            .join('') +
          (validSongIds.length > 4
            ? `
          <div class="view-all-cover-container" data-view="${sectionName.toLowerCase().replace(' ', '-')}-view">
            ${collageHtml}
            <div class="overlay-label">View All</div>
          </div>
        `
            : '')
        : `<p>No songs in ${sectionName}</p>`;
  }

  bindEvents() {
    try {
      if (this.carouselInner) {
        this.carouselInner.addEventListener('click', (e) => {
          const item = e.target.closest('.carousel-item');
          if (item) {
            const albumId = item.dataset.albumId;
            this.songState.setAlbum(albumId);
            this.songState.pushView('tracklist-view');
            this.homeView.classList.add('hidden');
            document.getElementById('tracklist-view').classList.remove('hidden');
            document.getElementById('playback-overlay').style.display = 'flex';
          }
        });
      }

      const sections = [this.recentlyPlayed, this.favourites, this.freshPicks].filter(Boolean);
      sections.forEach((section) => {
        section.addEventListener('click', (e) => {
          const item = e.target.closest('.playlist-item');
          const coverContainer = e.target.closest('.view-all-cover-container');
          if (coverContainer) {
            e.preventDefault();
            const viewId = coverContainer.dataset.view;
            console.log('Cover clicked for:', viewId);
            if (viewId === 'favourites-view') {
              this.app.views['favourites-view'] = new FavouritesView(
                this.songState,
                'favourites-view',
                'Favourites',
                'favourites',
                this.applyGradient.bind(this),
                this.app
              );
              this.app.views['favourites-view'].init('home-view');
              this.songState.pushView('favourites-view');
              this.app.showView('favourites-view');
            } else if (viewId === 'recently-played-view') {
              if (!document.getElementById('recently-played-view')) {
                console.error('recently-played-view element not found');
                return;
              }
              this.app.views['recently-played-view'] = new RecentlyPlayedView(
                this.songState,
                this.applyGradient.bind(this),
                this.app
              );
              this.app.views['recently-played-view'].init('home-view');
              this.songState.pushView('recently-played-view');
              this.app.showView('recently-played-view');
            }
          } else if (item) {
            const songId = item.dataset.songId;
            this.songState.setSong(songId);
            this.songState.pushView('detailed-player');
            this.homeView.classList.add('hidden');
            document.getElementById('detailed-player').classList.add('active');
            document.getElementById('playback-overlay').style.display = 'none';
            const img = document.getElementById('detailed-album-art');
            img.onload = () => this.applyGradient(img);
          }
        });
      });

      if (this.albumsSection) {
        this.albumsSection.addEventListener('click', (e) => {
          const item = e.target.closest('.album-item');
          if (item) {
            const albumId = item.dataset.albumId;
            this.songState.setAlbum(albumId);
            this.songState.pushView('tracklist-view');
            this.homeView.classList.add('hidden');
            document.getElementById('tracklist-view').classList.remove('hidden');
            document.getElementById('playback-overlay').style.display = 'flex';
          }
        });
      }

      const createPlaylistBtn = document.getElementById('create-playlist-btn');
      if (createPlaylistBtn) {
        createPlaylistBtn.addEventListener('click', () => {
          try {
            const modalElement = document.getElementById('playlist-modal');
            if (!modalElement) {
              console.error('playlist-modal element not found');
              return;
            }
            const modal = new bootstrap.Modal(modalElement, {
              backdrop: true,
              keyboard: true,
            });
            document.getElementById('playlist-modal-title').textContent = 'Create Playlist';
            document.getElementById('playlist-name-input').value = '';
            document.getElementById('playlist-action').dataset.action = 'create';
            modal.show();
          } catch (error) {
            console.error('Error opening playlist modal:', error);
          }
        });
      }
    } catch (error) {
      console.error('Error in HomeView.bindEvents:', error);
    }
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
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;
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
    h /= 360;
    s /= 100;
    l /= 100;
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

  show() {
    this.homeView.classList.remove('hidden');
    document.getElementById('playback-overlay').style.display = 'flex';
    if (this.carousel) {
      this.carousel.cycle();
      console.log('Carousel resumed');
    }
  }

  hide() {
    this.homeView.classList.add('hidden');
    document.getElementById('playback-overlay').style.display = 'none';
    if (this.carousel) {
      this.carousel.pause();
      console.log('Carousel paused');
    }
  }
}