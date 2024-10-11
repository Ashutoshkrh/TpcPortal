import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/company_navbar';
import { useNavigate } from 'react-router-dom';

const CompanyPage = () => {
  const [companyDetails, setCompanyDetails] = useState({});
  const authToken = localStorage.getItem('authToken');
  const navigate = useNavigate();

  // Fetch company details
  useEffect(() => {
    if (!authToken) {
      navigate('/');
    } else {
      const fetchDetails = async () => {
        try {
          const response = await axios.get('/api/company/me', {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          setCompanyDetails(response.data);
        } catch (error) {
          console.error('Failed to fetch company details', error);
        }
      };

      fetchDetails();
    }
  }, [authToken, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto mt-12 p-6 max-w-5xl">
        {/* Welcome Message */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to IIT Patna, {companyDetails.name || 'Company'}!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your continuous support in connecting with our institution.
          </p>
        </div>

        {/* Company Details */}
        <div className="bg-white shadow-xl rounded-lg p-8 transition transform hover:shadow-2xl hover:scale-105">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-600">
            Your Company Information
          </h2>
          {companyDetails ? (
            <div className="space-y-4 text-gray-700 text-lg">
              <p>
                <strong className="text-gray-800">Company Name:</strong> {companyDetails.name}
              </p>
              <p>
                <strong className="text-gray-800">Email:</strong> {companyDetails.email}
              </p>
              <p>
                <strong className="text-gray-800">Description:</strong> {companyDetails.description}
              </p>
            </div>
          ) : (
            <p className="text-gray-500">Loading company details...</p>
          )}
        </div>

        {/* Call-to-action buttons */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/company/update')}
            className="bg-indigo-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-indigo-700 transition ease-in-out duration-150"
          >
            Edit Your Information
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center text-gray-600 text-sm">
          <p>&copy; 2024 IIT Patna. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default CompanyPage;
