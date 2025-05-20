// js/utils.js
export async function generateCollage(tracks) {
  const placeholder = 'https://frithhilton.com.ng/images/favicon/FrithHiltonLogo.png';
  if (!tracks || !Array.isArray(tracks) || tracks.length === 0) {
    console.warn('No valid tracks provided for collage, returning placeholder');
    return placeholder;
  }
  
  const canvas = document.createElement('canvas');
  canvas.width = 120; // Match playlist-item size
  canvas.height = 120;
  const ctx = canvas.getContext('2d');
  
  // Get up to 4 thumbnails
  const thumbnails = tracks
    .slice(0, 4)
    .map((song) => song?.thumbnail || placeholder);
  while (thumbnails.length < 4) thumbnails.push(placeholder); // Fill with placeholder
  
  // Load images
  let loadedImages = 0;
  const imageObjects = [];
  const loadPromises = thumbnails.map(
    (src) =>
    new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = src;
      img.onload = () => {
        loadedImages++;
        imageObjects.push(img);
        resolve();
      };
      img.onerror = () => {
        console.warn(`Failed to load image: ${src}, using placeholder`);
        const placeholderImg = new Image();
        placeholderImg.src = placeholder;
        placeholderImg.onload = () => {
          loadedImages++;
          imageObjects.push(placeholderImg);
          resolve();
        };
        placeholderImg.onerror = () => {
          loadedImages++;
          imageObjects.push(new Image()); // Fallback to empty
          resolve();
        };
      };
    })
  );
  
  // Wait for all images to load
  await Promise.all(loadPromises);
  
  // Draw 2x2 collage
  if (loadedImages === thumbnails.length) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    imageObjects.forEach((img, index) => {
      const size = canvas.width / 2; // 60px
      const x = (index % 2) * size;
      const y = Math.floor(index / 2) * size;
      ctx.drawImage(img, x, y, size, size);
    });
  } else {
    console.warn('Not all images loaded, returning placeholder');
    return placeholder;
  }
  
  // Return the collage as a data URL
  try {
    const dataUrl = canvas.toDataURL('image/png');
    console.log('Generated collage:', dataUrl);
    return dataUrl;
  } catch (error) {
    console.error('Error generating collage data URL:', error);
    return placeholder;
  }
}