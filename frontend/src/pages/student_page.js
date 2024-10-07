import React, { useEffect } from 'react';
import Navbar from '../components/student_navbar';
import CompaniesList from '../components/companies_list';
import { useNavigate } from 'react-router-dom';
const StudentPage = () => {
    const authToken = localStorage.getItem('authToken');
    const navigate = useNavigate();
    useEffect(() => {
        console.log(authToken);
        if (!authToken) {
            navigate('/');
        }
    }, []);
  return (
      <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <CompaniesList />
      </div>
    </div>
  );
};

export default StudentPage;
