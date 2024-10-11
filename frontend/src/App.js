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
import CompanyRegister from './pages/company_register';
import AlumniRegister from './pages/alumni_register';
import AlumniLogin from './pages/alumni_login';
import CompanyPage from './pages/comapany_page';
import AlumniPage from './pages/alumni_page';
import CompanyUpdate from './pages/company_update';
import AlumniUpdate from './pages/alumni_update';
import ContactPage from './pages/contacts_page';
//set up routes

function App() {
  return (
    <BrowserRouter>
        


        <Routes>
          <Route path="/" element={<Main/>} />
          {/* <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> */}

          <Route path="/contact" element={<ContactPage />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/alumni" element={<AlumniPage />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/register" element={<StudentRegister />} />
          <Route path="/alumnisearch" element={<AlumniSearch />} />
          <Route path="/student/update" element={<StudentUpdate />} />
          <Route path="/company/update" element={<CompanyUpdate />} />
          <Route path="/alumni/update" element={<AlumniUpdate />} />
          
          <Route path="/company/login" element={<CompanyLogin />} />
          <Route path="/company/register" element={<CompanyRegister />} />
          <Route path="/alumni/register" element={<AlumniRegister />} />
          <Route path="/alumni/login" element={<AlumniLogin />} />

        </Routes>
      
    </BrowserRouter>
    
  );
}

export default App;
