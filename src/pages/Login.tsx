import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfessionalNavbar from '../components/ProfessionalNavbar';
import { db } from '../firebase';
// import { supabase } from '../supabaseClient';
import { collection, query, where, getDocs, updateDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login helper

  // First Login State
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [userDataState, setUserDataState] = useState<any>(null); // Temp store

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Hardcoded Admin
    if (rollNumber === 'ADMIN' && password === 'ADMIN123') {
      login('ADMIN', { name: 'Administrator', role: 'ADMIN' });
      navigate('/admin');
      setLoading(false);
      return;
    }

    try {
      // 1. Check Firebase First (Primary)
      const q = query(collection(db, 'registrations'), where('rollNumber', '==', rollNumber));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert('No registered account found. If you just paid, please ensure payment is completed.');
        setLoading(false);
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = { id: userDoc.id, ...userDoc.data() } as any;

      // -------------------------------------------------------------
      // Payment Status Sync REMOVED (Firebase Only)
      // -------------------------------------------------------------
      // -------------------------------------------------------------

      if (userData.status !== 'verified') {
        alert('Your registration is pending approval / payment verification.');
        setLoading(false);
        return;
      }

      if (userData.password === password) {
        if (userData.isFirstLoginResult) { // Check property
            // Force Password Change
            setUserId(userDoc.id);
            setUserDataState(userData);
            setShowChangePassword(true);
            setLoading(false);
        } else if (userData.isFirstLogin === true) {
             // Handle boolean true
            setUserId(userDoc.id);
            setUserDataState(userData);
            setShowChangePassword(true);
            setLoading(false);
        } else {
            // Normal Login
            login('STUDENT', userData);
            navigate('/student'); 
        }
      } else {
// ...
        alert('Invalid Password. Please check your credentials from the approval email.');
        setLoading(false);
      }

    } catch (error) {
      console.error("Login Error:", error);
      alert('Login failed due to technical error.');
      setLoading(false);
    }
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (newPassword !== confirmPassword) {
          alert("Passwords do not match!");
          return;
      }
      if (newPassword.length < 6) {
          alert("Password must be at least 6 characters.");
          return;
      }
      if (!userId) return;

      try {
          await updateDoc(doc(db, 'registrations', userId), {
              password: newPassword,
              isFirstLogin: false
          });
          alert("Password changed successfully! Logging you in...");
          
          // Login with updated data
          if (userDataState) {
              login('STUDENT', { ...userDataState, password: newPassword, isFirstLogin: false });
          }
          
          setShowChangePassword(false);
          navigate('/student');
      } catch (error) {
          console.error("Password Update Error:", error);
          alert("Failed to update password.");
      }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <ProfessionalNavbar />
      
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-slate-200 shadow-xl relative">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-blue-900 mb-2">Candidate Login</h1>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Student Access</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Roll Number</label>
              <input 
                type="text" 
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-medium"
                placeholder="21UR1A05..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-medium"
                placeholder="••••••••"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-blue-900/20 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
             <p className="text-slate-500 text-sm font-medium">Don't have an account?</p>
             <a 
                href="https://app-8gixcp0ztqtd.appmedo.com/register"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-blue-600 font-bold hover:text-blue-800 transition-colors text-sm cursor-pointer uppercase tracking-wide inline-block"
             >
                Register Here
             </a>
          </div>

          {/* Change Password Modal Overlay */}
          {showChangePassword && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 rounded-2xl animate-in fade-in zoom-in duration-200">
                  <h2 className="text-2xl font-black text-slate-900 mb-4">Set New Password</h2>
                  <p className="text-slate-500 text-sm mb-6 text-center">For security, please change your temporary password.</p>
                  
                  <form onSubmit={handleChangePasswordSubmit} className="w-full space-y-4">
                      <input 
                        type="password" 
                        placeholder="New Password" 
                        className="w-full px-4 py-3 border rounded-lg"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                      <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        className="w-full px-4 py-3 border rounded-lg"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                      <button type="submit" className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 shadow-lg">
                          Update & Login
                      </button>
                  </form>
              </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Login;
