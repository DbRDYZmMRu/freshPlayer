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
  <!-- Navbar -->
  <nav class="navbar navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <span class="navbar-brand">Fresh Player</span>
    </div>
  </nav>

  <!-- Global Back Button -->
  <button id="global-back-btn" class="back-btn d-none">←</button>

  <!-- Home View -->
  <div class="music-player" id="home-view">
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
      <h2 class="section-title mt-4 mb-3">Recently Played</h2>
      <div class="playlist-items" id="recently-played"></div>
      <h2 class="section-title mt-4 mb-3">Favourites</h2>
      <div class="playlist-items" id="favourites"></div>
      <h2 class="section-title mt-4 mb-3">Fresh Picks</h2>
      <div class="playlist-items" id="fresh-picks"></div>
      <h2 class="section-title mt-4 mb-3">Custom Playlists</h2>
      <div class="playlist-items mb-3">
        <button class="btn btn-sm btn-outline-light" id="create-playlist-btn">Create Playlist</button>
      </div>
      <div class="playlist-items" id="playlists"></div>
      <h2 class="section-title mt-4 mb-3">Albums</h2>
      <div class="album-items" id="albums-section"></div>
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
      <button class="back-btn" id="tracklist-back-btn">←</button>
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
      <button class="back-btn" id="playlist-back-btn">←</button>
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

  <!-- Favourites View -->
  <div class="music-player hidden" id="favourites-view">
    <nav class="navbar fixed-top" id="favourites-sticky-navbar">
      <div class="d-flex align-items-center">
        <img id="favourites-thumbnail-art" alt="Favourites Cover" src="https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png" onerror="this.src='https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png'">
        <span class="album-name" id="favourites-navbar-name"></span>
      </div>
    </nav>
    <div class="album-header" id="favourites-header">
      <button class="back-btn" id="favourites-back-btn">←</button>
      <div class="album-art-container mt-5">
        <img id="favourites-main-art" alt="Favourites Cover" class="album-art" src="https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png" onerror="this.src='https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png'">
      </div>
      <div class="album-info">
        <div class="album-name fs-4 fw-bold" id="favourites-title"></div>
        <div class="release-year fs-5 opacity-75" id="favourites-song-count"></div>
      </div>
    </div>
    <div class="tracklist" id="favourites-tracklist"></div>
  </div>

  <!-- Playback Overlay -->
  <div class="playback-overlay" id="playback-overlay">
    <img class="playback-cover" src="https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png" alt="Track Cover">
    <div class="playback-info">
      <div class="playback-title">Select a track</div>
      <div class="playback-album">Unknown</div>
    </div>
    <button id="playback-control" class="control-btn">▶</button>
  </div>

  <!-- Detailed Player View -->
  <div class="music-player hidden" id="detailed-player">
    <button class="back-btn" id="detailed-toggle-btn">←</button>
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
        <button class="btn p-0 fs-5 bottom-controls" id="queue-btn">📋</button>
      </div>
    </div>
  </div>

  <!-- Lyrics View -->
  <div class="music-player hidden" id="lyrics-player">
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
      <div class="d-flex justify-content-center align-items-center gap-3 mt-3">
        <button id="shuffle-btn" class="control-btn btn p-0">🔀</button>
        <button id="rewind-btn" class="control-btn btn p-0">⏪</button>
        <button id="prev-btn" class="control-btn btn p-0">⏮️</button>
        <button id="play-btn" class="play-btn btn d-flex justify-content-center align-items-center">▶️</button>
        <button id="next-btn" class="control-btn btn p-0">⏭️</button>
        <button id="forward-btn" class="control-btn btn p-0">⏩</button>
        <button id="repeat-btn" class="control-btn btn p-0">🔁</button>
      </div>
    </div>
  </div>

  <!-- Queue View -->
  <div class="music-player hidden" id="queue-player">
    <div class="queue-content">
      <h2>Queue</h2>
      <button id="clear-queue-btn" class="btn btn-sm btn-outline-light mt-2">Clear Queue</button>
      <div class="tracklist" id="queue-tracklist"></div>
    </div>
  </div>

  <!-- Offcanvas Menu -->
  <div class="offcanvas offcanvas-bottom" tabindex="-1" id="trackMenu" aria-labelledby="trackMenuLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="trackMenuLabel">Track Options</h5>
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

  <!-- Audio Element -->
  <audio id="audio-player" preload="metadata"></audio>

  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.4.0/color-thief.umd.js"></script>
  <script type="module" src="js/main.js"></script>
</body>
</html>