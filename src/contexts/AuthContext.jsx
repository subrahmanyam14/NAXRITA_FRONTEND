// src/contexts/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 🔁 Use the SAME key: 'user'
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    // 🔁 Save with key 'user', not 'hr_user'
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // In your AuthContext
const logout = () => {
  const confirmLogout = window.confirm('Are you sure you want to sign out?');
  
  if (confirmLogout) {
    // Clear user state
    setUser(null);
    
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    
    // Redirect to login
    navigate('/login');
    // window.location.href = '/login';
  }
};


  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};