import React from 'react';
import ReactMarkdown from 'react-markdown';

const Notes = ({ content }) => {
  return (
    <div>
      <h2 style={{textAlign:'center'}}>Generated Notes</h2>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default Notes;
