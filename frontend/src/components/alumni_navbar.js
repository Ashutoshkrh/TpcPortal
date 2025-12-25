import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignout = (e) => {
    e.preventDefault();
    localStorage.removeItem('authToken');
    localStorage.removeItem('entity');
    navigate('/');
  };

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold">Alumni Portal</h1>

        <div className="space-x-4">

          <button
            className="hover:bg-blue-700 p-2 rounded"
            onClick={(e) => {
              e.preventDefault();
              navigate('/alumnisearch');
            }}
          >
            Search Alumni
          </button>

          <button
            className="hover:bg-blue-700 p-2 rounded"
            onClick={(e) => {
              e.preventDefault();
              navigate('/alumni/update');
            }}
          >
            Update Your Info
          </button>

          {/* 🔹 NEW CHAT BUTTON */}
          <button
            className="hover:bg-blue-700 p-2 rounded"
            onClick={(e) => {
              e.preventDefault();
              navigate('/chat');
            }}
          >
            Chats
          </button>

          <button
            className="hover:bg-red-700 p-2 rounded bg-red-500"
            onClick={handleSignout}
          >
            Signout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
