const path = require('path');
const fs = require('fs/promises');
const { recognize } = require('tesseract.js');
const { PDFImage } = require('pdf-image');
const os = require('os');
const crypto = require('crypto');

async function ocrFromPDF(pdfPath) {
  const tempDir = path.join(os.tmpdir(), crypto.randomUUID());
  await fs.mkdir(tempDir, { recursive: true });

  const pdfImage = new PDFImage(pdfPath, {
    outputDirectory: tempDir,
    convertOptions: {
      "-density": "300",
      "-quality": "100"
    }
  });

  const imagePaths = await pdfImage.convertFile(); // returns array of image paths

  let text = '';
  for (const imagePath of imagePaths) {
    const { data: { text: ocrText } } = await recognize(imagePath, 'eng');
    text += ocrText + '\n';
  }

  await fs.rm(tempDir, { recursive: true, force: true });

  return text;
}

module.exports = { ocrFromPDF };
