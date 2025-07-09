const express = require('express');
const router = express.Router();
const { generateQuiz, generateNotes } = require('../services/llmClient');

router.post('/quiz', async (req, res, next) => {
  try {
    const { text, difficulty, numQuestions } = req.body;
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: "No text provided for quiz generation." });
    }    
    const output = await generateQuiz(text, difficulty, numQuestions);
    const parsed = JSON.parse(output); 
    res.json({ quiz: parsed });
  } catch (err) {
    console.error('Quiz Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

router.post('/notes', async (req, res, next) => {
  try {
    const { text } = req.body;
    const output = await generateNotes(text);
    res.json({ notes: output });
  } catch (err) {
    console.error('Notes Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
