import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state to handle button state

  const navigate = useNavigate(); // Initialize useNavigate to redirect users

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const loginData = { email, password };

    try {
      const response = await axios.post('https://13e2-199-115-241-193.ngrok-free.app/auth/login', loginData);
      console.log('Login successful:', response.data.access_token);

      // Store the token in localStorage or sessionStorage
      localStorage.setItem('token', response.data.access_token);

      setMessage('Login successful!');
      
      // Redirect the user to the Home page
      navigate('/home');

    } catch (error) {
      console.error('Error logging in:', error);
      setMessage(error.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Log In</h2>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Email</label>
        <input
          type="email"
          className="w-full p-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-400 mb-2">Password</label>
        <input
          type="password"
          className="w-full p-2 rounded-md bg-gray-700 text-white focus:ring-2 focus:ring-green-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded-md mt-4"
        disabled={loading} // Disable the button when loading
      >
        {loading ? 'Logging in...' : 'Log In'} {/* Change button text when loading */}
      </button>

      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </form>
  );
};

export default LoginForm;
