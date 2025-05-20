// js/utils.js
export async function generateCollage(tracks) {
  const placeholder = 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png';
  const canvas = document.createElement('canvas');
  canvas.width = 120; // Match playlist-item img size
  canvas.height = 120;
  const ctx = canvas.getContext('2d');
  
  // Get up to 4 song thumbnails
  const thumbnails = tracks.slice(0, 4).map(song => song.thumbnail || placeholder);
  while (thumbnails.length < 4) thumbnails.push(thumbnails[0] || placeholder);
  
  // Load images
  const images = await Promise.all(thumbnails.map(src => {
    return new Promise(resolve => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = () => resolve(new Image()); // Fallback to empty image
    });
  }));
  
  // Draw 2x2 collage
  const size = canvas.width / 2;
  images.forEach((img, i) => {
    const x = (i % 2) * size;
    const y = Math.floor(i / 2) * size;
    ctx.drawImage(img, x, y, size, size);
  });
  
  return canvas.toDataURL('image/png');
}