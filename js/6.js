I'm working on a web player for playing music, it loads ithrough a json that powers the whole Web app


These are my files

js/album.js

export const albums = [
  {
    name: 'H.I.V',
    cover: 'https://frithhilton.com.ng/musicpool/covers/1/album_cover/1.jpg', 
    releaseDate: 'April 17, 2019',
    tracks: [
      'What is Love', 'Real Friends', 'Spotlight', 'Bleeding Heart', 'Rollie Dreams',
      'Bad Vibez', 'My Heart', 'Interlude', 'What is Real', 'Sunday Special',
      'Hurt You', 'Two Bad Bitches', "What's the Price?"
    ]
  },
  {
    name: 'colourful light',
    cover: 'https://frithhilton.com.ng/musicpool/covers/2/album_cover/2.jpg', 
    releaseDate: 'January 18, 2023',
    tracks: [
      'Conterminous', 'Forever', 'Not on my mobile', 'No prolix', 'Clones', 'Needle',
      'Gold pack', 'Endorphin', 'Never what it means', 'How you had me', "I won't say it",
      'On you', 'Little girl', 'Ogre', 'Living video record', 'So long', 'No telling',
      'Pepperoni freestyle', 'May 1st', 'Plunge (Interlude)', 'Next to you', 'Above',
      'Warden', 'Automatic', 'Colourful light', 'Gravity', 'Malady', 'Favourite girl',
      'Baby sways', 'What she does'
    ]
  },
  {
    name: 'December 13',
    cover: 'https://frithhilton.com.ng/musicpool/covers/3/album_cover/3.jpg', 
    releaseDate: 'January 10, 2022',
    tracks: [
      'Anarchy', 'December 13', "Can't have you", 'Got a bitch a valve', 'Tom',
      "Still can't swim", 'Well with her eff fame', 'Lili Fallon', 'Missing you',
      'My girl', 'Forest', 'Flutter', 'No. 13 a bore', 'Partner', 'Something simple',
      'Aperient flow', 'Six', 'Beethovenian', 'Outside', 'I think I am',
      'Sound of tears', 'What’s next?', 'Scribbling with a gun', "I'm Okay",
      'Milou Christmas'
    ]
  },
  {
    name: 'Frith',
    cover: 'https://frithhilton.com.ng/musicpool/covers/4/album_cover/4.jpg', 
    releaseDate: 'May 5, 2022',
    tracks: [
      'Take no buck', 'Triple to the X', 'Facts', 'Consumed', 'Anon', 'Curveball',
      'Sovereign', 'Playing', 'LILI', 'Hope', 'Popsicle', 'Ape', 'Close friends',
      'Dad (Interlude)', 'Paris', 'Warn me you’re ready', 'Unfurled',
      'Every door Taylor', 'Milk', 'Admissible emotions', 'Euphoria', 'Beat me down',
      'Ready to begin'
    ]
  },
  {
    name: 'screen time',
    cover: 'https://frithhilton.com.ng/musicpool/covers/5/album_cover/5.jpg', 
    releaseDate: 'July 2, 2022',
    tracks: [
      'From the start', 'Reverse', 'Get on with Jack', 'Too deep', 'Andalucía',
      'Friends', 'Text', 'Sunny', 'Humming', 'Waves', 'Addison Rae', 'Pauline',
      'Skyline grey', 'Bittersweet', 'Over you', 'Dreaming', 'Relapse holding',
      'Not lost', 'Hideaway', 'Superficial', 'Warning sign', 'Tears to my heart',
      "I'm sorry", 'Yearning', 'Silver all gone', 'Your eyes', 'Hold over me',
      'A minute', 'Mariam', 'Mine', 'Back home', 'Heaven knows', 'Assets',
      'Just us two'
    ]
  },
  {
    name: 'Jacaranda',
    cover: 'https://frithhilton.com.ng/musicpool/covers/6/album_cover/6.jpg', 
    releaseDate: 'September 24, 2022',
    tracks: [
      'Home', 'QWERTY', 'Blue heeler', 'Gargoyle', 'Silly hen', 'June', 'Thoth',
      'Real sad', 'Tangerine clouds', 'What if cell like', "Can't hide your theme",
      'Paying only you', 'The pain you need', 'Mona Lisa', 'Reusable bag',
      'Street lights', 'Beautiful', 'Pro hac vice', 'Cobber momma',
      'Get that education', 'Telescopic', 'Christmas sleepover'
    ]
  },
  {
    name: 'Theo',
    cover: 'https://frithhilton.com.ng/musicpool/covers/7/album_cover/7.jpg', 
    releaseDate: 'December 15, 2022',
    tracks: [
      'Easy son', 'Ex, your relay', 'Easy, hard', 'Apogee', 'Caret', 'Moment',
      'Trauma', 'Yodel in a vial', 'Tate jersey love', 'Favourite', 'Rose', 'Swan',
      'Demola (Zenosyne)', 'Heavy keys', 'Crash', 'Oh din!', 'Soured love',
      'The one', 'Post soul', 'Our fall', 'Send me to sleep', 'Purpose',
      'Waste the time', 'Mound gold', 'Jail', 'Stuck', 'Doobry', 'Cull sigh',
      "I'm on air", 'Bread', 'I pray', 'My fantasy', 'A nearer echo',
      'Happy married life', 'Polygamy', 'Sofia'
    ]
  },
  {
    name: 'lantern', 
    cover: 'https://frithhilton.com.ng/musicpool/covers/8/album_cover/8.jpg', 
    releaseDate: 'February 24, 2023',
    tracks: [
      'Do I ever do?', 'Number busy', 'Emma I feel', 'Raunch child', 'Jekyll',
      'God of clean', 'Hungry man', 'Lantern', '3:30', 'Be my lover', 'Purple zone',
      'Shire', 'Pussy power', 'Scent', 'Yeehaw', 'Mind talk', 'Cautious', 'Sarah',
      'Call for more', 'Higher calling', 'Say it', 'Avalon', 'How I lose it'
    ]
  },
  {
    name: 'the Lover tap3',
    cover: 'https://frithhilton.com.ng/musicpool/covers/9/album_cover/9.jpg', 
    releaseDate: 'June 19, 2023',
    tracks: [
      'Fair this time', 'Envy', 'Hump', 'Show me a girl', 'Disclose', 'On one',
      'Boink', 'Seventeen', "All girls aren't the same"
    ]
  },
  {
    name: 'Nightswan',
    cover: 'https://frithhilton.com.ng/musicpool/covers/10/album_cover/10.jpg', 
    releaseDate: 'August 4, 2023',
    tracks: [
      'Curandera', 'Marilyn', 'Being friends', 'Darbies', 'Amor fati', 'Pale',
      'Nominal now', 'Best stan', 'Different man', 'Fresh', 'Bad descriptions',
      'Backstage Friday', 'Amusing', 'Party ho', 'Love god', 'Hungry ladies',
      'Dreadnought', 'Get it out', 'Liar', 'Skin', 'Line', 'Boss woman',
      'Solid ground'
    ]
  },
  {
    name: 'troubadour',
    cover: 'https://frithhilton.com.ng/musicpool/covers/11/album_cover/11.png', 
    releaseDate: 'January 21, 2024',
    tracks: [
      'Eviction', 'Waste away', 'West to west', "I'll never", 'Cave',
      'Just let me go', 'Cheetah', 'Find me', 'Baby girl', 'My Hope',
      'Someone asked', 'Let it go', 'Testa', 'Respiring', 'Pretty girl',
      'Vacation', 'Heathrow', 'Benny', 'Beginning', 'Bedroom', 'Goodness',
      'Sure we lit', 'Old door'
    ]
  },
  {
    name: "it's pop",
    cover: 'https://frithhilton.com.ng/musicpool/covers/12/album_cover/12.png', 
    releaseDate: 'March 8, 2024',
    tracks: [
      'Low life dirty rat', 'A seal', 'Summit', 'New hemp plant', 'Melly',
      'Stuck in life', 'Heart census', 'Kevin Hart', 'Head', 'Imagination',
      'Lonely note', 'Hubble', 'Take me out', 'Reward Money', 'Big fat lie',
      'The calm', "I don't know", 'I get the ghetto', 'Sliving',
      'Bagging this home', 'Bag grips', 'Outro'
    ]
  },
  {
    name: 'the Sessions',
    cover: 'https://frithhilton.com.ng/musicpool/covers/13/album_cover/13.jpg', 
    releaseDate: 'June 14, 2024',
    tracks: [
      'Savour', 'Dizzy morning', 'Dirty laundry', 'Canticle', 'SZA', 'Undecided',
      'Different', 'Session 8', "I'll be there", 'Back to the store',
      "Sorry I'm alive", 'Long way home', 'Field of faeries', 'Magical'
    ]
  },
  {
    name: 'Farther Memes',
    cover: 'https://frithhilton.com.ng/musicpool/covers/14/album_cover/14.png', 
    releaseDate: 'February 15, 2025',
    tracks: [
      'Oliver Sacks', 'Oliver Sacks II', 'Palacio de la Zarzuela', 'The preacher',
      'Rick reflection', 'End of summer', 'Sex is everything', 'Fool for you',
      'Hathaway', 'Crush', 'Jealousy', 'Obligations', 'Rust', 'Best cardigan',
      'Unwilling', 'Applish', 'Home alone', 'Aureole sigh', 'First lines',
      'Spaghetti code', 'Fire', 'Fish', 'Greener', 'Lens', 'Keyhole',
      'Bright-eyed', 'Cut in fame', 'Feel good', 'Adios', 'Woah', 'Locked in',
      'Heartbeat', 'Barefoot'
    ]
  },
  {
    name: 'Valence Eve',
    cover: 'https://frithhilton.com.ng/musicpool/covers/15/album_cover/15.jpg', 
    releaseDate: 'December 31, 2024',
    tracks: [
      'I try', 'Kill time', 'Alarms', 'Smile on me', "Queen's daughter",
      'The game we play', 'Yahoo', 'Beautiful Taylor', 'Farce emotions', 'To you',
      'Honest', 'Recruits', 'Butcher feel', 'Porn star', 'Taking you home',
      'Kai Trump', 'Dime piece', 'Fisherman', 'Bedtime', 'Madness', 'Clubing sad'
    ]
  }
];



// js/detailedView.js
export class DetailedView {
  constructor(songState, app) {
    this.songState = songState;
    this.app = app;
    this.detailedPlayer = document.getElementById('detailed-player');
    this.toggleBtn = document.getElementById('detailed-toggle-btn');
    this.albumArt = document.getElementById('detailed-album-art');
    this.songTitle = document.getElementById('detailed-song-title');
    this.artist = document.getElementById('detailed-artist');
    this.playBtn = document.getElementById('detailed-play-btn');
    this.favouriteBtn = document.getElementById('favourite-btn');
    this.lyricsBtn = document.getElementById('lyrics-btn');
    this.queueBtn = document.getElementById('queue-btn');
    this.shuffleBtn = document.getElementById('shuffle-btn');
    this.rewindBtn = document.getElementById('rewind-btn');
    this.prevBtn = document.getElementById('prev-btn');
    this.nextBtn = document.getElementById('next-btn');
    this.forwardBtn = document.getElementById('forward-btn');
    this.repeatBtn = document.getElementById('repeat-btn');
    this.themeBtn = document.querySelector('#detailed-player .bottom-controls:not([id])');
    this.detailsBtn = document.querySelectorAll('#detailed-player .bottom-controls:not([id])')[1];
    this.progressBar = document.querySelector('#detailed-player .progress-bar');
    this.progressDot = document.querySelector('#detailed-player .progress-dot');
    this.currentTime = document.getElementById('detailed-current-time');
    this.totalTime = document.getElementById('detailed-total-time');
  }
  
  init() {
    if (!this.detailedPlayer) {
      console.error('detailed-player element not found');
      return;
    }
    console.log('DetailedView.init, lyricsBtn:', !!this.lyricsBtn, 'queueBtn:', !!this.queueBtn, 'app:', !!this.app);
    if (!this.toggleBtn) {
      console.error('detailed-toggle-btn element not found in DOM');
    }
    if (!this.lyricsBtn) {
      console.error('lyrics-btn element not found in DOM');
    }
    if (!this.queueBtn) {
      console.error('queue-btn element not found in DOM');
    }
    if (!this.app) {
      console.error('App instance not provided to DetailedView');
    }
    this.render();
    this.bindEvents();
    this.songState.subscribe(state => this.render(state));
  }
  
  render(state = this.songState.getState()) {
    try {
      const { currentSong, albums, favourites, shuffle, repeat } = state;
      this.albumArt.src = currentSong.thumbnail || currentSong.cover || 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png';
      this.songTitle.textContent = currentSong.title || 'Select a track';
      this.artist.textContent = currentSong.artist || 'Frith Hilton';
      this.currentTime.textContent = currentSong.currentTime || '0:00';
      this.totalTime.textContent = currentSong.duration || '0:00';
      if (this.progressBar) {
        this.progressBar.style.width = `${currentSong.progress || 0}%`;
      }
      if (this.playBtn) {
        this.playBtn.textContent = currentSong.isPlaying ? '⏸️' : '▶️';
      }
      if (this.favouriteBtn) {
        this.favouriteBtn.textContent = favourites.includes(currentSong.id) ? '❤️' : '🤍';
      }
      if (this.shuffleBtn) {
        this.shuffleBtn.style.opacity = shuffle ? '1' : '0.5';
      }
      if (this.repeatBtn) {
        this.repeatBtn.textContent = repeat === 'one' ? '🔂' : '🔁';
        this.repeatBtn.style.opacity = repeat !== 'off' ? '1' : '0.5';
      }
    } catch (error) {
      console.error('Error in DetailedView.render:', error);
    }
  }
  
  bindEvents() {
    try {
      if (this.toggleBtn) {
        this.toggleBtn.removeEventListener('click', this.handleToggleClick);
        this.handleToggleClick = () => {
          console.log('Detailed toggle button clicked, current history:', this.songState.getState().navigationHistory);
          const previousView = this.songState.popView();
          console.log('Navigating to previous view:', previousView);
          this.songState.notify();
        };
        this.toggleBtn.addEventListener('click', this.handleToggleClick);
      } else {
        console.warn('detailed-toggle-btn not found, cannot bind event');
      }
      
      if (this.playBtn) {
        this.playBtn.addEventListener('click', () => {
          console.log('Play button clicked');
          this.songState.togglePlay();
        });
      }
      
      if (this.favouriteBtn) {
        this.favouriteBtn.addEventListener('click', () => {
          const { currentSong } = this.songState.getState();
          if (currentSong.id) {
            console.log('Favourite button clicked for song:', currentSong.id);
            this.songState.toggleFavourite(currentSong.id);
          }
        });
      }
      
      if (this.lyricsBtn) {
        this.lyricsBtn.addEventListener('click', () => {
          console.log('Lyrics button clicked');
          if (this.app) {
            this.app.showOverlayView('lyrics-player');
          } else {
            console.warn('App instance not available, falling back to pushView for lyrics-player');
            this.songState.pushView('lyrics-player'); // Temporary fallback
          }
        });
      } else {
        console.error('lyrics-btn not found, cannot bind event');
      }
      
      if (this.queueBtn) {
        this.queueBtn.addEventListener('click', () => {
          console.log('Queue button clicked');
          if (this.app) {
            this.app.showOverlayView('queue-player');
          } else {
            console.warn('App instance not available, falling back to pushView for queue-player');
            this.songState.pushView('queue-player'); // Temporary fallback
          }
        });
      } else {
        console.error('queue-btn not found, cannot bind event');
      }
      
      if (this.shuffleBtn) {
        this.shuffleBtn.addEventListener('click', () => {
          console.log('Shuffle button clicked');
          this.songState.toggleShuffle();
        });
      }
      
      if (this.rewindBtn) {
        this.rewindBtn.addEventListener('click', () => {
          console.log('Rewind button clicked');
          this.songState.seek(-10);
        });
      }
      
      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', () => {
          console.log('Previous button clicked');
          this.songState.playPrevious();
        });
      }
      
      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', () => {
          console.log('Next button clicked');
          this.songState.playNext();
        });
      }
      
      if (this.forwardBtn) {
        this.forwardBtn.addEventListener('click', () => {
          console.log('Forward button clicked');
          this.songState.seek(10);
        });
      }
      
      if (this.repeatBtn) {
        this.repeatBtn.addEventListener('click', () => {
          console.log('Repeat button clicked');
          this.songState.toggleRepeat();
        });
      }
      
      if (this.themeBtn) {
        this.themeBtn.addEventListener('click', () => {
          console.log('Theme toggle clicked (unimplemented)');
          document.body.classList.toggle('light-theme');
        });
      }
      
      if (this.detailsBtn) {
        this.detailsBtn.addEventListener('click', () => {
          console.log('View details clicked (unimplemented)');
          alert('Track details view not implemented');
        });
      }
      
      if (this.progressBar && this.progressDot) {
        const progressContainer = this.progressBar.parentElement;
        progressContainer.addEventListener('click', (e) => {
          console.log('Progress bar clicked');
          const rect = progressContainer.getBoundingClientRect();
          const percentage = (e.clientX - rect.left) / rect.width;
          this.songState.seekTo(percentage);
        });
      }
    } catch (error) {
      console.error('Error in DetailedView.bindEvents:', error);
    }
  }
  
  show() {
    console.log('DetailedView.show called');
    this.detailedPlayer.classList.add('active');
    document.getElementById('playback-overlay').style.display = 'none';
  }
  
  hide() {
    console.log('DetailedView.hide called');
    this.detailedPlayer.classList.remove('active');
  }
}

// js/favouritesView.js
import { generateCollage } from './utils.js';

export class FavouritesView {
  constructor(songState, containerId, title = 'Favourites', tracksKey = 'favourites', applyGradientCallback = null, app) {
    this.songState = songState;
    this.app = app;
    this.container = document.getElementById(containerId);
    this.navbar = document.getElementById('favourites-sticky-navbar');
    this.header = document.getElementById('favourites-header');
    this.albumArtContainer = this.header?.querySelector('.album-art-container');
    this.mainAlbumArt = this.header?.querySelector('.album-art') || document.getElementById('favourites-main-art');
    this.thumbnailArt = this.navbar?.querySelector('.thumbnail-art') || document.getElementById('favourites-thumbnail-art');
    this.titleElement = this.header?.querySelector('.album-name') || document.getElementById('favourites-title');
    this.subtitleElement = this.header?.querySelector('.release-year') || document.getElementById('favourites-song-count');
    this.navbarTitle = this.navbar?.querySelector('.album-name') || document.getElementById('favourites-navbar-name');
    this.tracklist = this.container.querySelector('.tracklist') || document.getElementById('favourites-tracklist');
    this.backBtn = document.getElementById('favourites-back-btn');
    this.playbackOverlay = document.getElementById('playback-overlay');
    this.title = title;
    this.tracksKey = tracksKey;
    this.applyGradientCallback = applyGradientCallback;
    this.collageCache = null;
  }

  init(backTarget = 'home-view') {
    if (!this.backBtn) console.error('favourites-back-btn element not found in DOM');
    if (!this.navbar) console.error('favourites-sticky-navbar element not found in DOM');
    if (!this.header) console.error('favourites-header element not found in DOM');
    if (!this.albumArtContainer) console.error('album-art-container element not found in DOM');
    if (!this.thumbnailArt) console.error('thumbnail-art element not found in DOM');
    this.updateUI(this.songState.getState());
    this.songState.subscribe((state) => this.updateUI(state));
    this.bindEvents(backTarget);
    this.updateNavbar();
  }

  generateCollage(tracks) {
    const placeholder = '/images/placeholder.png';
    return tracks.length > 0
      ? generateCollage(tracks.map((t) => ({ ...t, thumbnail: t.thumbnail || placeholder })), 'large')
      : `<img src="${placeholder}" class="collage-single collage-single-large" alt="Placeholder" onerror="this.src='${placeholder}'">`;
  }

  async updateUI(state) {
    const tracks = (state.favourites || [])
      .map((songId) => state.songs.find((s) => s.id === songId))
      .filter((s) => s);
    this.titleElement.textContent = this.title;
    this.subtitleElement.textContent = `${tracks.length} songs`;
    this.navbarTitle.textContent = this.title;

    const collageHtml = this.collageCache && tracks.length > 0 ? this.collageCache : this.generateCollage(tracks);
    this.collageCache = collageHtml;

    if (this.mainAlbumArt) {
      this.mainAlbumArt.innerHTML = collageHtml;
      console.log('Set favourites-main-art HTML:', collageHtml);
    }
    if (this.thumbnailArt) {
      const firstTrack = tracks[0];
      this.thumbnailArt.src = firstTrack?.thumbnail || '/images/placeholder.png';
      console.log('Set favourites-thumbnail-art src:', this.thumbnailArt.src);
    }

    this.tracklist.innerHTML = tracks.length > 0
      ? tracks
          .map(
            (song, index) => `
        <div class="tracklist-item ${state.currentSong.id === song.id ? 'active' : ''}" data-track="${index + 1}" data-song-id="${song.id}" data-title="${song.title}" data-duration="${song.duration}" draggable="true">
          <div class="track-info">
            <img src="${song.thumbnail || '/images/placeholder.png'}" class="track-thumbnail" alt="${song.title}" onerror="this.src='/images/placeholder.png'">
            <span class="track-number opacity-75">${index + 1}</span>
            <div class="track-details">
              <div class="track-title">${song.title}</div>
              <div class="track-duration">${song.duration}</div>
            </div>
          </div>
          <button class="remove-song btn p-0" data-song-id="${song.id}" title="Remove from Favourites">🗑️</button>
        </div>
      `
          )
          .join('')
      : '<p>No songs in Favourites</p>';
  }

  bindEvents(backTarget) {
    if (this.backBtn) {
      this.backBtn.addEventListener('click', () => {
        console.log('Favourites back button clicked, current history:', this.songState.getState().navigationHistory);
        const previousView = this.songState.popView();
        console.log('Navigating to previous view:', previousView);
        this.app.showView(previousView || backTarget);
      });
    }

    if (this.tracklist) {
      this.tracklist.addEventListener('dragstart', (e) => {
        const item = e.target.closest('.tracklist-item');
        if (item) {
          e.dataTransfer.setData('text/plain', item.dataset.songId);
          item.classList.add('dragging');
        }
      });

      this.tracklist.addEventListener('dragend', (e) => {
        const item = e.target.closest('.tracklist-item');
        if (item) item.classList.remove('dragging');
      });

      this.tracklist.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = this.getDragAfterElement(e.clientY);
        const draggable = this.tracklist.querySelector('.dragging');
        if (afterElement == null) {
          this.tracklist.appendChild(draggable);
        } else {
          this.tracklist.insertBefore(draggable, afterElement);
        }
      });

      this.tracklist.addEventListener('drop', (e) => {
        e.preventDefault();
        const songId = e.dataTransfer.getData('text/plain');
        const newOrder = Array.from(this.tracklist.querySelectorAll('.tracklist-item')).map((item) => item.dataset.songId);
        this.songState.reorderFavourites(newOrder);
      });

      this.tracklist.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.remove-song');
        if (removeBtn) {
          const songId = removeBtn.dataset.songId;
          this.songState.toggleFavourite(songId);
          console.log(`Removed song ${songId} from Favourites`);
          return;
        }
        const item = e.target.closest('.tracklist-item');
        if (item) {
          document.querySelectorAll('.tracklist-item').forEach((i) => i.classList.remove('active'));
          item.classList.add('active');
          const songId = item.dataset.songId;
          this.songState.setSong(songId);
          this.songState.pushView('detailed-player');
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

    window.addEventListener('scroll', this.debounce(this.updateNavbar.bind(this), 150));
    window.addEventListener('resize', this.updateNavbar.bind(this));
  }

  getDragAfterElement(y) {
    const draggableElements = [...this.tracklist.querySelectorAll('.tracklist-item:not(.dragging)')];
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        }
        return closest;
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
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

  updateNavbar() {
    if (!this.navbar || !this.header || !this.albumArtContainer) {
      console.error('Missing elements in updateNavbar:', {
        navbar: !!this.navbar,
        header: !!this.header,
        albumArtContainer: !!this.albumArtContainer,
        thumbnailArt: !!this.thumbnailArt,
      });
      return;
    }
    const navbarRect = this.navbar.getBoundingClientRect();
    const headerRect = this.header.getBoundingClientRect();
    console.log('updateNavbar called, navbarRect.top:', navbarRect.top, 'headerRect.bottom:', headerRect.bottom, 'thumbnailArt src:', this.thumbnailArt?.src);
    if (navbarRect.top <= 0 && headerRect.bottom <= 0) {
      console.log('Adding sticky class to navbar');
      this.navbar.classList.add('sticky');
      this.albumArtContainer.classList.add('sticky');
      if (this.thumbnailArt) {
        this.thumbnailArt.style.display = 'none';
        this.thumbnailArt.offsetHeight;
        this.thumbnailArt.style.display = 'block';
      }
    } else {
      console.log('Removing sticky class from navbar');
      this.navbar.classList.remove('sticky');
      this.albumArtContainer.classList.remove('sticky');
    }
  }

  show() {
    this.container.classList.remove('hidden');
    document.getElementById('playback-overlay').style.display = 'flex';
    this.updateNavbar();
  }

  hide() {
    this.container.classList.add('hidden');
  }
}

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
            <div class="cover-container" data-view="favourites-view">
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
          <div class="cover-container" data-view="${sectionName.toLowerCase().replace(' ', '-')}-view">
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
          const coverContainer = e.target.closest('.cover-container');
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


// js/lyricsView.js
export class LyricsView {
  constructor(songState, app) {
    this.songState = songState;
    this.app = app;
    this.lyricsPlayer = document.getElementById('lyrics-player');
    this.lyricsBackground = document.getElementById('lyrics-background');
    this.lyricsSongTitle = document.getElementById('lyrics-song-title');
    this.lyricsArtist = document.getElementById('lyrics-artist');
    this.lyricsContainer = document.getElementById('lyrics-container');
    this.lyricsToggleBtn = document.getElementById('lyrics-toggle-btn');
    this.lyricsProgress = this.lyricsPlayer?.querySelector('.lyrics-progress .progress');
    this.lyricsProgressBar = this.lyricsPlayer?.querySelector('.lyrics-progress .progress-bar');
    this.lyricsCurrentTime = document.getElementById('lyrics-current-time');
    this.lyricsTotalTime = document.getElementById('lyrics-total-time');
    this.lyricsPlayBtn = document.getElementById('lyrics-play-btn');
    this.lyricsShuffleBtn = document.getElementById('lyrics-shuffle-btn');
    this.lyricsRepeatBtn = document.getElementById('lyrics-repeat-btn');
    this.lyricsPrevBtn = document.getElementById('lyrics-prev-btn');
    this.lyricsNextBtn = document.getElementById('lyrics-next-btn');
    this.lyricsRewindBtn = document.getElementById('lyrics-rewind-btn');
    this.lyricsForwardBtn = document.getElementById('lyrics-forward-btn');
    this.debounceTimeout = null;
    this.isStaticLyrics = false;
  }
  
  init(applyGradient) {
    if (!this.lyricsPlayer) {
      console.error('lyrics-player element not found');
      return;
    }
    console.log('LyricsView.init, lyricsToggleBtn:', !!this.lyricsToggleBtn, 'app:', !!this.app);
    if (!this.lyricsToggleBtn) {
      console.error('lyrics-toggle-btn element not found in DOM');
    }
    if (!this.app) {
      console.error('App instance not provided to LyricsView');
    }
    this.updateUI(this.songState.getState());
    this.songState.subscribe(state => this.updateUI(state));
    this.bindEvents();
    const state = this.songState.getState();
    const tempImg = new Image();
    tempImg.crossOrigin = 'anonymous';
    tempImg.src = state.currentSong.thumbnail || state.currentSong.cover || 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png';
    tempImg.addEventListener('load', () => applyGradient(tempImg));
    tempImg.addEventListener('error', () => {
      console.error('Failed to load image for gradient');
      document.body.style.background = 'linear-gradient(to bottom, #d4a5d9, #6b48ff)';
    });
    this.songState.audio.addEventListener('timeupdate', () => {
      if (!this.isStaticLyrics) this.syncLyrics();
      this.updateProgress();
    });
  }
  
  updateUI(state) {
    try {
      const song = state.currentSong;
      this.lyricsSongTitle.textContent = song.title || 'Select a track';
      this.lyricsArtist.textContent = song.artist || 'Frith Hilton';
      this.lyricsBackground.style.backgroundImage = `url(${song.thumbnail || song.cover || 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png'})`;
      this.lyricsContainer.innerHTML = '';
      
      const validLyrics = song.lyrics?.filter(({ line }) => line.trim() !== '') || [];
      this.isStaticLyrics = validLyrics.length > 0 && validLyrics.every(({ timestamp }) => timestamp === '0');
      
      if (validLyrics.length > 0) {
        validLyrics.forEach(({ line, timestamp }) => {
          if (line.trim() !== '') {
            const p = document.createElement('p');
            p.textContent = line;
            if (!this.isStaticLyrics) {
              p.dataset.timestamp = parseFloat(timestamp);
              p.classList.add('lyric-line');
              if (line.startsWith('[') && line.endsWith(']')) {
                p.classList.add('section');
              }
            } else {
              p.classList.add('static-lyric');
            }
            this.lyricsContainer.appendChild(p);
          }
        });
      } else {
        const p = document.createElement('p');
        p.textContent = 'Lyrics not available';
        this.lyricsContainer.appendChild(p);
      }
      
      this.lyricsCurrentTime.textContent = song.currentTime || '00:00';
      this.lyricsTotalTime.textContent = song.duration || '00:00';
      if (this.lyricsProgressBar) {
        this.lyricsProgressBar.style.width = `${song.progress || 0}%`;
      }
      if (this.lyricsPlayBtn) {
        this.lyricsPlayBtn.textContent = song.isPlaying ? '⏸' : '▶️';
      }
      if (this.lyricsShuffleBtn) {
        this.lyricsShuffleBtn.classList.toggle('active', state.shuffle);
      }
      if (this.lyricsRepeatBtn) {
        this.lyricsRepeatBtn.textContent = state.repeat === 'one' ? '🔂' : '🔁';
        this.lyricsRepeatBtn.classList.toggle('active', state.repeat !== 'off');
      }
    } catch (error) {
      console.error('Error in LyricsView.updateUI:', error);
    }
  }
  
  syncLyrics() {
    if (this.debounceTimeout || this.isStaticLyrics) return;
    this.debounceTimeout = setTimeout(() => {
      const currentTime = this.songState.audio.currentTime;
      const lyrics = this.songState.getState().currentSong.lyrics?.filter(
        ({ line, timestamp }) => line.trim() !== '' && timestamp !== '0'
      ) || [];
      
      let currentLine = null;
      for (let i = 0; i < lyrics.length; i++) {
        const currentTimestamp = parseFloat(lyrics[i].timestamp);
        const nextTimestamp = i < lyrics.length - 1 ? parseFloat(lyrics[i + 1].timestamp) : Infinity;
        if (currentTime >= currentTimestamp && currentTime < nextTimestamp) {
          currentLine = lyrics[i];
          break;
        }
      }
      
      const lyricElements = this.lyricsContainer.querySelectorAll('.lyric-line');
      lyricElements.forEach(line => {
        line.classList.remove('active');
        if (currentLine && parseFloat(line.dataset.timestamp) === parseFloat(currentLine.timestamp)) {
          line.classList.add('active');
          this.scrollToLyric(line);
        }
      });
      
      if (!currentLine && lyrics.length > 0) {
        const firstTimestamp = parseFloat(lyrics[0].timestamp);
        const lastTimestamp = parseFloat(lyrics[lyrics.length - 1].timestamp);
        if (currentTime < firstTimestamp || currentTime >= lastTimestamp + 5) {
          lyricElements.forEach(line => line.classList.remove('active'));
        }
      }
      
      this.debounceTimeout = null;
    }, 100);
  }
  
  scrollToLyric(line) {
    const container = this.lyricsContainer;
    const containerHeight = container.clientHeight;
    const lineHeight = line.offsetHeight;
    const lineTop = line.offsetTop;
    const scrollPosition = lineTop - (containerHeight / 2) + (lineHeight / 2);
    
    container.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
  }
  
  updateProgress() {
    try {
      const state = this.songState.getState();
      this.lyricsCurrentTime.textContent = state.currentSong.currentTime || '00:00';
      this.lyricsTotalTime.textContent = state.currentSong.duration || '00:00';
      if (this.lyricsProgressBar) {
        this.lyricsProgressBar.style.width = `${state.currentSong.progress || 0}%`;
      }
    } catch (error) {
      console.error('Error in LyricsView.updateProgress:', error);
    }
  }
  
  bindEvents() {
    try {
      const buttons = [
        this.lyricsPlayBtn,
        this.lyricsShuffleBtn,
        this.lyricsRepeatBtn,
        this.lyricsPrevBtn,
        this.lyricsNextBtn,
        this.lyricsRewindBtn,
        this.lyricsForwardBtn,
        this.lyricsToggleBtn
      ];
      buttons.forEach(btn => {
        if (btn && btn._handler) {
          btn.removeEventListener('click', btn._handler);
          btn._handler = null;
        }
      });
      
      if (this.lyricsProgress) {
        this.lyricsProgress._handler = (e) => {
          console.log('Lyrics progress bar clicked');
          e.stopPropagation();
          const rect = this.lyricsProgress.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const width = rect.width;
          const percentage = clickX / width;
          this.songState.seekTo(percentage);
        };
        this.lyricsProgress.addEventListener('click', this.lyricsProgress._handler);
      }
      
      if (this.lyricsPlayBtn) {
        this.lyricsPlayBtn._handler = () => {
          console.log('Lyrics play button clicked, current view:', this.app?.currentView);
          this.songState.togglePlay();
        };
        this.lyricsPlayBtn.addEventListener('click', this.lyricsPlayBtn._handler);
      }
      
      if (this.lyricsShuffleBtn) {
        this.lyricsShuffleBtn._handler = () => {
          console.log('Shuffle button clicked');
          this.songState.toggleShuffle();
        };
        this.lyricsShuffleBtn.addEventListener('click', this.lyricsShuffleBtn._handler);
      }
      
      if (this.lyricsRepeatBtn) {
        this.lyricsRepeatBtn._handler = () => {
          console.log('Repeat button clicked');
          this.songState.toggleRepeat();
        };
        this.lyricsRepeatBtn.addEventListener('click', this.lyricsRepeatBtn._handler);
      }
      
      if (this.lyricsPrevBtn) {
        this.lyricsPrevBtn._handler = () => {
          console.log('Previous button clicked');
          this.songState.playPrevious();
        };
        this.lyricsPrevBtn.addEventListener('click', this.lyricsPrevBtn._handler);
      }
      
      if (this.lyricsNextBtn) {
        this.lyricsNextBtn._handler = () => {
          console.log('Next button clicked');
          this.songState.playNext();
        };
        this.lyricsNextBtn.addEventListener('click', this.lyricsNextBtn._handler);
      }
      
      if (this.lyricsRewindBtn) {
        this.lyricsRewindBtn._handler = () => {
          console.log('Rewind button clicked');
          this.songState.seek(-10);
        };
        this.lyricsRewindBtn.addEventListener('click', this.lyricsRewindBtn._handler);
      }
      
      if (this.lyricsForwardBtn) {
        this.lyricsForwardBtn._handler = () => {
          console.log('Forward button clicked');
          this.songState.seek(10);
        };
        this.lyricsForwardBtn.addEventListener('click', this.lyricsForwardBtn._handler);
      }
      
      if (this.lyricsToggleBtn) {
        this.lyricsToggleBtn._handler = () => {
          console.log('Lyrics toggle button (🎵) clicked, current view:', this.app?.currentView);
          if (this.app) {
            this.app.showOverlayView('detailed-player');
          } else {
            console.warn('App instance not available, falling back to DOM navigation');
            document.getElementById('lyrics-player').classList.remove('active');
            document.getElementById('detailed-player').classList.add('active');
            document.getElementById('playback-overlay').style.display = 'none';
          }
        };
        this.lyricsToggleBtn.addEventListener('click', this.lyricsToggleBtn._handler);
      } else {
        console.error('lyrics-toggle-btn not found, cannot bind event');
      }
    } catch (error) {
      console.error('Error in LyricsView.bindEvents:', error);
    }
  }
  
  show() {
    console.log('LyricsView.show called');
    this.lyricsPlayer.classList.add('active');
    document.getElementById('playback-overlay').style.display = 'none';
  }
  
  hide() {
    console.log('LyricsView.hide called');
    this.lyricsPlayer.classList.remove('active');
  }
}


// js/main.js
import { SongState } from './songState.js';
import { HomeView } from './homeView.js';
import { TracklistView } from './tracklistView.js';
import { DetailedView } from './detailedView.js';
import { LyricsView } from './lyricsView.js';
import { QueueView } from './queueView.js';
import { PlaylistView } from './playlistView.js';
import { FavouritesView } from './favouritesView.js';

class App {
  constructor() {
    this.songState = new SongState();
    this.views = {
      'home-view': new HomeView(this.songState, this),
      'tracklist-view': new TracklistView(this.songState, 'tracklist-view', 'Album', 'tracks', 'album', this.views?.['home-view']?.applyGradient?.bind(this.views['home-view']), this),
      'detailed-player': new DetailedView(this.songState, this),
      'lyrics-player': new LyricsView(this.songState, this),
      'queue-player': new QueueView(this.songState, this),
      'playlist-view': null,
      'favourites-view': null // Initialized dynamically
    };
    this.currentView = 'home-view';
    this.isNavigating = false;
  }
  
  init() {
    console.log('App.init called, views:', Object.keys(this.views));
    Object.entries(this.views).forEach(([id, view]) => {
      if (view) {
        console.log(`Initializing view: ${view.constructor.name}`);
        view.init(this.views['home-view']?.applyGradient?.bind(this.views['home-view']));
      }
    });
    this.views['home-view'].show();
    this.songState.subscribe(state => this.handleNavigation(state));
    this.bindGlobalEvents();
  }
  
  handleNavigation(state) {
    const currentViewId = state.navigationHistory[state.navigationHistory.length - 1] || 'home-view';
    console.log('handleNavigation called, currentViewId:', currentViewId, 'previous currentView:', this.currentView, 'isPlaying:', state.currentSong.isPlaying);
    if (!this.views[currentViewId] && !['playlist-view', 'favourites-view'].includes(currentViewId)) {
      console.warn(`View ${currentViewId} not found, defaulting to home-view`);
      this.songState.pushView('home-view');
      return;
    }
    const overlayViews = ['lyrics-player', 'queue-player'];
    if (overlayViews.includes(this.currentView)) {
      console.log(`In overlay view ${this.currentView}, skipping history navigation to ${currentViewId}`);
      return;
    }
    console.log(`Processing view: ${currentViewId}`);
    this.views[this.currentView]?.hide();
    if (this.views[currentViewId]) {
      this.views[currentViewId].show();
    }
    this.currentView = currentViewId;
    this.isNavigating = false;
    const backBtn = document.getElementById('global-back-btn');
    if (backBtn) {
      backBtn.classList.toggle('d-none', state.navigationHistory.length <= 1);
    }
  }
  
  showOverlayView(viewId) {
    console.log(`showOverlayView called for: ${viewId}, currentView: ${this.currentView}, available views:`, Object.keys(this.views));
    if (this.views[viewId]) {
      this.views[this.currentView]?.hide();
      this.views[viewId].show();
      this.currentView = viewId;
      console.log(`Successfully showed overlay view: ${viewId}`);
    } else {
      console.error(`Overlay view ${viewId} not found in views:`, Object.keys(this.views));
    }
  }
  
  bindGlobalEvents() {
    const playbackOverlay = document.getElementById('playback-overlay');
    if (playbackOverlay) {
      const playbackCover = playbackOverlay.querySelector('.playback-cover');
      const playbackTitle = playbackOverlay.querySelector('.playback-title');
      const playbackAlbum = playbackOverlay.querySelector('.playback-album');
      const playbackControl = document.getElementById('playback-control');
      
      console.log('Binding playback-overlay events, playbackControl exists:', !!playbackControl, 'id:', playbackControl?.id);
      
      this.songState.subscribe(state => {
        console.log('Playback overlay updating, isPlaying:', state.currentSong.isPlaying, 'currentView:', this.currentView);
        playbackCover.src = state.currentSong.thumbnail || state.currentSong.cover || 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png';
        playbackTitle.textContent = state.currentSong.title || 'Select a track';
        playbackAlbum.textContent = state.currentSong.album || 'Unknown';
        playbackControl.textContent = state.currentSong.isPlaying ? '⏸' : '▶';
      });
      
      playbackOverlay.addEventListener('click', e => {
        console.log('playback-overlay clicked, target:', e.target.tagName, 'id:', e.target.id, 'class:', e.target.className);
        if (e.target.id === 'playback-control' || e.target.closest('#playback-control')) {
          e.stopPropagation();
          console.log('Playback control clicked, isPlaying:', this.songState.getState().currentSong.isPlaying, 'audio src:', this.songState.audio.src, 'audio paused:', this.songState.audio.paused);
          this.songState.togglePlay();
          return;
        }
        if (this.songState.getState().currentSong.title === 'Select a track') {
          console.log('No song selected, skipping navigation');
          return;
        }
        if (this.isNavigating) {
          console.log('Navigation in progress, skipping playback overlay click');
          return;
        }
        const overlayViews = ['lyrics-player', 'queue-player'];
        if (overlayViews.includes(this.currentView)) {
          console.log(`In overlay view ${this.currentView}, skipping playback overlay navigation`);
          return;
        }
        this.isNavigating = true;
        console.log('Playback overlay clicked, current history:', this.songState.getState().navigationHistory, 'currentView:', this.currentView);
        if (this.songState.getState().navigationHistory[this.songState.getState().navigationHistory.length - 1] !== 'detailed-player') {
          this.songState.pushView('detailed-player');
        } else {
          console.log('Already in detailed-player, skipping push');
        }
      });
      
      if (!playbackControl) {
        console.error('playback-control element not found during binding');
      }
    } else {
      console.error('playback-overlay element not found');
    }
    
    const globalBackBtn = document.getElementById('global-back-btn');
    if (globalBackBtn) {
      globalBackBtn.addEventListener('click', () => {
        if (this.isNavigating) {
          console.log('Navigation in progress, skipping global back click');
          return;
        }
        this.isNavigating = true;
        console.log('Global back button clicked, current history:', this.songState.getState().navigationHistory);
        const previousView = this.songState.popView();
        console.log('Global back navigating to:', previousView);
      });
    }
    
    const offcanvas = document.getElementById('trackMenu');
    const addToQueue = document.getElementById('add-to-queue');
    const addToPlaylist = document.getElementById('add-to-playlist');
    const createPlaylist = document.getElementById('create-playlist');
    const deletePlaylist = document.getElementById('delete-playlist');
    const renamePlaylist = document.getElementById('rename-playlist');
    const playlistDropdown = document.getElementById('playlist-dropdown');
    const playlistModal = document.getElementById('playlist-modal');
    const playlistAction = document.getElementById('playlist-action');
    
    if (addToQueue && offcanvas) {
      addToQueue.addEventListener('click', () => {
        const songId = offcanvas.dataset.songId;
        if (songId) {
          this.songState.addToQueue(songId);
          bootstrap.Offcanvas.getInstance(offcanvas)?.hide();
        } else {
          console.warn('No songId set on offcanvas');
        }
      });
    }
    
    if (addToPlaylist && playlistDropdown) {
      addToPlaylist.addEventListener('show.bs.dropdown', () => {
        const state = this.songState.getState();
        playlistDropdown.innerHTML = Object.keys(state.playlists).length > 0 ?
          Object.keys(state.playlists).map(name => `
              <li><a class="dropdown-item" href="#" data-playlist="${name}">${name}</a></li>
            `).join('') :
          '<li><a class="dropdown-item disabled" href="#">No playlists</a></li>';
        playlistDropdown.querySelectorAll('a[data-playlist]').forEach(item => {
          item.addEventListener('click', e => {
            e.preventDefault();
            const playlistName = e.target.dataset.playlist;
            const songId = offcanvas.dataset.songId;
            if (songId && this.songState.addToPlaylist(playlistName, songId)) {
              bootstrap.Offcanvas.getInstance(offcanvas)?.hide();
            } else {
              alert('Failed to add to playlist');
            }
          });
        });
      });
    }
    
    if (createPlaylist && playlistModal && playlistAction) {
      createPlaylist.addEventListener('click', () => {
        const modal = new bootstrap.Modal(playlistModal, { backdrop: true });
        document.getElementById('playlist-modal-title').textContent = 'Create Playlist';
        document.getElementById('playlist-name-input').value = '';
        playlistAction.dataset.action = 'create';
        modal.show();
      });
    }
    
    if (deletePlaylist && offcanvas) {
      deletePlaylist.addEventListener('click', () => {
        const playlistName = offcanvas.dataset.playlistName;
        if (playlistName && confirm(`Delete playlist "${playlistName}"?`)) {
          this.songState.deletePlaylist(playlistName);
          bootstrap.Offcanvas.getInstance(offcanvas)?.hide();
        }
      });
    }
    
    if (renamePlaylist && playlistModal && playlistAction) {
      renamePlaylist.addEventListener('click', () => {
        const playlistName = offcanvas.dataset.playlistName;
        if (playlistName) {
          const modal = new bootstrap.Modal(playlistModal, { backdrop: true });
          document.getElementById('playlist-modal-title').textContent = 'Rename Playlist';
          document.getElementById('playlist-name-input').value = playlistName;
          playlistAction.dataset.action = `rename:${playlistName}`;
          modal.show();
        }
      });
    }
    
    if (playlistAction && playlistModal) {
      playlistAction.addEventListener('click', () => {
        const action = playlistAction.dataset.action;
        const nameInput = document.getElementById('playlist-name-input').value.trim();
        if (!nameInput) {
          alert('Playlist name cannot be empty');
          return;
        }
        let success = false;
        if (action === 'create') {
          success = this.songState.createPlaylist(nameInput);
          if (!success) alert('Playlist already exists!');
        } else if (action.startsWith('rename:')) {
          const oldName = action.split(':')[1];
          success = this.songState.renamePlaylist(oldName, nameInput);
          if (!success) alert('New name already exists or invalid!');
        }
        if (success) {
          const modal = bootstrap.Modal.getInstance(playlistModal);
          modal?.hide();
          document.querySelectorAll('.modal-backdrop').forEach(el => el.remove());
          document.body.classList.remove('modal-open');
          document.body.style.overflow = '';
        }
      });
    }
    
    // Bind playlist section click handler
    const playlistsSection = document.getElementById('playlists');
    if (playlistsSection) {
      playlistsSection.addEventListener('click', e => {
        const playlistItem = e.target.closest('.playlist-item');
        if (playlistItem && !this.isNavigating) {
          const playlistName = playlistItem.dataset.playlistName;
          console.log('Playlist item clicked:', playlistName, 'current history:', this.songState.getState().navigationHistory);
          this.isNavigating = true;
          this.views['playlist-view'] = new PlaylistView(
            this.songState,
            'playlist-view',
            playlistName,
            playlistName,
            this.views['home-view']?.applyGradient?.bind(this.views['home-view']),
            this
          );
          this.views['playlist-view'].init('home-view');
          this.songState.pushView('playlist-view');
        }
      });
    } else {
      console.error('playlists section not found');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded, creating App instance');
  const app = new App();
  document.querySelector('body').__app = app;
  console.log('App instance set on body.__app');
  app.init();
});


// js/playlistView.js

import { generateCollage } from './utils.js';

export class PlaylistView {
  constructor(songState, containerId, title, tracksKey, applyGradientCallback = null, app) {
    this.songState = songState;
    this.app = app;
    this.container = document.getElementById(containerId);
    this.navbar = document.getElementById('playlist-sticky-navbar');
    this.header = document.getElementById('playlist-header');
    this.albumArtContainer = this.header?.querySelector('.album-art-container');
    this.mainAlbumArt = this.header?.querySelector('.album-art') || document.getElementById('playlist-main-art');
    this.thumbnailArt = this.navbar?.querySelector('.thumbnail-art') || document.getElementById('playlist-thumbnail-art');
    this.titleElement = this.header?.querySelector('.album-name') || document.getElementById('playlist-title');
    this.subtitleElement = this.header?.querySelector('.release-year') || document.getElementById('playlist-song-count');
    this.navbarTitle = this.navbar?.querySelector('.album-name') || document.getElementById('playlist-navbar-name');
    this.tracklist = this.container.querySelector('.tracklist') || document.getElementById('playlist-tracklist');
    this.backBtn = document.getElementById('playlist-back-btn');
    this.playbackOverlay = document.getElementById('playback-overlay');
    this.offcanvasElement = document.getElementById('trackMenu');
    this.offcanvas = new bootstrap.Offcanvas(this.offcanvasElement);
    this.offcanvasTitle = this.offcanvasElement.querySelector('.offcanvas-title');
    this.title = title;
    this.tracksKey = tracksKey;
    this.applyGradientCallback = applyGradientCallback;
    this.collageCache = null; // Cache for collage data URL
  }
  
  init(backTarget = 'home-view') {
    if (!this.backBtn) console.error('playlist-back-btn element not found in DOM');
    if (!this.navbar) console.error('playlist-sticky-navbar element not found in DOM');
    if (!this.header) console.error('playlist-header element not found in DOM');
    if (!this.albumArtContainer) console.error('album-art-container element not found in DOM');
    if (!this.thumbnailArt) console.error('thumbnail-art element not found in DOM');
    this.updateUI(this.songState.getState());
    this.songState.subscribe(state => this.updateUI(state));
    this.bindEvents(backTarget);
    this.updateNavbar();
  }
  
  async generateCollage(tracks) {
    const placeholder = 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png';
    return tracks.length > 0 ?
      await generateCollage(tracks.map(t => ({ ...t, thumbnail: t.thumbnail || placeholder }))) :
      placeholder;
  }
  
  async updateUI(state) {
    const tracks = (state.playlists[this.tracksKey] || [])
      .map(songId => state.songs.find(s => s.id === songId))
      .filter(s => s);
    this.titleElement.textContent = this.title;
    this.subtitleElement.textContent = `${tracks.length} songs`;
    this.navbarTitle.textContent = this.title;
    
    // Generate or use cached collage
    const collageSrc = tracks.length > 0 ?
      await this.generateCollage(tracks) :
      'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png';
    this.collageCache = collageSrc;
    
    if (this.mainAlbumArt) {
      this.mainAlbumArt.src = collageSrc;
      console.log('Set playlist-main-art src:', collageSrc);
    }
    if (this.thumbnailArt) {
      this.thumbnailArt.src = collageSrc;
      console.log('Set playlist-thumbnail-art src:', collageSrc);
    }
    
    this.tracklist.innerHTML = tracks.length > 0 ? tracks
      .map((song, index) => `
        <div class="tracklist-item ${state.currentSong.id === song.id ? 'active' : ''}" data-track="${index + 1}" data-song-id="${song.id}" data-title="${song.title}" data-duration="${song.duration}" draggable="true">
          <div class="track-info">
            <img src="${song.thumbnail || 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png'}" class="track-thumbnail" alt="${song.title}">
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
    if (this.backBtn) {
      this.backBtn.addEventListener('click', () => {
        console.log('Playlist back button clicked, current history:', this.songState.getState().navigationHistory);
        const previousView = this.songState.popView();
        console.log('Navigating to previous view:', previousView);
        this.app.showView(previousView || backTarget);
      });
    }
    
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
          this.songState.pushView('detailed-player');
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
    
    window.addEventListener('scroll', this.debounce(this.updateNavbar.bind(this), 150));
    window.addEventListener('resize', this.updateNavbar.bind(this));
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
  
  updateNavbar() {
    if (!this.navbar || !this.header || !this.albumArtContainer) {
      console.error('Missing elements in updateNavbar:', {
        navbar: !!this.navbar,
        header: !!this.header,
        albumArtContainer: !!this.albumArtContainer,
        thumbnailArt: !!this.thumbnailArt
      });
      return;
    }
    const navbarRect = this.navbar.getBoundingClientRect();
    const headerRect = this.header.getBoundingClientRect();
    console.log('updateNavbar called, navbarRect.top:', navbarRect.top, 'headerRect.bottom:', headerRect.bottom, 'thumbnailArt src:', this.thumbnailArt?.src);
    if (navbarRect.top <= 0 && headerRect.bottom <= 0) {
      console.log('Adding sticky class to navbar');
      this.navbar.classList.add('sticky');
      this.albumArtContainer.classList.add('sticky');
      if (this.thumbnailArt) {
        this.thumbnailArt.style.display = 'none';
        this.thumbnailArt.offsetHeight; // Trigger reflow
        this.thumbnailArt.style.display = 'block';
      }
    } else {
      console.log('Removing sticky class from navbar');
      this.navbar.classList.remove('sticky');
      this.albumArtContainer.classList.remove('sticky');
    }
  }
  
  show() {
    this.container.classList.remove('hidden');
    document.getElementById('playback-overlay').style.display = 'flex';
    this.updateNavbar();
  }
  
  hide() {
    this.container.classList.add('hidden');
  }
}


// js/queueView.js
export class QueueView {
  constructor(songState, app) {
    this.songState = songState;
    this.app = app;
    this.queuePlayer = document.getElementById('queue-player');
    this.toggleBtn = document.getElementById('queue-toggle-btn');
    this.clearBtn = document.getElementById('queue-clear-btn');
    this.tracklist = document.querySelector('#queue-player .tracklist');
  }
  
  init() {
    if (!this.queuePlayer) {
      console.error('queue-player element not found');
      return;
    }
    console.log('QueueView.init, queueToggleBtn:', !!this.toggleBtn, 'app:', !!this.app);
    if (!this.toggleBtn) {
      console.error('queue-toggle-btn element not found in DOM');
    }
    if (!this.app) {
      console.error('App instance not provided to QueueView');
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
      if (this.toggleBtn) {
        this.toggleBtn._handler = () => {
          console.log('Queue toggle button (🎵) clicked, current view:', this.app?.currentView);
          if (this.app) {
            this.app.showOverlayView('detailed-player');
          } else {
            console.warn('App instance not available, falling back to DOM navigation');
            document.getElementById('queue-player').classList.add('hidden');
            document.getElementById('detailed-player').classList.add('active');
            document.getElementById('playback-overlay').style.display = 'none';
          }
        };
        this.toggleBtn.addEventListener('click', this.toggleBtn._handler);
      } else {
        console.error('queue-toggle-btn not found, cannot bind event');
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
    console.log('QueueView.show called');
    this.queuePlayer.classList.remove('hidden');
    document.getElementById('playback-overlay').style.display = 'none';
  }
  
  hide() {
    console.log('QueueView.hide called');
    this.queuePlayer.classList.add('hidden');
  }
}



// js/recentlyPlayedView.js
import { generateCollage } from './utils.js';

export class RecentlyPlayedView {
  constructor(songState, applyGradient, app) {
    this.songState = songState;
    this.applyGradient = applyGradient;
    this.app = app;
    this.container = document.getElementById('recently-played-view');
    this.navbar = document.getElementById('recently-played-sticky-navbar');
    this.header = document.getElementById('recently-played-header');
    this.albumArtContainer = this.header?.querySelector('.album-art-container');
    this.mainAlbumArt = this.header?.querySelector('.album-art') || document.getElementById('recently-played-main-art');
    this.thumbnailArt = this.navbar?.querySelector('.thumbnail-art') || document.getElementById('recently-played-thumbnail-art');
    this.titleElement = this.header?.querySelector('.album-name') || document.getElementById('recently-played-title');
    this.subtitleElement = this.header?.querySelector('.release-year') || document.getElementById('recently-played-song-count');
    this.navbarTitle = this.navbar?.querySelector('.album-name') || document.getElementById('recently-played-navbar-name');
    this.tracklist = this.container.querySelector('.tracklist') || document.getElementById('recently-played-tracklist');
    this.backBtn = document.getElementById('recently-played-back-btn');
    this.playbackOverlay = document.getElementById('playback-overlay');
    this.title = 'Recently Played';
    this.tracksKey = 'recentlyPlayed';
    this.collageCache = null;
    this.previousView = null;
  }

  init(backTarget = 'home-view') {
    if (!this.container) console.error('recently-played-view element not found');
    if (!this.backBtn) console.error('recently-played-back-btn element not found');
    if (!this.navbar) console.error('recently-played-sticky-navbar element not found');
    if (!this.header) console.error('recently-played-header element not found');
    if (!this.albumArtContainer) console.error('album-art-container element not found');
    if (!this.thumbnailArt) console.error('recently-played-thumbnail-art element not found');
    this.previousView = backTarget;
    this.updateUI(this.songState.getState());
    this.songState.subscribe((state) => this.updateUI(state));
    this.bindEvents(backTarget);
    this.updateNavbar();
  }

  generateCollage(tracks) {
    const placeholder = '/images/placeholder.png';
    return tracks.length > 0
      ? generateCollage(tracks.map((t) => ({ ...t, thumbnail: t.thumbnail || placeholder })), 'large')
      : `<img src="${placeholder}" class="collage-single collage-single-large" alt="Placeholder" onerror="this.src='${placeholder}'">`;
  }

  async updateUI(state) {
    try {
      const tracks = (state.recentlyPlayed || [])
        .map((songId) => state.songs.find((s) => s.id === songId))
        .filter((s) => s);
      this.titleElement.textContent = this.title;
      this.subtitleElement.textContent = `${tracks.length} song${tracks.length !== 1 ? 's' : ''}`;
      this.navbarTitle.textContent = this.title;

      const collageHtml = this.collageCache && tracks.length > 0 ? this.collageCache : this.generateCollage(tracks);
      this.collageCache = collageHtml;

      if (this.mainAlbumArt) {
        this.mainAlbumArt.innerHTML = collageHtml;
        console.log('Set recently-played-main-art HTML:', collageHtml);
      }
      if (this.thumbnailArt) {
        const firstTrack = tracks[0];
        this.thumbnailArt.src = firstTrack?.thumbnail || '/images/placeholder.png';
        console.log('Set recently-played-thumbnail-art src:', this.thumbnailArt.src);
      }

      this.tracklist.innerHTML = tracks.length > 0
        ? tracks
            .map(
              (song, index) => `
                <div class="tracklist-item ${state.currentSong.id === song.id ? 'active' : ''}" data-track="${index + 1}" data-song-id="${song.id}" data-title="${song.title}" data-duration="${song.duration || '0:00'}" draggable="true">
                  <div class="track-info">
                    <img src="${song.thumbnail || '/images/placeholder.png'}" class="track-thumbnail" alt="${song.title}" onerror="this.src='/images/placeholder.png'">
                    <span class="track-number opacity-75">${index + 1}</span>
                    <div class="track-details">
                      <div class="track-title">${song.title}</div>
                      <div class="track-duration">${song.duration || '0:00'}</div>
                    </div>
                  </div>
                  <button class="remove-song btn p-0" data-song-id="${song.id}" title="Remove from Recently Played">🗑️</button>
                </div>
              `
            )
            .join('')
        : '<p>No songs in Recently Played</p>';
    } catch (error) {
      console.error('Error in RecentlyPlayedView.updateUI:', error);
      this.container.innerHTML = '<p>Error loading Recently Played view. Please try again.</p>';
    }
  }

  bindEvents(backTarget) {
    if (this.backBtn) {
      this.backBtn.addEventListener('click', () => {
        console.log('Recently Played back button clicked, current history:', this.songState.getState().navigationHistory);
        const previousView = this.songState.popView();
        console.log('Navigating to previous view:', previousView);
        this.app.showView(previousView || backTarget);
      });
    }

    if (this.tracklist) {
      this.tracklist.addEventListener('dragstart', (e) => {
        const item = e.target.closest('.tracklist-item');
        if (item) {
          e.dataTransfer.setData('text/plain', item.dataset.songId);
          item.classList.add('dragging');
        }
      });

      this.tracklist.addEventListener('dragend', (e) => {
        const item = e.target.closest('.tracklist-item');
        if (item) item.classList.remove('dragging');
      });

      this.tracklist.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = this.getDragAfterElement(e.clientY);
        const draggable = this.tracklist.querySelector('.dragging');
        if (afterElement == null) {
          this.tracklist.appendChild(draggable);
        } else {
          this.tracklist.insertBefore(draggable, afterElement);
        }
      });

      this.tracklist.addEventListener('drop', (e) => {
        e.preventDefault();
        const songId = e.dataTransfer.getData('text/plain');
        const newOrder = Array.from(this.tracklist.querySelectorAll('.tracklist-item')).map((item) => item.dataset.songId);
        this.songState.reorderRecentlyPlayed(newOrder);
      });

      this.tracklist.addEventListener('click', (e) => {
        const removeBtn = e.target.closest('.remove-song');
        if (removeBtn) {
          const songId = removeBtn.dataset.songId;
          this.songState.removeFromRecentlyPlayed(songId);
          console.log(`Removed song ${songId} from Recently Played`);
          return;
        }
        const item = e.target.closest('.tracklist-item');
        if (item) {
          document.querySelectorAll('.tracklist-item').forEach((i) => i.classList.remove('active'));
          item.classList.add('active');
          const songId = item.dataset.songId;
          this.songState.setSong(songId);
          this.songState.pushView('detailed-player');
          this.container.classList.add('hidden');
          document.getElementById('detailed-player').classList.add('active');
          document.getElementById('playback-overlay').style.display = 'none';
          if (this.applyGradient) {
            const img = document.getElementById('detailed-album-art');
            img.onload = () => this.applyGradient(img);
          }
        }
      });
    }

    window.addEventListener('scroll', this.debounce(this.updateNavbar.bind(this), 150));
    window.addEventListener('resize', this.updateNavbar.bind(this));
  }

  getDragAfterElement(y) {
    const draggableElements = [...this.tracklist.querySelectorAll('.tracklist-item:not(.dragging)')];
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        }
        return closest;
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
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

  updateNavbar() {
    if (!this.navbar || !this.header || !this.albumArtContainer) {
      console.error('Missing elements in updateNavbar:', {
        navbar: !!this.navbar,
        header: !!this.header,
        albumArtContainer: !!this.albumArtContainer,
        thumbnailArt: !!this.thumbnailArt,
      });
      return;
    }
    const navbarRect = this.navbar.getBoundingClientRect();
    const headerRect = this.header.getBoundingClientRect();
    console.log('updateNavbar called, navbarRect.top:', navbarRect.top, 'headerRect.bottom:', headerRect.bottom, 'thumbnailArt src:', this.thumbnailArt?.src);
    if (navbarRect.top <= 0 && headerRect.bottom <= 0) {
      console.log('Adding sticky class to navbar');
      this.navbar.classList.add('sticky');
      this.albumArtContainer.classList.add('sticky');
      if (this.thumbnailArt) {
        this.thumbnailArt.style.display = 'none';
        this.thumbnailArt.offsetHeight;
        this.thumbnailArt.style.display = 'block';
      }
    } else {
      console.log('Removing sticky class from navbar');
      this.navbar.classList.remove('sticky');
      this.albumArtContainer.classList.remove('sticky');
    }
  }

  show() {
    this.container.classList.remove('hidden');
    document.getElementById('playback-overlay').style.display = 'flex';
    this.updateNavbar();
  }

  hide() {
    this.container.classList.add('hidden');
  }
}


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
    this.audio.addEventListener('pause', () => {
      console.log('Audio paused event, isPlaying:', this.state.currentSong.isPlaying);
      if (this.state.currentSong.isPlaying) {
        this.state.currentSong.isPlaying = false;
        this.notify();
      }
    });
    this.audio.addEventListener('play', () => {
      console.log('Audio play event, isPlaying:', this.state.currentSong.isPlaying);
      if (!this.state.currentSong.isPlaying) {
        this.state.currentSong.isPlaying = true;
        this.notify();
      }
    });
  }
  
  async loadData() {
    const CACHE_KEY = 'albumData';
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
    
    try {
      const allTracks = [];
      const albumsWithTracks = await Promise.all(albums.map(async album => {
        const tracks = await Promise.all(album.tracks.map(async track => {
          const cacheKey = `${album.name}/${track}`;
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
              cover: data.cover || 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png',
              thumbnail: data.thumbnail || data.cover || 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png',
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
          cover: album.cover || 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png',
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
  
  notify() {
    console.log('Notifying subscribers, current state:', {
      navigationHistory: [...this.state.navigationHistory],
      currentView: this.state.navigationHistory[this.state.navigationHistory.length - 1],
      isPlaying: this.state.currentSong.isPlaying,
      currentSong: this.state.currentSong.title
    });
    this.subscribers.forEach(callback => {
      try {
        callback(this.state);
      } catch (error) {
        console.error('Error in subscriber callback:', error);
      }
    });
  }
  
  pushView(viewId) {
    console.log(`Pushing view: ${viewId}, current history:`, [...this.state.navigationHistory]);
    const disallowedViews = ['lyrics-player', 'queue-player'];
    if (disallowedViews.includes(viewId)) {
      console.log(`View ${viewId} is disallowed, skipping push`);
      return;
    }
    if (this.state.navigationHistory[this.state.navigationHistory.length - 1] !== viewId) {
      this.state.navigationHistory.push(viewId);
      this.saveState();
      this.notify();
    } else {
      console.log(`View ${viewId} is already current, skipping push`);
    }
  }
  
  popView() {
    console.log('popView called, current history:', [...this.state.navigationHistory]);
    if (this.state.navigationHistory.length <= 1) {
      console.log('History length <= 1, returning to home-view');
      this.state.navigationHistory = ['home-view'];
      this.saveState();
      this.notify();
      return 'home-view';
    }
    
    const notAllowedViews = ['lyrics-player', 'queue-player'];
    const currentView = this.state.navigationHistory[this.state.navigationHistory.length - 1];
    this.state.navigationHistory = this.state.navigationHistory.filter(view => view !== currentView);
    
    if (this.state.navigationHistory.length === 0) {
      this.state.navigationHistory = ['home-view'];
    }
    
    let previousView = 'home-view';
    for (let i = this.state.navigationHistory.length - 1; i >= 0; i--) {
      if (!notAllowedViews.includes(this.state.navigationHistory[i])) {
        previousView = this.state.navigationHistory[i];
        break;
      }
    }
    
    console.log('Popped view, new history:', [...this.state.navigationHistory], 'Returning to:', previousView);
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
  
  saveState() {
    const { favourites, playlists, queue, recentlyPlayed, shuffle, repeat } = this.state;
    localStorage.setItem('playerState', JSON.stringify({
      favourites,
      playlists,
      queue,
      recentlyPlayed,
      shuffle,
      repeat
    }));
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
      console.log('setSong: Audio play succeeded');
      this.state.currentSong.isPlaying = true;
      this.notify();
    }).catch(error => {
      console.error('setSong: Playback error:', error);
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
    console.log('togglePlay called, isPlaying:', this.state.currentSong.isPlaying, 'audio src:', this.audio.src, 'audio paused:', this.audio.paused, 'readyState:', this.audio.readyState);
    if (!this.state.currentSong.mp3_url) {
      console.log('No mp3_url, cannot toggle play');
      return;
    }
    if (!this.hasStarted) {
      console.log('Playing silent audio to enable autoplay');
      this.silentAudio.play().catch(() => console.log('Silent audio blocked'));
      document.querySelectorAll('audio').forEach(audio => {
        if (audio !== this.audio && !audio.paused) {
          console.log('Pausing other audio element');
          audio.pause();
        }
      });
      this.hasStarted = true;
    }
    try {
      if (this.audio.paused) {
        console.log('Attempting to play audio');
        this.audio.play().then(() => {
          console.log('Audio play succeeded');
          this.state.currentSong.isPlaying = true;
          this.saveState();
          this.notify();
        }).catch(error => {
          console.error('Audio play failed:', error);
          this.state.currentSong.isPlaying = false;
          this.saveState();
          this.notify();
        });
      } else {
        console.log('Pausing audio');
        this.audio.pause();
        this.state.currentSong.isPlaying = false;
        this.saveState();
        this.notify();
      }
    } catch (error) {
      console.error('Error in togglePlay:', error);
      this.state.currentSong.isPlaying = false;
      this.saveState();
      this.notify();
    }
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
  
  reorderFavourites(newOrder) {
    if (!Array.isArray(newOrder) || newOrder.length !== this.state.favourites.length) {
      console.log('Invalid favourites order:', newOrder);
      return false;
    }
    const validOrder = newOrder.filter(id => this.state.favourites.includes(id));
    if (validOrder.length !== this.state.favourites.length) {
      console.log('Invalid favourites order: not all IDs present');
      return false;
    }
    this.state.favourites = validOrder;
    this.saveState();
    this.notify();
    return true;
  }
  
  removeFromFavourites(songId) {
    if (!this.state.favourites.includes(songId)) {
      console.log(`Song ${songId} not in favourites`);
      return false;
    }
    this.state.favourites = this.state.favourites.filter(id => id !== songId);
    this.saveState();
    this.notify();
    return true;
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
        console.log('handleSongEnd: Audio play succeeded');
        this.state.currentSong.isPlaying = true;
        this.notify();
      }).catch(error => {
        console.error('handleSongEnd: Playback error:', error);
        this.state.currentSong.isPlaying = false;
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




// js/tracklistView.js
export class TracklistView {
  constructor(songState, containerId, title, tracksKey, type = 'album', applyGradientCallback = null, app) {
    this.songState = songState;
    this.app = app;
    this.container = document.getElementById(containerId);
    this.navbar = document.getElementById(`${containerId}-navbar`) || document.getElementById('sticky-navbar');
    this.tracklist = this.container.querySelector('.tracklist') || document.getElementById('tracklist');
    this.header = this.container.querySelector('.header') || document.getElementById('album-header');
    this.albumArtContainer = this.header?.querySelector('.album-art-container');
    this.mainAlbumArt = this.header?.querySelector('.album-art') || document.getElementById('main-album-art');
    this.thumbnailArt = this.navbar?.querySelector('.thumbnail-art') || document.getElementById('thumbnail-art');
    this.titleElement = this.header?.querySelector('.title') || document.getElementById('album-title');
    this.subtitleElement = this.header?.querySelector('.subtitle') || document.getElementById('album-release');
    this.navbarTitle = this.navbar?.querySelector('.album-name') || document.getElementById('navbar-album-name');
    this.backBtn = document.getElementById('tracklist-back-btn');
    this.playbackOverlay = document.getElementById('playback-overlay');
    this.playbackCover = this.playbackOverlay.querySelector('.playback-cover');
    this.playbackTitle = this.playbackOverlay.querySelector('.playback-title');
    this.playbackAlbum = this.playbackOverlay.querySelector('.playback-album');
    this.playbackControl = document.getElementById('playback-control');
    this.offcanvasElement = document.getElementById('trackMenu');
    this.offcanvas = new bootstrap.Offcanvas(this.offcanvasElement);
    this.offcanvasTitle = this.offcanvasElement.querySelector('.offcanvas-title');
    this.title = title;
    this.tracksKey = tracksKey;
    this.type = type;
    this.applyGradientCallback = applyGradientCallback;
    this.isTransitioning = false;
  }
  
  init(backTarget = 'home-view') {
    if (!this.backBtn) {
      console.error('tracklist-back-btn element not found in DOM');
    } else {
      console.log('tracklist-back-btn found, binding event');
    }
    this.updateUI(this.songState.getState());
    this.songState.subscribe(state => this.updateUI(state));
    this.bindEvents(backTarget);
    this.updateNavbar();
  }
  
  updateUI(state) {
    let tracks = [];
    let displayTitle = this.title;
    let subtitle = '';
    
    if (this.type === 'album') {
      const album = state.currentAlbum;
      if (album) {
        tracks = album.tracks.map(trackId => state.songs.find(s => s.id === trackId)).filter(s => s);
        displayTitle = album.title;
        subtitle = album.release_date.split('-')[0];
        if (this.mainAlbumArt) this.mainAlbumArt.src = album.cover || 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png';
        if (this.thumbnailArt) this.thumbnailArt.src = album.cover || 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png';
      }
    } else if (this.type === 'queue') {
      tracks = state.queue.map(songId => state.songs.find(s => s.id === songId)).filter(s => s);
      subtitle = `${tracks.length} songs`;
    } else if (this.type === 'playlist') {
      tracks = (state.playlists[this.tracksKey] || []).map(songId => state.songs.find(s => s.id === songId)).filter(s => s);
      subtitle = `${tracks.length} songs`;
    }
    
    if (this.titleElement) this.titleElement.textContent = displayTitle;
    if (this.subtitleElement) this.subtitleElement.textContent = subtitle;
    if (this.navbarTitle) this.navbarTitle.textContent = displayTitle;
    
    this.tracklist.innerHTML = tracks.length > 0 ? tracks
      .map((song, index) => `
        <div class="tracklist-item ${state.currentSong.id === song.id ? 'active' : ''}" data-track="${index + 1}" data-song-id="${song.id}" data-title="${song.title}" data-duration="${song.duration}" ${this.type === 'playlist' ? 'draggable="true"' : ''}>
          <div class="track-info">
            <img src="${song.cover || 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png'}" class="track-thumbnail" alt="${song.title}">
            <span class="track-number opacity-75">${index + 1}</span>
            <div class="track-details">
              <div class="track-title">${song.title}</div>
              <div class="track-duration">${song.duration}</div>
            </div>
          </div>
          ${this.type === 'playlist' ? `<button class="remove-song btn p-0" data-song-id="${song.id}">🗑️</button>` : ''}
          <span class="menu-icon" data-bs-toggle="offcanvas" data-bs-target="#trackMenu">⋮</span>
        </div>
      `).join('') : '<p>No songs available</p>';
    
    this.playbackTitle.textContent = state.currentSong.title;
    this.playbackAlbum.textContent = state.currentSong.album;
    this.playbackCover.src = state.currentSong.cover || 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png';
    this.playbackControl.textContent = state.currentSong.isPlaying ? '⏸' : '▶';
  }
  
  bindEvents(backTarget) {
    if (this.playbackControl) {
      if (this.playbackControl._handler) {
        this.playbackControl.removeEventListener('click', this.playbackControl._handler);
      }
      this.playbackControl._handler = e => {
        e.stopPropagation();
        const state = this.songState.getState();
        if (state.currentSong.id && state.currentSong.mp3_url) {
          this.songState.togglePlay();
        } else {
          console.log('No song selected for playback');
        }
      };
      this.playbackControl.addEventListener('click', this.playbackControl._handler);
    }
    
    if (this.playbackOverlay) {
      if (this.playbackOverlay._handler) {
        this.playbackOverlay.removeEventListener('click', this.playbackOverlay._handler);
      }
      this.playbackOverlay._handler = e => {
        if (e.target.classList.contains('playback-control')) return;
        if (this.songState.getState().currentSong.title === 'Select a track') return;
        this.songState.pushView('detailed-player');
        this.container.classList.add('hidden');
        document.getElementById('detailed-player').classList.add('active');
        this.playbackOverlay.style.display = 'none';
        if (this.applyGradientCallback) {
          const img = document.getElementById('detailed-album-art');
          img.onload = () => this.applyGradientCallback(img);
        }
      };
      this.playbackOverlay.addEventListener('click', this.playbackOverlay._handler);
    }
    
    if (this.tracklist) {
      this.tracklist._handler = e => {
        const item = e.target.closest('.tracklist-item');
        if (item && !e.target.classList.contains('menu-icon') && !e.target.classList.contains('remove-song')) {
          document.querySelectorAll('.tracklist-item').forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          const songId = item.dataset.songId;
          this.songState.setSong(songId);
          this.songState.pushView('detailed-player');
          this.container.classList.add('hidden');
          document.getElementById('detailed-player').classList.add('active');
          document.getElementById('playback-overlay').style.display = 'none';
          if (this.applyGradientCallback) {
            const img = document.getElementById('detailed-album-art');
            img.onload = () => this.applyGradientCallback(img);
          }
        }
      };
      this.tracklist.addEventListener('click', this.tracklist._handler);
    }
    
    if (this.backBtn) {
      this.backBtn.removeEventListener('click', this.handleBackClick);
      this.handleBackClick = () => {
        console.log('Tracklist back button clicked, current history:', this.songState.getState().navigationHistory);
        const previousView = this.songState.popView();
        console.log('Navigating to previous view:', previousView);
      };
      this.backBtn.addEventListener('click', this.handleBackClick);
    } else {
      console.warn('tracklist-back-btn not found, cannot bind event');
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
        this.offcanvas.dataset.playlistName = this.type === 'playlist' ? this.tracksKey : '';
        this.offcanvas.show();
      };
      icon.addEventListener('click', icon._handler);
    });
    
    window.addEventListener('scroll', this.debounce(this.updateNavbar.bind(this), 150));
    window.addEventListener('resize', this.updateNavbar.bind(this));
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
  
  updateNavbar() {
    if (!this.navbar || !this.header || !this.albumArtContainer) return;
    const navbarRect = this.navbar.getBoundingClientRect();
    const headerRect = this.header.getBoundingClientRect();
    if (navbarRect.top <= 0 && headerRect.bottom <= 0) {
      this.navbar.classList.add('sticky');
      this.albumArtContainer.classList.add('sticky');
    } else {
      this.navbar.classList.remove('sticky');
      this.albumArtContainer.classList.remove('sticky');
    }
  }
  
  show() {
    this.container.classList.remove('hidden');
    document.getElementById('playback-overlay').style.display = this.type === 'album' ? 'flex' : 'none';
  }
  
  hide() {
    this.container.classList.add('hidden');
  }
}


// js/utils.js
export function generateCollage(tracks, size = 'small') {
  const placeholder = '/proxy-image?url=https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png'; // Local placeholder
  if (!tracks || !Array.isArray(tracks) || tracks.length === 0) {
    console.warn('No valid tracks provided for collage, returning single placeholder');
    return `<img src="${placeholder}" class="collage-single collage-single-${size}" alt="Placeholder" onerror="this.src='${placeholder}'">`;
  }
  
  // Get up to 4 thumbnails
  const thumbnails = tracks
    .slice(0, 4)
    .map((song) => song?.thumbnail || placeholder);
  while (thumbnails.length < 4) thumbnails.push(placeholder);
  
  // Generate 2x2 grid HTML with size-specific class
  const html = `
    <div class="collage-grid collage-grid-${size}">
      ${thumbnails
        .map(
          (src, index) => `
            <img src="${src}" class="collage-img" alt="Track ${index + 1}" loading="lazy" onerror="this.src='${placeholder}'">
          `
        )
        .join('')}
    </div>
  `;
  
  console.log(`Generated collage HTML (size: ${size}):`, html);
  return html;
}



My css 

/* css/styles.css */

/* Global Styles */
body {
  background: linear-gradient(to bottom, #1e1e2f, #2a2a4a);
  color: #fff;
  font-family: 'Arial', sans-serif;
  margin: 0;
  overflow-y: auto;
  min-height: 100vh;
  transition: background 0.3s ease;
}

/* Buttons and Controls */
.back-btn, #tracklist-back-btn, #playlist-back-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1003;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease;
  pointer-events: auto;
}

.back-btn:hover, #tracklist-back-btn:hover, #playlist-back-btn:hover {
  background: rgba(0, 0, 0, 0.7);
}

.back-btn::before, #tracklist-back-btn::before, #playlist-back-btn::before {
  content: '←';
  font-size: 20px;
  color: #fff;
}

.control-btn {
  font-size: 1.5rem;
  background: none;
  border: none;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  z-index: 2;
  pointer-events: auto;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.control-btn.active {
  color: #6b48ff;
  opacity: 1;
}

.control-btn:hover {
  opacity: 0.8;
  transform: scale(1.1);
}

.play-btn {
  width: 50px;
  height: 50px;
  font-size: 1.25rem;
  border-radius: 50%;
  background-color: #6b48ff;
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  pointer-events: auto;
}

.bottom-controls {
  font-size: 1.5rem;
  background: none;
  border: none;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  z-index: 1003;
  transition: opacity 0.2s ease;
  pointer-events: auto;
}

.bottom-controls.active {
  color: #6b48ff;
  opacity: 1;
}

.bottom-controls:hover {
  opacity: 0.8;
}

#global-back-btn {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1100;
  background: #3a3a5a;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: background 0.2s ease;
}

#global-back-btn:hover {
  background: #4a4a6a;
}

#global-back-btn.d-none {
  display: none;
}

.toggle-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  background: #3a3a5a;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
  transition: background 0.2s ease;
}

.toggle-btn:hover {
  background: #4a4a6a;
}

/* Progress Bar */
.progress {
  height: 5px;
  width: 100%;
  max-width: 300px;
  background-color: #ddd;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  z-index: 2;
  pointer-events: auto;
}

.progress-bar {
  height: 100%;
  background-color: #6b48ff;
  border-radius: 5px;
  transition: width 0.1s linear;
}

.progress-dot {
  width: 10px;
  height: 10px;
  background-color: #6b48ff;
  border-radius: 50%;
  position: absolute;
  top: -2.5px;
  right: -5px;
  z-index: 2;
  pointer-events: none;
}

/* Homepage View */
.home-view {
  max-width: 414px;
  margin: 0 auto;
  padding: 20px 15px;
  padding-bottom: 80px;
  display: block;
}

.home-view.hidden {
  display: none;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
}

.carousel-inner img {
  width: 100%;
  max-width: 240px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 12px;
  margin: 0 auto;
  cursor: pointer;
}

.carousel-caption {
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  padding: 10px;
}

.carousel-caption h5 {
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
}

.carousel-caption p {
  font-size: 1rem;
  margin-bottom: 0;
  opacity: 0.75;
}

.carousel-control-prev,
.carousel-control-next {
  width: 10%;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  filter: invert(1);
}

.playlist-section {
  display: flex;
  overflow-x: auto;
  gap: 15px;
  padding-bottom: 10px;
  scrollbar-width: none;
  margin-bottom: 15px;
}

.playlist-section::-webkit-scrollbar {
  display: none;
}

.playlist-item {
  flex: 0 0 140px;
  cursor: pointer;
}

.playlist-item img {
  width: 100%;
  max-width: 120px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
}

.playlist-item .track-title {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

.playlist-item .track-artist {
  font-size: 12px;
  opacity: 0.75;
}

.album-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.album-item {
  display: flex;
  align-items: center;
  padding: 10px;
  background: #2a2a4a;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.album-item:hover {
  background: #3a3a5a;
}

.album-thumbnail {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 15px;
}

.album-details {
  display: flex;
  flex-direction: column;
}

.album-title {
  font-size: 1.1rem;
  color: #fff;
}

.album-artist {
  font-size: 0.9rem;
  color: #aaa;
}

#create-playlist-btn {
  margin: 10px 0;
}

/* Tracklist View */
#tracklist-view {
  max-width: 360px;
  margin: 0 auto;
  padding: 60px 15px 80px;
  display: block;
}

#tracklist-view.hidden {
  display: none;
}

#sticky-navbar {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px;
  transition: opacity 0.3s ease;
  opacity: 0;
}

#sticky-navbar.sticky {
  display: flex;
  align-items: center;
  opacity: 1;
}

#sticky-navbar .thumbnail-art {
  display: block;
  width: 40px;
  height: 40px;
  object-fit: cover;
  margin-right: 10px;
  opacity: 1;
  border: 1px solid #fff; /* Remove after debugging */
}

#sticky-navbar .album-name {
  color: #fff;
  font-size: 16px;
}

/* Playlist View */
#playlist-view {
  max-width: 360px;
  margin: 0 auto;
  padding: 60px 15px 80px;
  display: block;
}

#playlist-view.hidden {
  display: none;
}

#playlist-sticky-navbar {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px;
  transition: opacity 0.3s ease;
  opacity: 0;
}

#playlist-sticky-navbar.sticky {
  display: flex;
  align-items: center;
  opacity: 1;
}

#playlist-sticky-navbar .thumbnail-art {
  display: block;
  width: 40px;
  height: 40px;
  object-fit: cover;
  margin-right: 10px;
  opacity: 1;
  border: 1px solid #fff; /* Remove after debugging */
}

#playlist-sticky-navbar .album-name {
  color: #fff;
  font-size: 16px;
}

.album-header {
  text-align: center;
  position: relative;
  padding-bottom: 20px;
  scroll-snap-align: start;
}

.album-art-container {
  position: relative;
  display: inline-block;
  width: 300px;
  height: 300px;
  max-width: 80vw;
  max-height: 80vw;
  margin-top: 20px;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  z-index: 1;
  pointer-events: none;
}

.album-art-container.sticky {
  display: none;
}

.album-art {
  width: 100%;
  max-width: 300px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.album-info {
  margin-top: 15px;
}

.tracklist {
  margin-top: 20px;
  padding-bottom: 20px;
  scroll-snap-align: start;
  transition: margin-top 0.3s ease;
}

.tracklist.navbar-active {
  margin-top: 90px;
}

.tracklist-item {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
  height: 70px;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.tracklist-item.active {
  background: rgba(255, 255, 255, 0.2);
}

.track-info {
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.track-thumbnail {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 10px;
}

.track-number {
  width: 25px;
  text-align: right;
  opacity: 0.75;
  margin-right: 10px;
}

.track-details {
  flex-grow: 1;
}

.track-title {
  font-size: 14px;
  font-weight: 500;
}

.track-duration {
  font-size: 12px;
  opacity: 0.75;
  margin-left: 8px;
}

.menu-icon {
  cursor: pointer;
  font-size: 24px;
  opacity: 0.85;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.menu-icon:hover {
  opacity: 1;
  transform: scale(1.1);
}

/* Playback Footer */
.playback-overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px 15px;
  display: flex;
  align-items: center;
  z-index: 1002;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.playback-cover {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 10px;
}

.playback-info {
  flex-grow: 1;
}

.playback-title {
  font-size: 14px;
  font-weight: 500;
}

.playback-album {
  font-size: 12px;
  opacity: 0.75;
}

.playback-control {
  font-size: 24px;
  padding: 10px;
  display: inline-block;
  min-width: 44px;
  min-height: 44px;
  text-align: center;
  cursor: pointer;
  opacity: 0.85;
  transition: opacity 0.2s ease;
  pointer-events: auto;
  user-select: none;
  z-index: 1001;
}

.playback-control:hover {
  opacity: 1;
}

/* Detailed Player View */
.detailed-player {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: #1a1a2e;
  color: #fff;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  min-height: 100vh;
  box-sizing: border-box;
  pointer-events: none;
}

.detailed-player.active {
  display: flex;
  pointer-events: auto;
}

#detailed-album-art {
  width: 300px;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

#detailed-title {
  font-size: 1.8rem;
  margin-bottom: 10px;
  text-align: center;
}

#detailed-album.clickable-album {
  font-size: 1.2rem;
  color: #aaa;
  cursor: pointer;
  transition: color 0.2s ease;
}

#detailed-album.clickable-album:hover {
  color: #d4a5d9;
}

#play-pause-btn, #favourite-btn, #lyrics-btn, #queue-btn {
  margin: 10px;
  padding: 12px 24px;
  font-size: 1.5rem;
  background: #3a3a5a;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;
  pointer-events: auto;
  z-index: 1001;
}

#play-pause-btn:hover, #favourite-btn:hover, #lyrics-btn:hover, #queue-btn:hover {
  background: #4a4a6a;
}

/* Lyrics View */
.lyrics-player {
  width: 100%;
  min-height: 100vh;
  display: none;
  position: relative;
  overflow: hidden;
}

.lyrics-player.active {
  display: block;
}

.lyrics-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: blur(20px);
  opacity: 0.3;
  z-index: 1;
}

.lyrics-content {
  position: relative;
  z-index: 2;
  max-width: 414px;
  margin: 0 auto;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 15px;
  box-sizing: border-box;
}

.lyrics-container {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  margin: 20px 0;
  max-height: 60vh;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.lyrics-container p {
  margin: 15px 0;
  font-size: 18px;
  line-height: 1.6;
  color: #fff;
  opacity: 0.7;
  text-align: center;
  transition: all 0.3s ease;
}

.lyrics-container p.static-lyric {
  opacity: 0.9;
  font-size: 18px;
  margin: 10px 0;
}

.lyrics-container p.section {
  font-size: 16px;
  font-weight: bold;
  color: #b3b3b3;
  opacity: 1;
  margin: 20px 0;
}

.lyrics-container p.active {
  color: #6b48ff;
  font-weight: bold;
  opacity: 1;
  font-size: 20px;
  transform: scale(1.05);
}

.lyrics-container p.active.section {
  color: #6b48ff;
  font-size: 18px;
}

.lyrics-progress {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
}

.lyrics-progress .time {
  font-size: 12px;
  color: #fff;
  opacity: 0.9;
  width: 40px;
  text-align: center;
}

/* Queue View */
.queue-player {
  max-width: 360px;
  margin: 0 auto;
  padding: 0 15px;
  padding-bottom: 80px;
  display: none;
}

.queue-player.active, .queue-player:not(.hidden) {
  display: block;
}

.header {
  text-align: center;
  position: relative;
  scroll-snap-align: start;
}

.subtitle {
  font-size: 14px;
  opacity: 0.75;
}

/* Offcanvas */
.offcanvas {
  background: rgba(30, 30, 47, 0.95);
  color: #fff;
  max-height: 50vh;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  z-index: 1003;
}

.offcanvas-title {
  font-size: 18px;
  font-weight: bold;
}

.offcanvas-body {
  padding: 0;
}

.offcanvas-menu-item {
  padding: 15px 20px;
  font-size: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: background 0.2s ease;
}

.offcanvas-menu-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

/* Modals and Dropdowns */
.dropdown-menu {
  background-color: #2a2a4a;
  border: none;
}

.dropdown-item {
  color: #fff;
  padding: 8px 16px;
}

.dropdown-item:hover {
  background-color: #6b48ff;
  color: #fff;
}

#playlist-modal .modal-content {
  border: none;
  border-radius: 10px;
  background: rgba(30, 30, 47, 0.95);
}

#playlist-modal .form-control {
  border-color: #6b48ff;
}

#playlist-modal .form-control:focus {
  border-color: #d4a5d9;
  box-shadow: 0 0 5px rgba(107, 72, 255, 0.5);
}

/* Navbar Transitions */
.navbar {
  background: rgba(30, 30, 47, 0.9);
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 10px 15px;
  display: none;
}

.navbar.show {
  display: flex;
}

.navbar img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.navbar.show img {
  opacity: 1;
}

.transitioning .album-art {
  position: absolute;
  z-index: 1001;
  animation: shrinkAndMove 0.5s ease forwards;
}

.transitioning-back .album-art {
  position: absolute;
  z-index: 1001;
  animation: expandAndCenter 0.5s ease forwards;
}

@keyframes shrinkAndMove {
  0% {
    width: 280px;
    transform: translate(0, 0);
    opacity: 1;
  }
  100% {
    width: 60px;
    transform: translate(-135px, -350px);
    opacity: 0;
  }
}

@keyframes expandAndCenter {
  0% {
    width: 60px;
    transform: translate(-135px, -350px);
    opacity: 0;
  }
  100% {
    width: 280px;
    transform: translate(0, 0);
    opacity: 1;
  }
}

/* Responsive Adjustments for 360px Screens */
@media (max-width: 360px) {
  .home-view {
    padding: 15px 10px;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .carousel-inner img {
    max-width: 200px;
  }

  .carousel-caption h5 {
    font-size: 1rem;
  }

  .carousel-caption p {
    font-size: 0.875rem;
  }

  .playlist-item {
    flex: 0 0 120px;
  }

  .playlist-item img {
    max-width: 100px;
  }

  .playlist-item .track-title {
    font-size: 12px;
  }

  .playlist-item .track-artist {
    font-size: 10px;
  }

  #tracklist-view, #playlist-view {
    padding: 60px 10px 80px;
  }

  .album-art-container {
    width: 240px;
    height: 240px;
  }

  .album-art {
    max-width: 240px;
  }

  .album-info .fs-4 {
    font-size: 20px !important;
  }

  .album-info .fs-5 {
    font-size: 14px !important;
  }

  .navbar img {
    width: 50px;
    height: 50px;
  }

  .navbar .album-name {
    font-size: 16px;
  }

  .tracklist.navbar-active {
    margin-top: 80px;
  }

  .tracklist-item {
    padding: 12px;
    height: 70px;
  }

  .track-thumbnail {
    width: 35px;
    height: 35px;
  }

  .track-number {
    width: 25px;
    margin-right: 10px;
  }

  .track-title {
    font-size: 14px;
  }

  .track-duration {
    font-size: 12px;
    margin-left: 8px;
  }

  .menu-icon {
    font-size: 20px;
  }

  .playback-overlay {
    padding: 8px 12px;
  }

  .playback-cover {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }

  .playback-title {
    font-size: 12px;
  }

  .playback-album {
    font-size: 10px;
  }

  .playback-control {
    font-size: 20px;
  }

  #detailed-album-art {
    max-width: 95%;
  }

  .song-title {
    font-size: 24px !important;
  }

  .artist {
    font-size: 16px !important;
  }

  .control-btn {
    font-size: 24px !important;
  }

  .play-btn {
    width: 50px !important;
    height: 50px !important;
    font-size: 20px !important;
  }

  .time {
    font-size: 12px !important;
  }

  .audio-info {
    font-size: 12px !important;
  }

  .bottom-controls {
    font-size: 18px !important;
  }

  .lyrics-container {
    padding: 15px;
  }

  .lyrics-container p {
    font-size: 16px !important;
  }
}

/* css/styles.css (partial update, append to existing file) */

/* Favourites View */
#favourites-view {
  max-width: 360px;
  margin: 0 auto;
  padding: 60px 15px 80px;
  display: block;
}

#favourites-view.hidden {
  display: none;
}

#favourites-sticky-navbar {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px;
  transition: opacity 0.3s ease;
  opacity: 0;
}

#favourites-sticky-navbar.sticky {
  display: flex;
  align-items: center;
  opacity: 1;
}

#favourites-sticky-navbar .thumbnail-art {
  display: block;
  width: 40px;
  height: 40px;
  object-fit: cover;
  margin-right: 10px;
  opacity: 1;
  border: 1px solid #fff; /* Remove after debugging */
}

#favourites-sticky-navbar .album-name {
  color: #fff;
  font-size: 16px;
}


/* recently-played View */
#recently-played-view {
  max-width: 360px;
  margin: 0 auto;
  padding: 60px 15px 80px;
  display: block;
}

#recently-played-view.hidden {
  display: none;
}

#recently-played-sticky-navbar {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px;
  transition: opacity 0.3s ease;
  opacity: 0;
}

#recently-played-sticky-navbar.sticky {
  display: flex;
  align-items: center;
  opacity: 1;
}

#recently-played-sticky-navbar .thumbnail-art {
  display: block;
  width: 40px;
  height: 40px;
  object-fit: cover;
  margin-right: 10px;
  opacity: 1;
  border: 1px solid #fff; /* Remove after debugging */
}

#recently-played-sticky-navbar .album-name {
  color: #fff;
  font-size: 16px;
}








.cover-container {
  position: relative;
  width: 100px;
  height: 100px;
  cursor: pointer;
  flex-shrink: 0;
}
.cover-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}


/* Update existing back-btn selector */
.back-btn, #tracklist-back-btn, #playlist-back-btn, #favourites-back-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1003;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background 0.3s ease;
  pointer-events: auto;
}

/* Update responsive media query */
@media (max-width: 360px) {
  #tracklist-view, #playlist-view, #favourites-view #recently-played {
    padding: 60px 10px 80px;
  }
}


/* css/styles.css (append to existing file) */

/* Update cover-container styles */
.cover-container {
  position: relative;
  width: 100px;
  height: 100px;
  cursor: pointer;
  flex-shrink: 0;
}

.cover-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.overlay-label {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 14px;
  opacity: 1; /* Always visible, no hover required */
}


/* Fix navbar thumbnail */
#recently-played-thumbnail-art {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
}

/* Ensure tracklist images are consistent */
.tracklist-item img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

/* Ensure HomeView collages are consistent */
.view-all-cover-container {
  position: relative;
  width: 120px;
  height: 120px;
  cursor: pointer;
  flex-shrink: 0;
}

.view-all-cover-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.overlay-label {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 14px;
  opacity: 1;
}

/* Collage grid */
.collage-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;
  border-radius: 8px;
}

.collage-grid-small {
  width: 120px;
  height: 120px;
}

.collage-grid-large {
  width: 300px;
  height: 300px;
}

.collage-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Single image fallback */
.collage-single {
  object-fit: cover;
  border-radius: 8px;
}

.collage-single-small {
  width: 120px;
  height: 120px;
}

.collage-single-large {
  width: 300px;
  height: 300px;
}



The index.html

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Music Player</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css">
</head>

<body>
  <nav class="navbar navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <button id="global-back-btn" class="btn btn-outline-light d-none"></button>
      <span class="navbar-brand">Fresh Player</span>
    </div>
  </nav>
  
  <!-- Homepage View -->
  <div class="home-view" id="home-view">
    <div class="container-fluid px-3">
      <h2 class="section-title mb-3">Latest Releases</h2>
      <div id="latest-releases-carousel" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner" id="carousel-inner"></div>
        <button class="carousel-control-prev" type="button" data-bs-target="#latest-releases-carousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#latest-releases-carousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <h3>Albums</h3>
      <div id="albums-section" class="album-section"></div>
      <h2 class="section-title mt-4 mb-3">Recently Played</h2>
      <div class="playlist-section" id="recently-played"></div>
      <h2 class="section-title mt-4 mb-3">Favourites</h2>
      <div class="playlist-section" id="favourites"></div>
      <h2 class="section-title mt-4 mb-3">Fresh Picks</h2>
      <div class="playlist-section" id="fresh-picks"></div>
      <h2 class="section-title mt-4 mb-3">Custom Playlists</h2>
      <div class="playlist-section mb-3">
        <button class="btn btn-sm btn-outline-light" id="create-playlist-btn">Create Playlist</button>
      </div>
      <div class="playlist-section" id="playlists"></div>
    </div>
  </div>
  
  <!-- Tracklist View -->
  <div class="music-player hidden" id="tracklist-view">
    <nav class="navbar fixed-top" id="sticky-navbar">
      <div class="d-flex align-items-center">
        <img id="thumbnail-art" alt="Album Art" src="https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png" onerror="this.src='https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png'">
        <span class="album-name" id="navbar-album-name"></span>
      </div>
    </nav>
    <div class="album-header" id="album-header">
      <button class="back-btn" id="tracklist-back-btn"></button>
      <div class="album-art-container mt-5">
        <img id="main-album-art" alt="Album Art" class="album-art" src="https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png" onerror="this.src='https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png'">
      </div>
      <div class="album-info">
        <div class="album-name fs-4 fw-bold" id="album-title"></div>
        <div class="release-year fs-5 opacity-75" id="album-release"></div>
      </div>
    </div>
    <div class="tracklist" id="tracklist"></div>
  </div>
  
  <!-- Playlist View -->
  <div class="music-player hidden" id="playlist-view">
    <nav class="navbar fixed-top" id="playlist-sticky-navbar">
      <div class="d-flex align-items-center">
        <img id="playlist-thumbnail-art" alt="Playlist Cover" src="https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png" onerror="this.src='https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png'">
        <span class="album-name" id="playlist-navbar-name"></span>
      </div>
    </nav>
    <div class="album-header" id="playlist-header">
      <button class="back-btn" id="playlist-back-btn"></button>
      <div class="album-art-container mt-5">
        <img id="playlist-main-art" alt="Playlist Cover" class="album-art" src="https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png" onerror="this.src='https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png'">
      </div>
      <div class="album-info">
        <div class="album-name fs-4 fw-bold" id="playlist-title"></div>
        <div class="release-year fs-5 opacity-75" id="playlist-song-count"></div>
      </div>
    </div>
    <div class="tracklist" id="playlist-tracklist"></div>
  </div>
  
  <!-- Recently Played View -->
  <div class="music-player hidden" id="recently-played-view">
    <nav class="navbar fixed-top" id="recently-played-sticky-navbar">
      <div class="d-flex align-items-center">
        <img id="recently-played-thumbnail-art" class="thumbnail-art" alt="Recently Played Cover" src="/images/placeholder.png" onerror="this.src='/images/placeholder.png'">
        <span class="album-name" id="recently-played-navbar-name">Recently Played</span>
      </div>
    </nav>
    <div class="album-header" id="recently-played-header">
      <button class="back-btn" id="recently-played-back-btn"></button>
      <div class="album-art-container recently-played mt-5">
        <div id="recently-played-main-art" class="album-art"></div>
      </div>
      <div class="album-info">
        <div class="album-name fs-4 fw-bold" id="recently-played-title">Recently Played</div>
        <div class="release-year fs-5 opacity-75" id="recently-played-song-count"></div>
      </div>
    </div>
    <div class="tracklist" id="recently-played-tracklist"></div>
  </div>
  
  <!-- Favourites View -->
  <div class="music-player hidden" id="favourites-view">
    <nav class="navbar fixed-top" id="favourites-sticky-navbar">
      <div class="d-flex align-items-center">
        <img id="favourites-thumbnail-art" class="thumbnail-art" alt="Favourites Cover" src="/images/placeholder.png" onerror="this.src='/images/placeholder.png'">
        <span class="album-name" id="favourites-navbar-name">Favourites</span>
      </div>
    </nav>
    <div class="album-header" id="favourites-header">
      <button class="back-btn" id="favourites-back-btn"></button>
      <div class="album-art-container favourites mt-5">
        <div id="favourites-main-art" class="album-art"></div>
      </div>
      <div class="album-info">
        <div class="album-name fs-4 fw-bold" id="favourites-title">Favourites</div>
        <div class="release-year fs-5 opacity-75" id="favourites-song-count"></div>
      </div>
    </div>
    <div class="tracklist" id="favourites-tracklist"></div>
  </div>
  
  
  <!-- Playback Footer -->
  <div class="playback-overlay" id="playback-overlay">
    <img class="playback-cover" src="https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png" alt="Track Cover">
    <div class="playback-info">
      <div class="playback-title">Select a track</div>
      <div class="playback-album">Unknown</div>
    </div>
    <span class="playback-control" id="playback-control">▶</span>
  </div>
  
  <!-- Detailed Player View -->
  <div class="detailed-player" id="detailed-player">
    <button class="back-btn" id="detailed-toggle-btn"></button>
    <div class="p-3">
      <div class="album-art-container d-flex justify-content-center mb-5">
        <img id="detailed-album-art" src="https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png" alt="Album Art" onerror="this.src='https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png'">
      </div>
      <div class="text-center mb-3">
        <h5 class="song-title fs-4 fw-bold" id="detailed-song-title">Select a track</h5>
        <p class="artist fs-5 text-muted" id="detailed-artist">Frith Hilton</p>
      </div>
      <div class="d-flex justify-content-center align-items-center gap-3 mb-3">
        <button id="shuffle-btn" class="control-btn btn p-0">🔀</button>
        <button id="rewind-btn" class="control-btn btn p-0">⏪</button>
        <button id="prev-btn" class="control-btn btn p-0">⏮️</button>
        <button class="play-btn btn d-flex justify-content-center align-items-center" id="detailed-play-btn">▶️</button>
        <button id="next-btn" class="control-btn btn p-0">⏭️</button>
        <button id="forward-btn" class="control-btn btn p-0">⏩</button>
        <button id="repeat-btn" class="control-btn btn p-0">🔁</button>
      </div>
      <div class="mb-3">
        <div class="progress position-relative">
          <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
          <div class="progress-dot"></div>
        </div>
        <div class="d-flex justify-content-between mt-1">
          <span class="time fs-6" id="detailed-current-time">00:00</span>
          <span class="time fs-6" id="detailed-total-time">00:00</span>
        </div>
      </div>
      <div class="text-center mb-3">
        <p class="audio-info fs-6 text-muted">MP3 • 192 kb/s • 44.1 kHz</p>
      </div>
      <div class="d-flex justify-content-around">
        <button class="btn p-0 fs-5 bottom-controls" id="lyrics-btn">💬</button>
        <button class="btn p-0 fs-5 bottom-controls" id="favourite-btn">🤍</button>
        <button class="btn p-0 fs-5 bottom-controls">🌙</button>
        <button class="btn p-0 fs-5 bottom-controls">📜</button>
        <button class="btn p-0 fs-5 bottom-controls" id="queue-btn">📋</button>
      </div>
    </div>
  </div>
  
  <!-- Lyrics View -->
  <div id="lyrics-player" class="lyrics-player">
    <div class="lyrics-content">
      <h2 id="lyrics-song-title" class="song-title"></h2>
      <p id="lyrics-artist" class="artist"></p>
      <div id="lyrics-container" class="lyrics-container"></div>
      <div class="lyrics-progress">
        <span id="lyrics-current-time" class="time">00:00</span>
        <div class="progress">
          <div class="progress-bar"></div>
          <div class="progress-dot"></div>
        </div>
        <span id="lyrics-total-time" class="time">00:00</span>
      </div>
      <div class="d-flex justify-content-around mt-3">
        <button id="lyrics-toggle-btn" class="btn p-0 fs-5 bottom-controls">🎵 </button>
      </div>
      <div class="d-flex justify-content-center align-items-center gap-3 mt-3">
        <button id="lyrics-shuffle-btn" class="control-btn btn p-0">🔀</button>
        <button id="lyrics-rewind-btn" class="control-btn btn p-0">⏪</button>
        <button id="lyrics-prev-btn" class="control-btn btn p-0">⏮️</button>
        <button id="lyrics-play-btn" class="play-btn btn d-flex justify-content-center align-items-center">▶️</button>
        <button id="lyrics-next-btn" class="control-btn btn p-0">⏭️</button>
        <button id="lyrics-forward-btn" class="control-btn btn p-0">⏩</button>
        <button id="lyrics-repeat-btn" class="control-btn btn p-0">🔁</button>
      </div>
    </div>
    <div id="lyrics-background"></div>
  </div>
  
  <!-- Queue View -->
  <div id="queue-player" class="queue-player">
    <div class="header">
      <button id="queue-toggle-btn" class="toggle-btn">🎵</button>
      <div class="title fs-4 fw-bold">Queue</div>
      <div class="subtitle fs-5 opacity-75"></div>
      <button id="queue-clear-btn" class="btn btn-sm btn-outline-light mt-2">Clear Queue</button>
    </div>
    <div class="tracklist"></div>
  </div>
  
  <!-- Offcanvas -->
  <div class="offcanvas offcanvas-bottom" tabindex="-1" id="trackMenu" aria-labelledby="trackMenuLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="trackMenuLabel">Track Name</h5>
      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div class="offcanvas-menu-item" id="add-to-queue">Add to Queue</div>
      <div class="offcanvas-menu-item dropdown" id="add-to-playlist">
        <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Add to Playlist
        </a>
        <ul class="dropdown-menu" id="playlist-dropdown"></ul>
      </div>
      <div class="offcanvas-menu-item" id="create-playlist">Create Playlist</div>
      <div class="offcanvas-menu-item" id="delete-playlist">Delete Playlist</div>
      <div class="offcanvas-menu-item" id="rename-playlist">Rename Playlist</div>
      <div class="offcanvas-menu-item">Share</div>
      <div class="offcanvas-menu-item">View Details</div>
    </div>
  </div>
  
  <!-- Playlist Modal -->
  <div class="modal fade" id="playlist-modal" tabindex="-1" aria-labelledby="playlist-modal-title" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content bg-dark text-light">
        <div class="modal-header">
          <h5 class="modal-title" id="playlist-modal-title">Create Playlist</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input type="text" class="form-control bg-dark text-light" id="playlist-name-input" placeholder="Playlist name">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-primary" id="playlist-action" data-action="create">Create</button>
        </div>
      </div>
    </div>
  </div>
  
  <audio id="audio-player" preload="metadata"></audio>
  
  
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.4.0/color-thief.umd.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js" integrity="sha512-BNaRQnYJYiPSqHHDb58B0yaPfCu+Wgds8Gp/gU33kqBtgNS4tSPHuGibyoeqMV/TJlSKda6FXzoEyYGjTe+vXA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
  <script type="module" src="js/main.js"></script>
</body>

</html> 


This is my codebase for the music player





