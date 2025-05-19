// js/songState.js
import { albums } from './albums.js';

export class SongState {
  constructor() {
    this.state = {
      songs: [],
      albums: [],
      currentSong: { id: null, title: 'Select a track', album: '', thumbnail: '', mp3_url: '', isPlaying: false, currentTime: '0:00', duration: '0:00', progress: 0, lyrics: [] },
      currentAlbum: null,
      queue: [],
      recentlyPlayed: [],
      favourites: [],
      playlists: {},
      navigationHistory: ['home-view'],
      shuffle: false,
      repeat: 'off',
      currentTrackList: [],
      currentTrackIndex: -1
    };
    this.audio = new Audio();
    this.subscribers = [];
    this.cache = new Map();
    this.progressDebounce = null;
    this.hasStarted = false;
    this.silentAudio = new Audio('data:audio/mpeg;base64,/+MYxAAAAANIAAAAAExBTUUzLjk4LjIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    this.loadData();
    this.initAudioEvents();
  }

  initAudioEvents() {
    this.audio.addEventListener('timeupdate', () => this.updateProgress());
    this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
    this.audio.addEventListener('ended', () => this.handleSongEnd());
    this.audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      this.state.currentSong.isPlaying = false;
      this.notify();
    });
  }

  async loadData() {
    const CACHE_KEY = 'albumData';
    const CACHE_DURATION = 24 * 60 * 60 * 1000;
    const cachedData = localStorage.getItem(CACHE_KEY);
    const savedState = localStorage.getItem('playerState');

    if (savedState) {
      try {
        const { favourites, playlists, queue, recentlyPlayed, shuffle, repeat } = JSON.parse(savedState);
        this.state.favourites = Array.isArray(favourites) ? favourites : ['14'];
        this.state.playlists = typeof playlists === 'object' && playlists !== null ? playlists : {};
        this.state.queue = Array.isArray(queue) ? queue : [];
        this.state.recentlyPlayed = Array.isArray(recentlyPlayed) ? recentlyPlayed : [];
        this.state.shuffle = typeof shuffle === 'boolean' ? shuffle : false;
        this.state.repeat = ['off', 'all', 'one'].includes(repeat) ? repeat : 'off';
      } catch (error) {
        console.error('Error parsing saved state:', error);
      }
    }

    if (cachedData) {
      try {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < CACHE_DURATION) {
          console.log('Loading from localStorage cache');
          this.state.albums = Array.isArray(data.albums) ? data.albums : [];
          this.state.songs = Array.isArray(data.songs) ? data.songs : [];
          this.notify();
          return;
        }
      } catch (error) {
        console.error('Error parsing cached data:', error);
      }
    }

    try {
      const allTracks = [];
      const albumsWithTracks = await Promise.all(albums.map(async album => {
        const tracks = await Promise.all(album.tracks.map(async track => {
          const cacheKey = `${album.name}/${track}`;
          if (this.cache.has(cacheKey)) {
            console.log(`Cache hit for ${cacheKey}`);
            return this.cache.get(cacheKey);
          }
          try {
            const nameFormats = [
              track.replace(/[^a-zA-Z0-9\s'()]/g, '').trim(),
              track.toLowerCase().replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_'),
              track.toLowerCase().replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-'),
              track.replace(/[^a-zA-Z0-9]/g, '').trim(),
              track.toLowerCase().replace(/[^a-zA-Z0-9\s'()]/g, '').trim()
            ];
            let data = null;
            let lastError = null;
            for (const format of nameFormats) {
              const url = `./albumJson/${album.name}/${encodeURIComponent(format)}.json`;
              try {
                const response = await fetch(url);
                if (!response.ok) {
                  const text = await response.text().catch(() => 'No response body');
                  throw new Error(`HTTP ${response.status}: ${text}`);
                }
                data = await response.json();
                console.log(`Loaded ${url} successfully`);
                break;
              } catch (error) {
                lastError = error;
                console.warn(`Failed to fetch ${url}: ${error.message}`);
              }
            }
            if (!data) {
              throw new Error(`All name formats failed for ${track}: ${lastError?.message || 'Unknown error'}`);
            }
            const trackData = {
              id: data.id || `${album.name}-${track.replace(/[^a-zA-Z0-9]/g, '')}`,
              title: data.song_title || track,
              artist: data.writer || 'Frith Hilton',
              album: album.name,
              album_id: album.name,
              cover: data.cover || 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png', // Track-specific cover
              thumbnail: data.thumbnail || data.cover || 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png', // Track-specific thumbnail
              duration: data.duration || '03:00',
              lyrics: Array.isArray(data.lyrics) ? data.lyrics : [],
              mp3_url: data.mp3_url || ''
            };
            this.cache.set(cacheKey, trackData);
            allTracks.push(trackData);
            return trackData;
          } catch (error) {
            console.error(`Error loading ${track} for album ${album.name}:`, error.message);
            return null;
          }
        }));
        const validTracks = tracks.filter(t => t);
        if (validTracks.length === 0) {
          console.warn(`No valid tracks loaded for album ${album.name}`);
          return null;
        }
        return {
          id: album.name,
          title: album.name,
          artist: 'Frith Hilton',
          cover: album.cover || 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png', // Album cover from albums.js
          release_date: album.releaseDate,
          tracks: validTracks.map(t => t.id)
        };
      }));
      this.state.albums = albumsWithTracks.filter(album => album && album.tracks.length > 0);
      this.state.songs = allTracks.filter(s => s);
      console.log(`Loaded ${this.state.albums.length} albums and ${this.state.songs.length} songs`);
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data: { albums: this.state.albums, songs: this.state.songs },
        timestamp: Date.now()
      }));
      this.saveState();
      this.notify();
    } catch (error) {
      console.error('Error loading album data:', error);
    }
  }

  saveState() {
    try {
      localStorage.setItem('playerState', JSON.stringify({
        favourites: this.state.favourites,
        playlists: this.state.playlists,
        queue: this.state.queue,
        recentlyPlayed: this.state.recentlyPlayed,
        shuffle: this.state.shuffle,
        repeat: this.state.repeat,
        navigationHistory: this.state.navigationHistory
      }));
    } catch (error) {
      console.error('Error saving state:', error);
    }
  }

  notify() {
    this.subscribers.forEach(callback => {
      try {
        callback(this.state);
      } catch (error) {
        console.error('Error in subscriber callback:', error);
      }
    });
  }

  setSong(songId, fromQueue = false) {
    const song = this.state.songs.find(s => String(s.id) === String(songId)) || this.state.currentSong;
    const album = this.state.albums.find(a => a.id === song.album_id);
    this.state.currentSong = { ...song, isPlaying: false, currentTime: '0:00', progress: 0 };
    this.state.currentAlbum = album;
    this.state.currentTrackList = album ? this.state.songs.filter(s => s.album_id === album.id) : [song];
    this.state.currentTrackIndex = fromQueue ? -1 : this.state.currentTrackList.findIndex(s => s.id === songId);
    this.audio.src = song.mp3_url;
    this.state.recentlyPlayed = [songId, ...this.state.recentlyPlayed.filter(id => id !== songId)].slice(0, 5);
    if (fromQueue) {
      this.state.queue = this.state.queue.filter(id => id !== songId);
    }
    this.saveState();
    this.notify();
    this.audio.play().then(() => {
      this.state.currentSong.isPlaying = true;
      this.notify();
    }).catch(error => {
      console.error('Playback error:', error);
      this.state.currentSong.isPlaying = false;
      this.notify();
    });
  }

  setAlbum(albumId) {
    const album = this.state.albums.find(a => a.id === albumId) || null;
    this.state.currentAlbum = album;
    if (album) {
      this.state.currentTrackList = this.state.songs.filter(s => s.album_id === albumId);
      this.state.currentTrackIndex = -1;
    }
    this.saveState();
    this.notify();
  }

  togglePlay() {
    if (!this.state.currentSong.mp3_url) return;
    if (!this.hasStarted) {
      this.silentAudio.play().catch(() => console.log('Silent audio blocked'));
      document.querySelectorAll('audio').forEach(audio => {
        if (audio !== this.audio && !audio.paused) audio.pause();
      });
      this.hasStarted = true;
    }
    if (this.state.currentSong.isPlaying) {
      this.audio.pause();
      this.state.currentSong.isPlaying = false;
    } else {
      this.audio.play().then(() => {
        this.state.currentSong.isPlaying = true;
      }).catch(error => {
        console.error('Playback error:', error);
        this.state.currentSong.isPlaying = false;
      });
    }
    this.saveState();
    this.notify();
  }

  toggleShuffle() {
    this.state.shuffle = !this.state.shuffle;
    this.saveState();
    this.notify();
  }

  toggleRepeat() {
    const modes = ['off', 'all', 'one'];
    this.state.repeat = modes[(modes.indexOf(this.state.repeat) + 1) % modes.length];
    this.saveState();
    this.notify();
  }

  addToQueue(songId) {
    if (!this.state.songs.find(s => s.id === songId)) return;
    this.state.queue = [...this.state.queue, songId];
    this.saveState();
    this.notify();
  }

  removeFromQueue(songId) {
    this.state.queue = this.state.queue.filter(id => id !== songId);
    this.saveState();
    this.notify();
  }

  clearQueue() {
    this.state.queue = [];
    this.saveState();
    this.notify();
  }

  toggleFavourite(songId) {
    if (this.state.favourites.includes(songId)) {
      this.state.favourites = this.state.favourites.filter(id => id !== songId);
    } else {
      this.state.favourites = [...this.state.favourites, songId];
    }
    this.saveState();
    this.notify();
  }

  createPlaylist(name) {
    if (!name || this.state.playlists[name]) {
      console.log(`Playlist "${name}" already exists`);
      return false;
    }
    this.state.playlists[name] = [];
    this.saveState();
    this.notify();
    return true;
  }

  deletePlaylist(name) {
    if (!this.state.playlists[name]) return false;
    delete this.state.playlists[name];
    this.saveState();
    this.notify();
    return true;
  }

  renamePlaylist(oldName, newName) {
    if (!this.state.playlists[oldName] || !newName || this.state.playlists[newName]) {
      console.log(`Cannot rename "${oldName}" to "${newName}": invalid or exists`);
      return false;
    }
    this.state.playlists[newName] = this.state.playlists[oldName];
    delete this.state.playlists[oldName];
    this.saveState();
    this.notify();
    return true;
  }

  addToPlaylist(playlistName, songId) {
    if (!this.state.playlists[playlistName] || !this.state.songs.find(s => s.id === songId)) {
      console.log(`Invalid playlist "${playlistName}" or song "${songId}"`);
      return false;
    }
    if (!this.state.playlists[playlistName].includes(songId)) {
      this.state.playlists[playlistName].push(songId);
      this.saveState();
      this.notify();
    }
    return true;
  }

  removeSongFromPlaylist(playlistName, songId) {
    if (!this.state.playlists[playlistName]) return false;
    this.state.playlists[playlistName] = this.state.playlists[playlistName].filter(id => id !== songId);
    this.saveState();
    this.notify();
    return true;
  }

  reorderPlaylist(playlistName, newOrder) {
    if (!this.state.playlists[playlistName]) return false;
    const validOrder = newOrder.filter(id => this.state.playlists[playlistName].includes(id));
    if (validOrder.length !== this.state.playlists[playlistName].length) return false;
    this.state.playlists[playlistName] = validOrder;
    this.saveState();
    this.notify();
    return true;
  }

  pushView(viewId) {
    this.state.navigationHistory.push(viewId);
    this.saveState();
    this.notify();
  }

  popView() {
    if (this.state.navigationHistory.length <= 1) {
      this.state.navigationHistory = ['home-view'];
      this.saveState();
      this.notify();
      return 'home-view';
    }

    const notAllowedViews = ['lyrics-player', 'queue-player'];
    this.state.navigationHistory.pop();
    let previousView = 'home-view';

    for (let i = this.state.navigationHistory.length - 1; i >= 0; i--) {
      if (!notAllowedViews.includes(this.state.navigationHistory[i])) {
        previousView = this.state.navigationHistory[i];
        break;
      }
    }

    this.state.navigationHistory = this.state.navigationHistory.slice(0, this.state.navigationHistory.indexOf(previousView) + 1);
    this.saveState();
    this.notify();
    return previousView;
  }

  getPreviousAllowedView() {
    const notAllowedViews = ['lyrics-player', 'queue-player'];
    for (let i = this.state.navigationHistory.length - 1; i >= 0; i--) {
      if (!notAllowedViews.includes(this.state.navigationHistory[i])) {
        return this.state.navigationHistory[i];
      }
    }
    return 'home-view';
  }

  clearNavigationHistory() {
    this.state.navigationHistory = ['home-view'];
    this.saveState();
    this.notify();
  }

  playNext() {
    if (this.state.queue.length > 0) {
      const nextSongId = this.state.queue[0];
      this.setSong(nextSongId, true);
      return;
    }
    if (!this.state.currentTrackList.length) return;
    let nextIndex;
    if (this.state.shuffle) {
      nextIndex = Math.floor(Math.random() * this.state.currentTrackList.length);
    } else {
      nextIndex = this.state.currentTrackIndex + 1;
      if (nextIndex >= this.state.currentTrackList.length) {
        nextIndex = this.state.repeat === 'all' ? 0 : -1;
      }
    }
    if (nextIndex >= 0) {
      this.setSong(this.state.currentTrackList[nextIndex].id);
    } else {
      this.audio.pause();
      this.state.currentSong.isPlaying = false;
      this.state.currentTrackIndex = -1;
      this.notify();
    }
  }

  playPrevious() {
    if (this.state.queue.length > 0) {
      const nextSongId = this.state.queue[0];
      this.setSong(nextSongId, true);
      return;
    }
    if (!this.state.currentTrackList.length) return;
    let prevIndex;
    if (this.state.shuffle) {
      prevIndex = Math.floor(Math.random() * this.state.currentTrackList.length);
    } else {
      prevIndex = this.state.currentTrackIndex - 1;
      if (prevIndex < 0) {
        prevIndex = this.state.repeat === 'all' ? this.state.currentTrackList.length - 1 : -1;
      }
    }
    if (prevIndex >= 0) {
      this.setSong(this.state.currentTrackList[prevIndex].id);
    } else {
      this.audio.currentTime = 0;
      this.notify();
    }
  }

  handleSongEnd() {
    if (this.state.repeat === 'one') {
      this.audio.currentTime = 0;
      this.audio.play().then(() => {
        this.state.currentSong.isPlaying = true;
        this.notify();
      });
    } else {
      this.playNext();
    }
  }

  seek(seconds) {
    if (!this.state.currentSong.mp3_url) return;
    this.audio.currentTime = Math.max(0, Math.min(this.audio.currentTime + seconds, this.audio.duration || Infinity));
    this.notify();
  }

  seekTo(percentage) {
    if (this.audio.duration) {
      this.audio.currentTime = percentage * this.audio.duration;
      this.notify();
    }
  }

  updateProgress() {
    if (this.audio.duration) {
      const currentTime = this.audio.currentTime;
      const duration = this.audio.duration;
      this.state.currentSong.currentTime = this.formatTime(currentTime);
      this.state.currentSong.progress = (currentTime / duration) * 100;
      if (!this.progressDebounce) {
        this.progressDebounce = setTimeout(() => {
          this.notify();
          this.progressDebounce = null;
        }, 100);
      }
    }
  }

  updateDuration() {
    if (this.audio.duration) {
      this.state.currentSong.duration = this.formatTime(this.audio.duration);
      this.notify();
    }
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  getState() {
    return { ...this.state };
  }
}