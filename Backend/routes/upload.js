const express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');
const { extractFromPDF, extractFromPPTX } = require('../services/textExtractor');
const { ocrFromPDF } = require('../services/ocr');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) throw new Error("No file uploaded");

    const ext = path.extname(req.file.originalname).toLowerCase();
    let text = "";

    if (ext === '.pdf') {
      text = await extractFromPDF(req.file.path);

      if (!text.trim()) {
        // Fallback to OCR if no text extracted
        text = await ocrFromPDF(req.file.path);
      }

    } else if (ext === '.pptx') {
      text = await extractFromPPTX(req.file.path);

    } else {
      throw new Error("Unsupported file type. Only .pdf and .pptx are allowed.");
    }

    if (!text.trim()) {
      throw new Error("Text extraction failed.");
    }

    text = text.slice(0, 12000); 

    res.json({ text });
  } catch (err) {
    next(err);
  }
});

module.exports = router
