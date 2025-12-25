import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Simplified Context without Firebase Auth dependency
interface AuthContextType {
  currentUser: any | null;
  userRole: 'ADMIN' | 'COORDINATOR' | 'STUDENT' | null;
  loading: boolean;
  logout: () => Promise<void>;
  login: (role: 'ADMIN' | 'COORDINATOR' | 'STUDENT', userData: any) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [userRole, setUserRole] = useState<'ADMIN' | 'COORDINATOR' | 'STUDENT' | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock logout
  const logout = async () => {
    setCurrentUser(null);
    setUserRole(null);
  };

  // Simple login helper (can be expanded later)
  const login = (role: 'ADMIN' | 'COORDINATOR' | 'STUDENT', userData: any) => {
      setCurrentUser(userData);
      setUserRole(role);
  };

  const value = {
    currentUser,
    userRole,
    loading,
    logout,
    login
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
