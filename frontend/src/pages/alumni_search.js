import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AlumniSearch = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    passout_year: '',
    company: ''
  });

  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const token = localStorage.getItem('authToken');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
    try {
      const response = await axios.post('/api/alumni/search', formData, { headers });
      setResults(response.data);
    } catch (err) {
      setError('Error fetching results. Please try again.');
    }
  };

  // ⭐ Create or fetch chat room and redirect to /chat
  const handleChatClick = async (alumniId) => {
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    try {
      console.log(alumniId);
      const res = await axios.post(
        '/api/chat/create',
        { receiverId: alumniId,
          receiverType: 'alumni'
         },
        { headers }
      );

      const { roomId } = res.data;

      // Redirect to chat page with room
      navigate(`/chat?roomId=${roomId}`);

    } catch (err) {
      console.error('Error opening chat room', err);
      alert('Unable to open chat. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 p-6">

      {/* Sidebar Form */}
      <div className="w-1/4 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Search Alumni</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search by name"
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
              placeholder="Search by branch"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Passout Year</label>
            <input
              type="number"
              name="passout_year"
              value={formData.passout_year}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search by passout year"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search by company"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </form>

        {error && (
          <div className="text-red-500 mt-4">
            {error}
          </div>
        )}
      </div>

      {/* Results Section */}
      <div className="w-3/4 p-6">
        {results.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-4">Search Results</h3>

            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-4">Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Roll No</th>
                  <th className="p-4">Branch</th>
                  <th className="p-4">Passout Year</th>
                  <th className="p-4">Company</th>
                  <th className="p-4">Chat</th>
                </tr>
              </thead>

              <tbody>
                {results.map((alumni, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                  >
                    <td className="p-4">{alumni.name}</td>
                    <td className="p-4">{alumni.email}</td>
                    <td className="p-4">{alumni.rollNo}</td>
                    <td className="p-4">{alumni.branch}</td>
                    <td className="p-4">{alumni.passout_year}</td>
                    <td className="p-4">{alumni.company}</td>

                    {/* ⭐ Chat Button */}
                    <td className="p-4">
                      <button
                        onClick={() => handleChatClick(alumni._id)}
                        className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                      >
                        💬 Chat
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default AlumniSearch;
