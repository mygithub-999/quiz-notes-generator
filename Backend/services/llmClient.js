const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1'
});

async function generateQuiz(text, difficulty='easy',numQuestions = 10) {
const prompt = `You are a quiz generator.

Given the following text, generate EXACTLY ${numQuestions} multiple-choice questions of ${difficulty} LEVEL formatted as a JSON object like this:

{
  "questions": [
    {
      "question": "Your question text?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Option A"
    },
    ...
  ]
}

IMPORTANT: Do not include any explanation, heading, or introductory text. Only return a valid JSON object.

Text:
${text}`;

  const response = await openai.chat.completions.create({
    model: 'llama3-70b-8192',
    messages: [
      { role: 'system', content: 'You are a helpful assistant that generates multiple-choice questions in JSON format.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.7
  });

  return response.choices[0].message.content;
}

async function generateNotes(text) {
const prompt = `
You are an intelligent assistant that summarizes educational or informational content.

Text:
"""
${text}
"""

Instructions:
- Summarize the above content into clear, concise BULLET points.
- Use simple, readable language.
- Organize the notes logically based on topics or ideas.
- Highlight definitions, key terms, or examples when possible.
- Format the notes using Markdown (bullet points, sub-bullets, bold/italic if needed).
- Don't mention that this is a summary or refer to the original document.

IMPORTANT: I don't care about the length, don't miss out the key points

Output only the notes in Markdown format.
`;
  const response = await openai.chat.completions.create({
    model: 'llama3-70b-8192',
    messages: [
      { role: 'system', content: 'You are a note-making assistant who formats content using HTML headings and bullet lists.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.7
  });

  return response.choices[0].message.content;
}

module.exports = { generateQuiz, generateNotes };
