// songState.js
import { albums } from './albums.js';

export class SongState {
  constructor() {
    this.audio = document.getElementById('audio-player');
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
      currentTrackIndex: -1, // Track index in current album
      currentTrackList: [] // Tracks of the current album
    };
    this.listeners = [];
    this.loadData();
    this.initAudioEvents();
  }
  
  initAudioEvents() {
    this.audio.addEventListener('timeupdate', () => this.updateProgress());
    this.audio.addEventListener('loadedmetadata', () => this.updateDuration());
    this.audio.addEventListener('ended', () => this.playNext());
    this.audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      this.state.currentSong.isPlaying = false;
      this.notify();
    });
  }
  
  async loadData() {
    try {
      const allTracks = [];
      const albumsWithTracks = await Promise.all(albums.map(async album => {
        const tracks = await Promise.all(album.tracks.map(async track => {
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
              data.cover :
              defaultCover;
            const thumbnailUrl = coverUrl !== defaultCover && coverUrl.includes('/musicpool/covers/') ?
              coverUrl.replace('/musicpool/covers/', '/musicpool/thumbnails/') :
              coverUrl;
            const trackData = {
              id: data.id,
              title: data.song_title,
              artist: data.writer,
              album: album.name,
              album_id: album.name,
              cover: coverUrl,
              thumbnail: thumbnailUrl,
              duration: '03:00', // Will be updated by audio metadata
              lyrics: data.lyrics,
              mp3_url: data.mp3_url
            };
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
      this.state.albums = albumsWithTracks.filter(album => album).filter(album => album.tracks.length > 0);
      this.state.songs = allTracks.filter(s => s);
      console.log(`Loaded ${this.state.albums.length} albums and ${this.state.songs.length} songs`);
      this.notify();
    } catch (error) {
      console.error('Error loading album data:', error.message);
    }
    localStorage.setItem('albumData', JSON.stringify({
      albums: this.state.albums,
      songs: this.state.songs
    }));
    
  }
  
  setSong(songId) {
    const song = this.state.songs.find(s => String(s.id) === String(songId)) || this.state.currentSong;
    const album = this.state.albums.find(a => a.id === song.album_id);
    this.state.currentSong = { ...song, isPlaying: false, currentTime: '00:00' };
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
  
  playNext() {
    if (this.state.currentTrackIndex < this.state.currentTrackList.length - 1) {
      this.state.currentTrackIndex++;
      this.setSong(this.state.currentTrackList[this.state.currentTrackIndex].id);
    }
  }
  
  playPrevious() {
    if (this.state.currentTrackIndex > 0) {
      this.state.currentTrackIndex--;
      this.setSong(this.state.currentTrackList[this.state.currentTrackIndex].id);
    }
  }
  
  seek(seconds) {
    this.audio.currentTime = Math.max(0, this.audio.currentTime + seconds);
  }
  
  seekTo(percentage) {
    if (this.audio.duration) {
      this.audio.currentTime = percentage * this.audio.duration;
    }
  }
  
  // songState.js
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