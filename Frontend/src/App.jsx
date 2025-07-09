import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from './pages/Quiz';
import Notes from './pages/Notes';
import Home from './pages/Home';
import './styles/main.css';

function App() {
  const [result, setResult] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home setResult={setResult} />} />
        <Route path="/quiz" element={<Quiz data={result} />} />
        <Route path="/notes" element={<Notes content={result} />} />
      </Routes>
    </Router>
  );
}

export default App;
