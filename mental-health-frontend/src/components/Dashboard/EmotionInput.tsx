import React, { useState } from 'react';
import api from '../../services/api';

const EmotionInput: React.FC = () => {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState<string | null>(null);
  const [video, setVideo] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        setVideo(base64);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleVoiceUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ['audio/mpeg', 'audio/wav'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        setMessage('Invalid voice file type. Only MP3 and WAV are allowed.');
        return;
      }

      if (file.size > maxSize) {
        setMessage('Voice file is too large. Maximum size is 5MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const base64 = (reader.result as string).split(',')[1];
        setVoice(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    const payload = ""
    const response = await api.post('/some-endpoint', payload);
    try {
      // ...submission logic
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Submission failed');
    } finally {
      setUploading(false);
    }
  };


  return (
    <div>
      <h3>Submit Emotion Data</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write about your day..."
          required
        />
        <input type="file" accept="audio/*" onChange={handleVoiceUpload} />
        <input type="file" accept="video/*" onChange={handleVideoUpload} />
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EmotionInput;
