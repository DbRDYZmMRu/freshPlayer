export function applyGradient(image) {
  const colorThief = new ColorThief();
  try {
    const dominantColor = colorThief.getColor(image);
    const palette = colorThief.getPalette(image, 3);
    const saturatedDominant = adjustSaturation(dominantColor, 80);
    const saturatedSecondary = adjustSaturation(palette[1] || dominantColor, 30);
    const color1 = rgbToCssColor(saturatedDominant);
    const color2 = rgbToCssColor(saturatedSecondary);
    document.body.style.background = `linear-gradient(to bottom, ${color1}, ${color2})`;
  } catch (error) {
    console.error('Error generating gradient:', error);
    document.body.style.background = 'linear-gradient(to bottom, #d4a5d9, #6b48ff)';
  }
}

function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
}

function hslToRgb(h, s, l) {
  h /= 360, s /= 100, l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function adjustSaturation(rgb, saturationIncrease = 20) {
  const [h, s, l] = rgbToHsl(rgb[0], rgb[1], rgb[2]);
  const newSaturation = Math.min(100, s + saturationIncrease);
  return hslToRgb(h, newSaturation, l);
}

function rgbToCssColor(rgb) {
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
}