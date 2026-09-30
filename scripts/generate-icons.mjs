/**
 * PWA Icon Generator for SKPT Cricket
 * Generates proper PNG icons with correct dimensions and maskable safe zones
 */
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const iconsDir = path.resolve(__dirname, '../public/icons');

// CRC32 implementation for PNG chunks
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeAndData = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData), 0);
  return Buffer.concat([len, typeAndData, crc]);
}

function createPNG(width, height, pixelData) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  // Add filter bytes (filter type 0 = None)
  const rawData = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    rawData[y * (1 + width * 4)] = 0;
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * 4;
      const dstIdx = y * (1 + width * 4) + 1 + x * 4;
      rawData[dstIdx] = pixelData[srcIdx];
      rawData[dstIdx + 1] = pixelData[srcIdx + 1];
      rawData[dstIdx + 2] = pixelData[srcIdx + 2];
      rawData[dstIdx + 3] = pixelData[srcIdx + 3];
    }
  }

  const compressed = zlib.deflateSync(rawData, { level: 9 });

  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

function drawCricketIcon(size, maskable) {
  const pixels = new Uint8Array(size * size * 4);

  // Background color #1e40af (SKPT blue)
  const bgR = 30, bgG = 64, bgB = 175;

  // Ball parameters - maskable icons need content in center 80% safe zone
  const ballRatio = maskable ? 0.55 : 0.65;
  const ballSize = size * ballRatio;
  const ballRadius = ballSize / 2;
  const ballCenterX = size / 2;
  const ballCenterY = size / 2;

  // Cricket ball red
  const ballR = 200, ballG = 30, ballB = 30;

  // Seam white
  const seamR = 255, seamG = 255, seamB = 255;

  // Highlight
  const highlightR = 255, highlightG = 100, highlightB = 100;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;

      // Default background
      let r = bgR, g = bgG, b = bgB, a = 255;

      // Check if inside ball
      const dx = x - ballCenterX;
      const dy = y - ballCenterY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= ballRadius) {
        // Base ball color
        r = ballR; g = ballG; b = ballB;

        // Add subtle gradient (darker at edges)
        const gradientFactor = 1 - (dist / ballRadius) * 0.3;
        r = Math.floor(r * gradientFactor);
        g = Math.floor(g * gradientFactor);
        b = Math.floor(b * gradientFactor);

        // Highlight (top-left)
        const highlightDx = x - (ballCenterX - ballRadius * 0.3);
        const highlightDy = y - (ballCenterY - ballRadius * 0.3);
        const highlightDist = Math.sqrt(highlightDx * highlightDx + highlightDy * highlightDy);
        if (highlightDist < ballRadius * 0.4) {
          const highlightFactor = 1 - highlightDist / (ballRadius * 0.4);
          r = Math.min(255, Math.floor(r + (highlightR - r) * highlightFactor * 0.5));
          g = Math.min(255, Math.floor(g + (highlightG - g) * highlightFactor * 0.5));
          b = Math.min(255, Math.floor(b + (highlightB - b) * highlightFactor * 0.5));
        }

        // Draw seam (curved white line across the ball)
        const seamWidth = Math.max(1.5, size * 0.012);
        const seamCurve = Math.sin((x / size) * Math.PI * 2) * ballRadius * 0.15;
        const seamY = ballCenterY + seamCurve;
        const distToSeam = Math.abs(y - seamY);

        if (distToSeam < seamWidth && dist > ballRadius * 0.15) {
          r = seamR; g = seamG; b = seamB;
        }

        // Seam stitches (small dots along the seam)
        const stitchSpacing = size * 0.06;
        const stitchX = ((x % stitchSpacing) + stitchSpacing) % stitchSpacing;
        const stitchSize = size * 0.008;
        if (distToSeam < seamWidth * 2 && stitchX < stitchSize && dist > ballRadius * 0.2) {
          r = 255; g = 255; b = 255;
        }
      }

      pixels[idx] = r;
      pixels[idx + 1] = g;
      pixels[idx + 2] = b;
      pixels[idx + 3] = a;
    }
  }

  return pixels;
}

// Generate icons
fs.mkdirSync(iconsDir, { recursive: true });

const sizes = [192, 512];
for (const size of sizes) {
  // Regular icon
  const regularPixels = drawCricketIcon(size, false);
  const regularPNG = createPNG(size, size, regularPixels);
  fs.writeFileSync(path.join(iconsDir, `icon-${size}.png`), regularPNG);
  console.log(`Created icon-${size}.png (${regularPNG.length} bytes)`);

  // Maskable icon
  const maskablePixels = drawCricketIcon(size, true);
  const maskablePNG = createPNG(size, size, maskablePixels);
  fs.writeFileSync(path.join(iconsDir, `icon-maskable-${size}.png`), maskablePNG);
  console.log(`Created icon-maskable-${size}.png (${maskablePNG.length} bytes)`);
}

console.log('\nAll PWA icons generated successfully!');
console.log(`Icons directory: ${iconsDir}`);
