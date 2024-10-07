import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CompaniesList = () => {
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
      try {
        const response = await axios.get('api/company/fetch', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        setCompanies(response.data.companies);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching companies');
      }
    };

    fetchCompanies();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Companies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {companies.map((company) => (
          <div
            key={company.__v}
            className="bg-white shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105"
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{company.name}</h3>
            <p className="text-gray-600 mb-4">{company.description}</p>
            <a
              href={`mailto:${company.email}`}
              className="text-blue-500 hover:underline"
            >
              {company.email}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompaniesList;
