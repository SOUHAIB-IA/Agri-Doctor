// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import authService, { User } from '../services/auth.service';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAuthenticated: false,
  loading: true,
  logout: () => {},
  checkAuthStatus: async () => false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    // Subscribe to the auth service's currentUser observable
    const subscription = authService.currentUser.subscribe(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Check auth status on mount
    checkAuthStatus();

    // Cleanup subscription
    return () => subscription.unsubscribe();
  }, []);

  const checkAuthStatus = async (): Promise<boolean> => {
    return authService.verifyAuth();
  };
  
  const logout = () => {
    authService.logout();
    history.push('/login');
  };
  
  const value = {
    currentUser,
    isAuthenticated: authService.isAuthenticated(),
    loading,
    logout,
    checkAuthStatus
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};