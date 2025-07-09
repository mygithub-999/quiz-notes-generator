import React, { useState } from 'react';
import axios from '../api/index';

function FileUpload({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');
  const [loading,setLoading]=useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMsg("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const res = await axios.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onUploaded(res.data.text);
      setLoading(false)
    } catch (err) {
      setMsg("Upload failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="upload-box">
      <h2>Upload a File</h2>
      <p style={{ color: '#555', marginBottom: '20px' }}>
        Choose a PDF or PPTX file to extract text from.
      </p>

      {loading ? (
        <p>⏳ Uploading, please wait...</p>
      ):
      (
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px', alignItems: 'center',margin: '0 auto'   }}>
        <input
          type="file"
          accept=".pdf,.pptx"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
        {msg && <p style={{ color: 'red', marginTop: '10px' }}>{msg}</p>}
      </form>)}
    </div>
  );
}

export default FileUpload;
