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