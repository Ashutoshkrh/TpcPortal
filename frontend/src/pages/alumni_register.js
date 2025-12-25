import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AlumniRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    email: '',
    password: '',
    passout_year: '',
    branch: '',
    company: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { name, rollNo, email, password, passout_year, branch, company } = formData;

    // Frontend validation to check if all required fields are filled
    if (!name || !rollNo || !email || !password || !passout_year || !branch) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      // Send form data to the backend
      const response = await axios.post('/api/alumni/register', {
        name,
        rollNo,
        email,
        password,
        passout_year,
        branch,
        company
      });

      console.log('Registration successful', response.data);

      // Store the auth token in local storage
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem("entity", JSON.stringify(response.data));

      // Navigate to alumni dashboard upon successful registration
      navigate('/alumni');
    } catch (error) {
      // Handle errors (e.g., duplicate email, roll number, or validation issues)
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Alumni Registration</h2>

        {/* Display error message */}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Roll Number</label>
            <input
              type="text"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your roll number"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Passout Year</label>
            <input
              type="text"
              name="passout_year"
              value={formData.passout_year}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your passout year"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Branch</label>
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your branch"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Company (Optional)</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your current company"
            />
          </div>

          <div>
            <button
              type="submit"
              className={`w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AlumniRegister;
