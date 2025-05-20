// js/playlistView.js (partial update)
import { generateCollage } from './utils.js';

// Replace generateCollage method
async generateCollage(tracks) {
  const placeholder = 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png';
  return tracks.length > 0 ?
    await generateCollage(tracks.map(t => ({ ...t, thumbnail: t.thumbnail || placeholder }))) :
    placeholder;
}