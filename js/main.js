// js/main.js
import { SongState } from './songState.js';
import { HomeView } from './homeView.js';
import { TracklistView } from './tracklistView.js';
import { DetailedView } from './detailedView.js';
import { LyricsView } from './lyricsView.js';
import { QueueView } from './queueView.js';

const songState = new SongState();
const homeView = new HomeView(songState);
const tracklistView = new TracklistView(songState, 'tracklist-view', 'Album', 'tracks', 'album');
const detailedView = new DetailedView(songState);
const lyricsView = new LyricsView(songState);
const queueView = new QueueView(songState);

function init() {
  homeView.init();
  tracklistView.init();
  detailedView.init(image => homeView.applyGradient(image));
  lyricsView.init(image => homeView.applyGradient(image));
  queueView.init();

  const playbackOverlay = document.getElementById('playback-overlay');
  const lyricsBackBtn = document.getElementById('lyrics-back-btn');
  const offcanvas = document.getElementById('trackMenu');
  const addToQueue = document.getElementById('add-to-queue');
  const addToPlaylist = document.getElementById('add-to-playlist'); // Fixed ID
  const createPlaylist = document.getElementById('create-playlist');

  playbackOverlay.addEventListener('click', e => {
    if (e.target.closest('.playback-control')) return;
    if (songState.getState().currentSong.title === 'Select a track') return;
    console.log('Playback overlay clicked, showing detailed view');
    homeView.hide();
    tracklistView.hide();
    detailedView.show();
    playbackOverlay.style.display = 'none';
    const img = document.getElementById('detailed-album-art');
    img.onload = () => homeView.applyGradient(img);
  });

  lyricsBackBtn.addEventListener('click', () => {
    console.log('Lyrics back button clicked');
    lyricsView.hide();
    detailedView.show();
    const img = document.getElementById('detailed-album-art');
    img.onload = () => homeView.applyGradient(img);
  });

  addToQueue.addEventListener('click', () => {
    const songId = offcanvas.dataset.songId;
    songState.addToQueue(songId);
    offcanvas._element.dispatchEvent(new Event('hidden.bs.offcanvas'));
  });

  addToPlaylist.addEventListener('click', () => {
    const songId = offcanvas.dataset.songId;
    const playlistName = prompt('Enter playlist name:');
    if (playlistName) {
      if (songState.createPlaylist(playlistName)) {
        songState.addToPlaylist(playlistName, songId);
      } else {
        alert('Playlist already exists!');
      }
    }
    offcanvas._element.dispatchEvent(new Event('hidden.bs.offcanvas'));
  });

  createPlaylist.addEventListener('click', () => {
    const playlistName = prompt('Enter new playlist name:');
    if (playlistName) {
      if (!songState.createPlaylist(playlistName)) {
        alert('Playlist already exists!');
      }
    }
    offcanvas._element.dispatchEvent(new Event('hidden.bs.offcanvas'));
  });
}

document.addEventListener('DOMContentLoaded', init);

function rgbToHsl(r, g, b) {
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

function hslToRgb(h, s, l) {
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

function adjustSaturation(rgb, saturationIncrease = 20) {
  const [h, s, l] = rgbToHsl(rgb[0], rgb[1], rgb[2]);
  const newSaturation = Math.min(100, s + saturationIncrease);
  const adjustedRgb = hslToRgb(h, newSaturation, l);
  return adjustedRgb;
}

function rgbToCssColor(rgb) {
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}

function applyGradient(img) {
  try {
    const colorThief = new ColorThief();
    const dominantColor = colorThief.getColor(img);
    const palette = colorThief.getPalette(img, 3);
    const saturatedDominant = adjustSaturation(dominantColor, 80);
    const saturatedSecondary = adjustSaturation(palette[1] || dominantColor, 30);
    const color1 = rgbToCssColor(saturatedDominant);
    const color2 = rgbToCssColor(saturatedSecondary);
    document.body.style.background = `linear-gradient(to bottom, ${color1}, ${color2})`;
    console.log(`Applied gradient: ${color1} to ${color2}`);
  } catch (error) {
    console.error('Error applying gradient:', error);
    document.body.style.background = 'linear-gradient(to bottom, #d4a5d9, #6b48ff)';
  }
}