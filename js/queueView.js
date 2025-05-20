// js/queueView.js
export class QueueView {
  constructor(songState) {
    this.songState = songState;
    this.queuePlayer = document.getElementById('queue-player');
    this.toggleBtn = document.getElementById('queue-toggle-btn');
    this.clearBtn = document.getElementById('queue-clear-btn');
    this.tracklist = document.querySelector('#queue-player .tracklist');
    this.app = document.querySelector('body').__app;
  }
  
  init() {
    if (!this.queuePlayer) {
      console.error('queue-player element not found');
      return;
    }
    if (!this.app) {
      console.error('App instance not found for overlay navigation');
    }
    this.render();
    this.bindEvents();
    this.songState.subscribe(state => this.render(state));
  }
  
  render(state = this.songState.getState()) {
    try {
      const { queue, songs } = state;
      this.tracklist.innerHTML = queue.length > 0 ?
        queue.map(songId => {
          const song = songs.find(s => s.id === songId);
          if (!song) return '';
          return `
              <div class="track-item d-flex align-items-center p-2" data-song-id="${song.id}">
                <img src="${song.thumbnail || 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png'}" alt="${song.title}" class="track-thumbnail me-2" style="width: 40px; height: 40px;">
                <div class="track-info">
                  <div class="track-title">${song.title}</div>
                  <div class="track-artist text-muted">${song.artist || 'Frith Hilton'}</div>
                </div>
                <button class="btn btn-sm btn-outline-light ms-auto remove-btn">Remove</button>
              </div>
            `;
        }).join('') :
        '<p class="text-muted p-2">Queue is empty</p>';
    } catch (error) {
      console.error('Error in QueueView.render:', error);
    }
  }
  
  bindEvents() {
    try {
      if (this.toggleBtn && this.app) {
        this.toggleBtn._handler = () => {
          console.log('Queue toggle button clicked, returning to detailed-player');
          this.app.showOverlayView('detailed-player');
        };
        this.toggleBtn.addEventListener('click', this.toggleBtn._handler);
      }
      
      if (this.clearBtn) {
        this.clearBtn._handler = () => {
          console.log('Clear queue button clicked');
          this.songState.clearQueue();
        };
        this.clearBtn.addEventListener('click', this.clearBtn._handler);
      }
      
      this.tracklist._handler = (e) => {
        const removeBtn = e.target.closest('.remove-btn');
        if (removeBtn) {
          const songId = removeBtn.closest('.track-item').dataset.songId;
          if (songId) {
            console.log(`Removing song ${songId} from queue`);
            this.songState.removeFromQueue(songId);
          }
        }
      };
      this.tracklist.addEventListener('click', this.tracklist._handler);
    } catch (error) {
      console.error('Error in QueueView.bindEvents:', error);
    }
  }
  
  show() {
    this.queuePlayer.classList.remove('hidden');
    document.getElementById('playback-overlay').style.display = 'none';
  }
  
  hide() {
    this.queuePlayer.classList.add('hidden');
  }
}