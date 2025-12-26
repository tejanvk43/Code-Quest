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
import CoordLogin from './pages/CoordLogin';
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import CoordinatorDashboard from './pages/Dashboard/CoordinatorDashboard';
import StudentDashboard from './pages/Dashboard/StudentDashboard';
import { AuthProvider } from './contexts/AuthContext';

import Registration from './pages/Registration';

import ProtectedRoute from './components/ProtectedRoute';

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
            <Route path="/coordlogin" element={<CoordLogin />} />
            
            {/* Protected Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={['ADMIN']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/coordinator" 
              element={
                <ProtectedRoute allowedRoles={['COORDINATOR']}>
                  <CoordinatorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student" 
              element={
                <ProtectedRoute allowedRoles={['STUDENT']}>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
