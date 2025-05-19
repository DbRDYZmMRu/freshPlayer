// homeView.js
import { TracklistView } from './tracklistView.js';

export class HomeView {
  constructor(songState) {
    this.songState = songState;
    this.homeView = document.getElementById('home-view');
    this.carouselInner = document.getElementById('carousel-inner');
    this.recentlyPlayed = document.getElementById('recently-played');
    this.favourites = document.getElementById('favourites');
    this.freshPicks = document.getElementById('fresh-picks');
    this.playlistsContainer = document.getElementById('playlists');
    this.tracklistViews = {};
  }

  init() {
    this.render();
    this.songState.subscribe(state => this.render(state));
    this.bindEvents();
  }

  render(state = this.songState.getState()) {
    this.carouselInner.innerHTML = state.albums.map((album, index) => `
      <div class="carousel-item ${index === 0 ? 'active' : ''}" data-album-id="${album.id}">
        <img src="${album.cover}" class="d-block" alt="${album.title}">
        <div class="carousel-caption d-block">
          <h5>${album.title}</h5>
          <p>${album.artist}</p>
        </div>
      </div>
    `).join('');

    this.renderPlaylist(this.recentlyPlayed, state.recentlyPlayed, state.songs);
    this.renderPlaylist(this.favourites, state.favourites, state.songs);
    this.renderPlaylist(this.freshPicks, state.freshPicks, state.songs);

    // Render user playlists
    this.playlistsContainer.innerHTML = '';
    Object.keys(state.playlists).forEach(name => {
      const playlistDiv = document.createElement('div');
      playlistDiv.id = `playlist-${name.replace(/\s+/g, '-')}`;
      playlistDiv.className = 'playlist-section';
      this.playlistsContainer.appendChild(playlistDiv);
      const tracklistView = new TracklistView(this.songState, playlistDiv.id, name, name, 'playlist');
      tracklistView.init('home-view');
      this.tracklistViews[name] = tracklistView;
    });
  }

  renderPlaylist(container, songIds, songs) {
    container.innerHTML = songIds
      .map(id => songs.find(song => song.id === id))
      .filter(song => song)
      .map(song => `
        <div class="playlist-item" data-song-id="${song.id}">
          <img src="${song.thumbnail}" alt="${song.title}">
          <div class="track-title">${song.title}</div>
          <div class="track-artist">${song.artist}</div>
        </div>
      `).join('');
  }

  bindEvents() {
    this.carouselInner.addEventListener('click', e => {
      const item = e.target.closest('.carousel-item');
      if (item) {
        const albumId = item.dataset.albumId;
        this.songState.setAlbum(albumId);
        this.homeView.classList.add('hidden');
        document.getElementById('tracklist-view').classList.remove('hidden');
        document.getElementById('playback-overlay').style.display = 'flex';
      }
    });

    [this.recentlyPlayed, this.favourites, this.freshPicks].forEach(section => {
      section.addEventListener('click', e => {
        const item = e.target.closest('.playlist-item');
        if (item) {
          const songId = item.dataset.songId;
          this.songState.setSong(songId);
          this.homeView.classList.add('hidden');
          document.getElementById('detailed-player').classList.add('active');
          document.getElementById('playback-overlay').style.display = 'none';
          const img = document.getElementById('detailed-album-art');
          img.onload = () => this.applyGradient(img);
        }
      });
    });
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

  show() {
    this.homeView.classList.remove('hidden');
  }

  hide() {
    this.homeView.classList.add('hidden');
  }
}