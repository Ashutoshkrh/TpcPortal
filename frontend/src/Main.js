import logo from './logo.svg';
import './App.css';
// import Login from './components/login';
import Register from './components/signup';
import Home from './components/home';
import Sidebar from './components/sidebar';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';

//set up routes

function Main() {
  return (        

        <div className="flex ">
        <Sidebar />
        <div className="ml-64 flex-1 h-screen overflow-y-auto bg-gray-100">
        <Routes>
          <Route path="/" element={<Home/>} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}
          
        </Routes>
        </div>
      </div>
      
    
  );
}

export default Main;
