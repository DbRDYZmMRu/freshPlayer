// songState.js
import { albums } from './albums.js';

export class SongState {
  constructor() {
    this.audio = document.getElementById('audio-player');
    this.silentAudio = new Audio('/audio/silent.mp3'); // Silent MP3 for audio focus
    this.state = {
      currentSong: {
        id: null,
        title: 'Select a track',
        album: 'Unknown',
        artist: 'Frith Hilton',
        cover: '/images/placeholder.jpg',
        thumbnail: '/images/placeholder.jpg',
        duration: '00:00',
        currentTime: '00:00',
        isPlaying: false,
        lyrics: [],
        mp3_url: null
      },
      currentAlbum: null,
      albums: [],
      songs: [],
      recentlyPlayed: [],
      favourites: ['14'],
      freshPicks: ['14'],
      currentTrackIndex: -1,
      currentTrackList: [],
      shuffle: false,
      repeat: 'off' // off, all, one
    };
    this.listeners = [];
    this.cache = new Map(); // In-memory cache for JSON data
    this.hasStarted = false; // For silent audio
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
    const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in ms
    const cachedData = localStorage.getItem(CACHE_KEY);
    
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_DURATION) {
        console.log('Loading from localStorage cache');
        this.state.albums = data.albums;
        this.state.songs = data.songs;
        this.notify();
        return;
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
              throw new Error(`All name formats failed for ${track}: ${lastError.message}`);
            }
            const defaultCover = '/images/placeholder.jpg';
            const coverUrl = data.cover && typeof data.cover === 'string' && data.cover.startsWith('http') ?
              data.cover : defaultCover;
            const thumbnailUrl = coverUrl !== defaultCover && coverUrl.includes('/musicpool/covers/') ?
              coverUrl.replace('/musicpool/covers/', '/musicpool/thumbnails/') : coverUrl;
            const trackData = {
              id: data.id,
              title: data.song_title,
              artist: data.writer,
              album: album.name,
              album_id: album.name,
              cover: coverUrl,
              thumbnail: thumbnailUrl,
              duration: '03:00',
              lyrics: data.lyrics,
              mp3_url: data.mp3_url
            };
            this.cache.set(cacheKey, trackData);
            allTracks.push(trackData);
            return trackData;
          } catch (error) {
            console.error(`Error loading ${track} for album ${album.name}: ${error.message}`);
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
          cover: validTracks[0]?.thumbnail || '/images/placeholder.jpg',
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
      this.notify();
    } catch (error) {
      console.error('Error loading album data:', error.message);
    }
  }

  setSong(songId) {
    const song = this.state.songs.find(s => String(s.id) === String(songId)) || this.state.currentSong;
    const album = this.state.albums.find(a => a.id === song.album_id);
    this.state.currentSong = { ...song, isPlaying: false, currentTime: '00:00', progress: 0 };
    this.state.currentAlbum = album;
    this.state.currentTrackList = album ? this.state.songs.filter(s => s.album_id === album.id) : [song];
    this.state.currentTrackIndex = this.state.currentTrackList.findIndex(s => s.id === songId);
    this.audio.src = song.mp3_url;
    this.state.recentlyPlayed = [songId, ...this.state.recentlyPlayed.filter(id => id !== songId)].slice(0, 5);
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
    this.state.currentAlbum = this.state.albums.find(a => a.id === albumId) || null;
    if (this.state.currentAlbum) {
      this.state.currentTrackList = this.state.songs.filter(s => s.album_id === albumId);
      this.state.currentTrackIndex = -1;
    }
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
    this.notify();
  }

  toggleShuffle() {
    this.state.shuffle = !this.state.shuffle;
    this.notify();
  }

  toggleRepeat() {
    const modes = ['off', 'all', 'one'];
    this.state.repeat = modes[(modes.indexOf(this.state.repeat) + 1) % modes.length];
    this.notify();
  }

  playNext() {
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

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  getState() {
    return { ...this.state };
  }
}