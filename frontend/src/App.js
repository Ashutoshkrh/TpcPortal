import logo from './logo.svg';
import './App.css';
import Register from './components/signup';
import Home from './components/home';
import Main from './Main';
import StudentPage from './pages/student_page';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import StudentLogin from './pages/student_login';
import StudentRegister from './pages/student_register';
import AlumniSearch from './pages/alumni_search';
import StudentUpdate from './pages/student_update';
import CompanyLogin from './pages/company_login';
//set up routes

function App() {
  return (
    <BrowserRouter>
        


        <Routes>
          <Route path="/" element={<Main/>} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}

          <Route path="/student" element={<StudentPage />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/register" element={<StudentRegister />} />
          <Route path="/alumnisearch" element={<AlumniSearch />} />
          <Route path="/student/update" element={<StudentUpdate />} />
          
          <Route path="/company/login" element={<CompanyLogin />} />

        </Routes>
      
    </BrowserRouter>
    
  );
}

export default App;
