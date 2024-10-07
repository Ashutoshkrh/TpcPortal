import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const handleSignout = (e) => {
    e.preventDefault();
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">Student Portal</h1>
        <div className="space-x-4">
          <button className="hover:bg-blue-700 p-2 rounded" onClick = {(e)=>{
            e.preventDefault();
            navigate('/alumnisearch');
          }}>Search Alumni</button>
          <button className="hover:bg-blue-700 p-2 rounded " onClick={(e)=>{
            e.preventDefault();
            navigate('/student/update');
          }}>Update Your Info</button>
          <button className="hover:bg-red-700 p-2 rounded bg-red-500" onClick={(e)=>handleSignout(e)}>
            Signout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
