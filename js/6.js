// js/homeView.js (partial, focusing on create-playlist-btn)
bindEvents() {
  // ... other bindings ...
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
          keyboard: true
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
}




      const createPlaylistBtn = document.getElementById('create-playlist-btn');
      if (createPlaylistBtn) {
        createPlaylistBtn.addEventListener('click', () => {
          const modal = new bootstrap.Modal(document.getElementById('playlist-modal'));
          document.getElementById('playlist-modal-title').textContent = 'Create Playlist';
          document.getElementById('playlist-name-input').value = '';
          document.getElementById('playlist-action').dataset.action = 'create';
          modal.show();
        });
      }
    } catch (error) {
      console.error('Error in HomeView.bindEvents:', error);
    }
  }
