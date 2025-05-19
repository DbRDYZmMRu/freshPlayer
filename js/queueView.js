// js/queueView.js
import { TracklistView } from './tracklistView.js';

export class QueueView {
  constructor(songState) {
    this.songState = songState;
    this.queuePlayer = document.getElementById('queue-player');
    this.backBtn = document.getElementById('queue-back-btn');
    this.clearBtn = document.getElementById('queue-clear-btn');
    this.tracklistView = new TracklistView(songState, 'queue-player', 'Queue', 'queue', 'queue');
  }
  
  init() {
    this.tracklistView.init('detailed-player');
    this.bindEvents();
  }
  
  bindEvents() {
    if (this.backBtn) {
      this.backBtn.addEventListener('click', () => {
        this.queuePlayer.classList.remove('active');
        document.getElementById('detailed-player').classList.add('active');
        document.body.style.background = 'linear-gradient(to bottom, #d4a5d9, #6b48ff)';
      });
    }
    
    if (this.clearBtn) {
      this.clearBtn.addEventListener('click', () => {
        this.songState.clearQueue();
      });
    }
  }
  
  show() {
    this.queuePlayer.classList.add('active');
  }
  
  hide() {
    this.queuePlayer.classList.remove('active');
  }
}