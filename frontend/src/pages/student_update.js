import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    passout_year: '',
    branch: '',
    rollNo: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  // Load user details on component mount (optional, depending on your application)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/user/profile');
        setFormData({
          name: data.name,
          email: data.email,
          passout_year: data.passout_year,
          branch: data.branch,
          rollNo: data.rollNo,
          password: '',
        });
      } catch (err) {
        console.error('Error loading user', err);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    setError(''); // Clear previous error
    try {
      const response = await axios.put('/api/user/update', formData, { headers });
      alert('Profile updated successfully!');
      navigate('/student'); // Redirect to student page after update
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred.');
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    setError(''); // Clear previous error
    try {
      await axios.delete('/api/user/delete', { headers });
        localStorage.removeItem('authToken'); // Remove token from localStorage
      alert('Account deleted successfully');
      navigate('/'); // Redirect to home page after deletion
    } catch (err) {
      console.error('Error deleting account', err);
      alert('Failed to delete account.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Your Information</h2>

        <form className="space-y-4" onSubmit={handleUpdate}>
          {['name', 'email', 'passout_year', 'branch', 'rollNo'].map((field) => (
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
              placeholder="Leave blank to keep current password"
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
            onClick={ (e) => handleDelete(e)}
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
          >
            Delete Your Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStudent;
