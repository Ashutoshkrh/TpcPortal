import React from 'react';
import { Link } from 'react-router-dom';
import { HiHome, HiUserGroup, HiOfficeBuilding, HiUsers, HiBriefcase, HiMail } from 'react-icons/hi'; // Corrected import for Company icon

const Sidebar = () => {
  return (
    <div className="bg-blue-900 text-white w-64 h-screen fixed top-0 left-0 p-6 flex flex-col">
      <div className="text-2xl font-bold mb-10 text-center">IIT Patna TPC</div>
      <nav className="flex-grow">
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className="flex items-center p-3 rounded-md transition-colors duration-200 hover:bg-red-700"
            >
              <HiHome className="mr-3 text-xl" />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/student/login"
              className="flex items-center p-3 rounded-md transition-colors duration-200 hover:bg-red-700"
            >
              <HiUserGroup className="mr-3 text-xl" />
              Student
            </Link>
          </li>
          <li>
            <Link
              to="/company"
              className="flex items-center p-3 rounded-md transition-colors duration-200 hover:bg-red-700"
            >
              <HiOfficeBuilding className="mr-3 text-xl" /> {/* Updated icon */}
              Company
            </Link>
          </li>
          <li>
            <Link
              to="/alumni"
              className="flex items-center p-3 rounded-md transition-colors duration-200 hover:bg-red-700"
            >
              <HiUsers className="mr-3 text-xl" />
              Alumni
            </Link>
          </li>
          <li>
            <Link
              to="/packages"
              className="flex items-center p-3 rounded-md transition-colors duration-200 hover:bg-red-700"
            >
              <HiBriefcase className="mr-3 text-xl" />
              Packages
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="flex items-center p-3 rounded-md transition-colors duration-200 hover:bg-red-700"
            >
              <HiMail className="mr-3 text-xl" />
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
