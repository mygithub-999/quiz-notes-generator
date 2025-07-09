const pdf = require('pdf-parse');
const PPTX2Json = require('pptx2json');

async function extractFromPDF(filePath) {
  try {
    const data = await pdf(filePath);
    return data.text || "";
  } catch (err) {
    console.error("PDF extraction error:", err.message);
    return "";
  }
}
async function extractFromPPTX(filePath) {
  try {
    const pptx2json = new PPTX2Json();
    const json = await pptx2json.toJson(filePath);

    let text = "";
    for (const slide of json.slides) {
      for (const shape of slide.shapes) {
        if (shape.text) {
          text += shape.text + " ";
        }
      }
    }
    return text;
  } catch (err) {
    console.error("PPTX extraction error:", err.message);
    return "";
  }
}

module.exports = { extractFromPDF, extractFromPPTX };
