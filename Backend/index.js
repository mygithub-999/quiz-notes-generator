require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const uploadRoutes = require('./routes/upload');
const generateRoutes = require('./routes/generate');

const app = express();
const PORT = process.env.PORT ||3001;

app.use(cors({
  origin: 'https://6886222e702b5044b1421ff8--helpful-taffy-03925b.netlify.app/',
  methods: ['GET', 'POST'],
}));
app.use(bodyParser.json());

// Routes
app.use('/upload', uploadRoutes);
app.use('/generate', generateRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
