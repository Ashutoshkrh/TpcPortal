import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CompanyUpdate = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  // Load company details on component mount
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const { data } = await axios.get('/api/company/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFormData({
          name: data.name,
          email: data.email,
          description: data.description,
          password: '', // Leave password blank initially
        });
      } catch (err) {
        console.error('Error loading company', err);
      }
    };
    fetchCompany();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.put('/api/company/update', formData, { headers });
      alert('Company profile updated successfully!');
      navigate('/company'); // Redirect to company dashboard after update
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      await axios.delete('/api/company/delete', { headers });
      localStorage.removeItem('authToken'); // Remove token from localStorage
      alert('Company account deleted successfully');
      navigate('/'); // Redirect to home page after deletion
    } catch (err) {
      console.error('Error deleting account', err);
      alert('Failed to delete account.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Company Information</h2>

        <form className="space-y-4" onSubmit={handleUpdate}>
          {['name', 'email', 'description'].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
          >
            Update
          </button>
        </form>

        <div className="mt-6">
          <button
            onClick={handleDelete}
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
          >
            Delete Your Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompanyUpdate;
