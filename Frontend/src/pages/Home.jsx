import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import axios from '../api/index';

function Home({ setResult }) {
  const [step, setStep] = useState('upload');
  const [text, setText] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [numQuestions, setNumQuestions] = useState(10);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleUploaded = (extractedText) => {
    setText(extractedText);
    setStep('select');
  };

  const generateQuiz = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/generate/quiz', { text, difficulty, numQuestions });
      setResult(res.data.quiz);
      navigate('/quiz');
    } catch (err) {
      alert('Quiz generation failed: ' + err.message);
    } finally{
        setLoading(false);
    }
  };

  const generateNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.post('/generate/notes', { text });
      setResult(res.data.notes);
      navigate('/notes');
    } catch (err) {
      alert('Notes generation failed: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (

    <>
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>Smart Quiz & Notes Generator</h1>
        <p className='p-text'>
          Upload a PDF or PPTX file. Our AI will extract the content and help you:
        </p>
        <ul style={{ maxWidth: '600px', margin: 'auto' }}>
          <li className='li-text'>Generate concise, structured notes</li>
          <li className='li-text'>Create quizzes based on difficulty and number of questions</li>
        </ul>
        <p className='p-text'>No sign-up required. Just upload and go!</p>
      </header>

      {step === 'upload' && <FileUpload onUploaded={handleUploaded} />}

      {step === 'select' && (
        <div className="selection">
          <h2>Select Your Preferences</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', alignItems: 'center',margin: '0 auto'   }}>
            <label>Difficulty:</label>
            <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', alignItems: 'center',margin: '0 auto'   }}>
            <label>Number of Questions:</label>
            <select value={numQuestions} onChange={e => setNumQuestions(parseInt(e.target.value))}>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
            </select>
          </div>

           {loading ? (
                <p style={{ textAlign: 'center' }}>⏳ Generating, please wait...</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '400px', margin: '0 auto', alignItems: 'center' }}>
                    <button onClick={generateQuiz} style={{ width: '100%' }}>Generate Quiz</button>
                    <button onClick={generateNotes} style={{ width: '100%' }}>Generate Notes</button>
                </div>
            )}

        </div>
      )}
    </div>
    </>
  );
}

export default Home;
