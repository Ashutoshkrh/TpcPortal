import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AlumniLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const authToken = localStorage.getItem('authToken');

  // If already logged in, navigate to the alumni dashboard
  useEffect(() => {
    if (authToken) {
      navigate('/alumni');
    }
  }, [authToken, navigate]);
  
  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/alumni/login', { email, password });
      console.log('Login successful', response.data);
      
      // Store token in localStorage
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem("entity", JSON.stringify(response.data));

      // Redirect to alumni dashboard
      navigate('/alumni');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  // Handle navigation to register page
  const handleRegisterClick = () => {
    navigate('/alumni/register');
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Alumni Login</h2>
        
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`w-full bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        
        <div className="mt-4 text-center">
          <button 
            onClick={handleRegisterClick} 
            className="text-indigo-500 text-sm hover:underline"
          >
            New user? Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlumniLogin;
