// js/playlistView.js
export class PlaylistView {
  constructor(songState, containerId, title, tracksKey, applyGradientCallback = null) {
    this.songState = songState;
    this.container = document.getElementById(containerId);
    this.tracklist = this.container.querySelector('.tracklist') || document.createElement('div');
    this.tracklist.className = 'tracklist';
    this.container.appendChild(this.tracklist);
    this.titleElement = document.createElement('h3');
    this.titleElement.className = 'section-title mt-3 mb-2';
    this.container.prepend(this.titleElement);
    this.subtitleElement = document.createElement('p');
    this.subtitleElement.className = 'text-muted';
    this.container.insertBefore(this.subtitleElement, this.tracklist);
    this.playbackOverlay = document.getElementById('playback-overlay');
    this.offcanvasElement = document.getElementById('trackMenu');
    this.offcanvas = new bootstrap.Offcanvas(this.offcanvasElement);
    this.offcanvasTitle = this.offcanvasElement.querySelector('.offcanvas-title');
    this.title = title;
    this.tracksKey = tracksKey;
    this.applyGradientCallback = applyGradientCallback;
  }
  
  init(backTarget = 'home-view') {
    this.updateUI(this.songState.getState());
    this.songState.subscribe(state => this.updateUI(state));
    this.bindEvents(backTarget);
  }
  
  updateUI(state) {
    const tracks = (state.playlists[this.tracksKey] || [])
      .map(songId => state.songs.find(s => s.id === songId))
      .filter(s => s);
    this.titleElement.textContent = this.title;
    this.subtitleElement.textContent = `${tracks.length} songs`;
    
    this.tracklist.innerHTML = tracks.length > 0 ? tracks
      .map((song, index) => `
        <div class="tracklist-item ${state.currentSong.id === song.id ? 'active' : ''}" data-track="${index + 1}" data-song-id="${song.id}" data-title="${song.title}" data-duration="${song.duration}" draggable="true">
          <div class="track-info">
            <img src="${song.thumbnail}" class="track-thumbnail" alt="${song.title}">
            <span class="track-number opacity-75">${index + 1}</span>
            <div class="track-details">
              <div class="track-title">${song.title}</div>
              <div class="track-duration">${song.duration}</div>
            </div>
          </div>
          <button class="remove-song btn p-0" data-song-id="${song.id}">🗑️</button>
          <span class="menu-icon" data-bs-toggle="offcanvas" data-bs-target="#trackMenu">⋮</span>
        </div>
      `).join('') : '<p>No songs available</p>';
  }
  
  bindEvents(backTarget) {
    if (this.tracklist) {
      this.tracklist.addEventListener('dragstart', e => {
        const item = e.target.closest('.tracklist-item');
        if (item) {
          e.dataTransfer.setData('text/plain', item.dataset.songId);
          item.classList.add('dragging');
        }
      });
      
      this.tracklist.addEventListener('dragend', e => {
        const item = e.target.closest('.tracklist-item');
        if (item) item.classList.remove('dragging');
      });
      
      this.tracklist.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = this.getDragAfterElement(e.clientY);
        const draggable = this.tracklist.querySelector('.dragging');
        if (afterElement == null) {
          this.tracklist.appendChild(draggable);
        } else {
          this.tracklist.insertBefore(draggable, afterElement);
        }
      });
      
      this.tracklist.addEventListener('drop', e => {
        e.preventDefault();
        const songId = e.dataTransfer.getData('text/plain');
        const newOrder = Array.from(this.tracklist.querySelectorAll('.tracklist-item')).map(item => item.dataset.songId);
        this.songState.reorderPlaylist(this.tracksKey, newOrder);
      });
      
      this.tracklist.addEventListener('click', e => {
        const removeBtn = e.target.closest('.remove-song');
        if (removeBtn) {
          const songId = removeBtn.dataset.songId;
          this.songState.removeSongFromPlaylist(this.tracksKey, songId);
          return;
        }
        const item = e.target.closest('.tracklist-item');
        if (item && !e.target.classList.contains('menu-icon')) {
          document.querySelectorAll('.tracklist-item').forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          const songId = item.dataset.songId;
          this.songState.setSong(songId);
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
    
    document.querySelectorAll('.menu-icon').forEach(icon => {
      if (icon._handler) {
        icon.removeEventListener('click', icon._handler);
      }
      icon._handler = e => {
        e.stopPropagation();
        const trackItem = icon.closest('.tracklist-item');
        this.offcanvasTitle.textContent = trackItem.dataset.title;
        this.offcanvas.dataset.songId = trackItem.dataset.songId;
        this.offcanvas.dataset.playlistName = this.tracksKey;
        this.offcanvas.show();
      };
      icon.addEventListener('click', icon._handler);
    });
  }
  
  getDragAfterElement(y) {
    const draggableElements = [...this.tracklist.querySelectorAll('.tracklist-item:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
  
  show() {
    this.container.classList.remove('hidden');
    document.getElementById('playback-overlay').style.display = 'none';
  }
  
  hide() {
    this.container.classList.add('hidden');
  }
}