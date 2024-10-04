import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Notification from '../Notification/Notification';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState(''); // Add email state
  const [password, setPassword] = useState(''); // Add password state
  const [token, setToken] = useState(''); // Add token state if needed
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const navigate = useNavigate(); // Use useHistory for navigation

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/signin', { email, password });
      const token = response.data.data.AuthenticationResult.IdToken;
      localStorage.setItem('token', token);
      setToken(token);
      setNotification({ message: 'Signed in successfully', type: 'success' });
      navigate('/dashboard');
    } catch (error: any) {
      setNotification({ message: error.response?.data?.error || 'Sign in failed', type: 'error' });
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      {notification && <Notification message={notification.message} type={notification.type} />}
    </div>
  );
};

export default SignIn;
