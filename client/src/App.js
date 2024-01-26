import './App.css';
import AdminDashboard from './components/AdminDashboard';
import InstructorDashboard from './components/InstructorDashboard';
import Login from './components/Login';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import StudentDashboard from './components/StudentDashboard';
import ViewPapers from './components/ViewPapers';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './Context/AuthProvider';

function App() {
  return (
    <>
        <BrowserRouter>
      <AuthProvider>

          <Navbar />
          <Routes>
            <Route exact path="/" element={<ViewPapers />} />
            <Route exact path="/login" element={<Login />} />

            <Route path="/user/*" element={<PrivateRoute />} >
              <Route path="student-dashboard" element={<StudentDashboard />} role="student" />
              <Route path="admin-dashboard" element={<AdminDashboard />} role="admin"/>
              <Route path="instructor-dashboard" element={<InstructorDashboard />} role="instructor"/>
            </Route>

          </Routes>

      </AuthProvider>
        </BrowserRouter>

    </>
  );
}

export default App;
