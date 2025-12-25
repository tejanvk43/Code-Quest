import React from 'react';
import { BrowserRouter, Routes, Route,  } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import EventPage from './pages/Event/EventPage';
import EventDetail from './pages/Event/EventDetail';
import AboutEvent from './pages/Event/AboutEvent';
import Timings from './pages/Event/Timings';
import RoundDetails from './pages/Event/RoundDetails';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import CoordinatorDashboard from './pages/Dashboard/CoordinatorDashboard';
import StudentDashboard from './pages/Dashboard/StudentDashboard';
import { AuthProvider } from './contexts/AuthContext';

import Registration from './pages/Registration';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/register" element={<Registration />} /> External Link Used */}
            <Route path="/events" element={<EventPage />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/about" element={<AboutEvent />} />
            <Route path="/timings" element={<Timings />} />
            <Route path="/rounds" element={<RoundDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            
            {/* Protected Routes (Simulated) */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/coordinator" element={<CoordinatorDashboard />} />
            <Route path="/student" element={<StudentDashboard />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
