const path = require('path');
const fs = require('fs/promises');
const { recognize } = require('tesseract.js');
const convert = require('pdf-poppler').convert;
const os = require('os');
const crypto = require('crypto');

async function ocrFromPDF(pdfPath) {
  const tempDir = path.join(os.tmpdir(), crypto.randomUUID());
  await fs.mkdir(tempDir, { recursive: true });

  await convert(pdfPath, {
    format: 'png',
    out_dir: tempDir,
    out_prefix: 'page',
    page: null,
  });

  const files = await fs.readdir(tempDir);
  const imageFiles = files.filter(f => f.endsWith('.png')).sort();

  let text = '';
  for (const img of imageFiles) {
    const imagePath = path.join(tempDir, img);
    const { data: { text: ocrText } } = await recognize(imagePath, 'eng');
    text += ocrText + '\n';
  }

  await fs.rm(tempDir, { recursive: true, force: true });

  return text;
}

module.exports = { ocrFromPDF };
