import { albums } from './albums.js';

export class SongState {
  constructor() {
    this.state = {
      currentSong: {
        id: null,
        title: 'Select a track',
        album: 'Unknown',
        artist: 'Frith Hilton',
        cover: '/images/placeholder.jpg', // Local or reliable placeholder
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
      favourites: ['14'], // Example: Conterminous
      freshPicks: ['14'] // Example: Conterminous
    };
    this.listeners = [];
    this.loadData();
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
                  throw new Error(`HTTP ${response.status}: ${response.statusText} - ${text}`);
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
            
            // Validate cover URL
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
              duration: '03:00',
              lyrics: data.lyrics,
              mp3_url: data.mp3_url
            };
            console.log(`Track: ${track}, Cover: ${trackData.cover}, Thumbnail: ${trackData.thumbnail}`);
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
      this.state.songs.forEach(song => {
        console.log(`Song: ${song.title}, ID: ${song.id}, Album: ${song.album}, Cover: ${song.cover}`);
      });
      this.notify();
    } catch (error) {
      console.error('Error loading album data:', error.message);
    }
  }
  
  setSong(songId) {
    const song = this.state.songs.find(s => String(s.id) === String(songId)) || this.state.currentSong;
    this.state.currentSong = {
      ...song,
      isPlaying: true,
      currentTime: '00:00'
    };
    this.state.recentlyPlayed = [songId, ...this.state.recentlyPlayed.filter(id => id !== songId)].slice(0, 5);
    this.notify();
  }
  
  setAlbum(albumId) {
    this.state.currentAlbum = this.state.albums.find(a => a.id === albumId) || null;
    this.notify();
  }
  
  togglePlay() {
    this.state.currentSong.isPlaying = !this.state.currentSong.isPlaying;
    this.notify();
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