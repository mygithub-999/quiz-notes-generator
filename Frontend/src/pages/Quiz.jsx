import React, { useState } from 'react';
import '../styles/main.css';

const Quiz = ({ data }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  let quizData;
  try {
    quizData = typeof data === "string" ? JSON.parse(data) : data;
  } catch (e) {
    return <p className="error">Error parsing quiz data.</p>;
  }

  const handleOptionChange = (qIndex, optionIndex) => {
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  if (!quizData?.questions || !Array.isArray(quizData.questions)) {
    return <p className="error">No quiz data available.</p>;
  }

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">Quiz</h2>
      {quizData.questions.map((q, i) => (
        <div key={i} className="quiz-question">
          <p><strong>Q{i + 1}:</strong> {q.question}</p>
          {q.options.map((option, j) => (
            <label key={j} className="quiz-option">
              <input
                type="radio"
                name={`q-${i}`}
                value={j}
                checked={selectedAnswers[i] === j}
                onChange={() => handleOptionChange(i, j)}
              />
              {option}
            </label>
          ))}
          {showResults && (
            <p className="quiz-result">
              {q.options[selectedAnswers[i]] === q.answer ? (
                <span className="correct">✅ Correct</span>
              ) : (
                <span className="incorrect">
                  ❌ Incorrect (Correct: {q.answer})
                </span>
              )}
            </p>
          )}
        </div>
      ))}

      {!showResults && (
        <button className="quiz-submit" onClick={handleSubmit}>
          Check Answers
        </button>
      )}
    </div>
  );
};

export default Quiz;
