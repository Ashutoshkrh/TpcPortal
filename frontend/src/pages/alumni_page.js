import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/alumni_navbar.js'; // Assuming you have a specific navbar for alumni
import { useNavigate } from 'react-router-dom';

const AlumniPage = () => {
  const [alumniDetails, setAlumniDetails] = useState({});
  const authToken = localStorage.getItem('authToken');
  const navigate = useNavigate();

  // Fetch alumni details
  useEffect(() => {
    if (!authToken) {
      navigate('/');
    } else {
      const fetchDetails = async () => {
        try {
          const response = await axios.get('/api/alumni/me', {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          setAlumniDetails(response.data);
        } catch (error) {
          console.error('Failed to fetch alumni details', error);
        }
      };
      fetchDetails();
    }
  }, [authToken, navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto py-12">
        {/* Welcome Message */}
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-6">
          Welcome to the IIT Patna Alumni Portal
        </h1>

        {/* Alumni Details Card */}
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <div className="px-6 py-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
              Your Alumni Details
            </h2>
            {alumniDetails ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <span className="text-lg font-medium text-indigo-600">Name:</span>
                  <span className="ml-2 text-gray-700">{alumniDetails.name}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-medium text-indigo-600">Roll No:</span>
                  <span className="ml-2 text-gray-700">{alumniDetails.rollNo}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-medium text-indigo-600">Email:</span>
                  <span className="ml-2 text-gray-700">{alumniDetails.email}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-medium text-indigo-600">Passout Year:</span>
                  <span className="ml-2 text-gray-700">{alumniDetails.passout_year}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-medium text-indigo-600">Branch:</span>
                  <span className="ml-2 text-gray-700">{alumniDetails.branch}</span>
                </div>
                {alumniDetails.company && (
                  <div className="flex items-center">
                    <span className="text-lg font-medium text-indigo-600">Company:</span>
                    <span className="ml-2 text-gray-700">{alumniDetails.company}</span>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-center text-gray-500">Loading alumni details...</p>
            )}
          </div>
        </div>

        {/* Update Details Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/alumni/update')}
            className="px-6 py-3 bg-indigo-700 text-white rounded-lg shadow-md hover:bg-indigo-800 transition-all duration-300"
          >
            Update Your Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlumniPage;
