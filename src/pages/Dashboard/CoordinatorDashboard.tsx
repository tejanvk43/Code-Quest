import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const CoordinatorDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-yellow-500">Coordinator Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded font-bold hover:bg-red-700">Logout</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h2 className="text-xl font-bold mb-4">Assigned Rounds</h2>
          <p className="text-gray-400">No rounds assigned yet.</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h2 className="text-xl font-bold mb-4">Student Marks</h2>
          <button className="text-cyan-400 hover:underline">Enter Marks</button>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorDashboard;
