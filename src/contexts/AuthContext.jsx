import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../components/ConfirmationModal';

const AuthContext = createContext();

// Timeout constants
const INACTIVITY_TIMEOUT = 1 * 60 * 1000; // 20 minutes
const SESSION_EXPIRATION = 2 * 60 * 1000; // 12 hours

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const logoutTimerRef = useRef(null);
  const sessionTimerRef = useRef(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isInactiveLogout, setIsInactiveLogout] = useState(false);
  const navigate = useNavigate();

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (logoutTimerRef.current) {
      clearTimeout(logoutTimerRef.current);
    }
    
    logoutTimerRef.current = setTimeout(() => {
      setIsInactiveLogout(true);
      setShowLogoutModal(true);
    }, INACTIVITY_TIMEOUT);
  }, []);

  // Set session expiration timer
  const setSessionExpirationTimer = useCallback((loginTime) => {
    if (sessionTimerRef.current) {
      clearTimeout(sessionTimerRef.current);
    }

    const timeRemaining = SESSION_EXPIRATION - (Date.now() - loginTime);
    if (timeRemaining <= 0) {
      performLogout();
      return;
    }

    sessionTimerRef.current = setTimeout(() => {
      performLogout();
    }, timeRemaining);
  }, []);

  // Perform actual logout
  const performLogout = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch(`${process.env.REACT_APP_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    }
    
    // Clear all state and storage
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('authType');
    localStorage.removeItem('loginTime');
    
    // Clear all timers
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);
    
    navigate('/login');
  }, [navigate]);

  const handleLogoutConfirm = useCallback(() => {
    setShowLogoutModal(false);
    performLogout();
  }, [performLogout]);

  const handleLogoutCancel = useCallback(() => {
    setShowLogoutModal(false);
    if (isInactiveLogout) {
      resetInactivityTimer();
      setIsInactiveLogout(false);
    }
  }, [isInactiveLogout, resetInactivityTimer]);

  const logout = useCallback(async () => {
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);
    setIsInactiveLogout(false);
    setShowLogoutModal(true);
  }, []);

  useEffect(() => {
    // Check for stored user and token
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    const loginTime = localStorage.getItem('loginTime');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      
      // Check if session is expired
      if (loginTime && (Date.now() - parseInt(loginTime)) > SESSION_EXPIRATION) {
        performLogout();
        return;
      }
      
      // Start timers
      resetInactivityTimer();
      if (loginTime) {
        setSessionExpirationTimer(parseInt(loginTime));
      }
    }
    setLoading(false);

    // Set up activity event listeners
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    const handleActivity = () => {
      if (storedUser && storedToken) {
        resetInactivityTimer();
      }
    };

    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
      
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
      if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);
    };
  }, [performLogout, resetInactivityTimer, setSessionExpirationTimer]);

  const login = useCallback((userData, token) => {
    const loginTime = Date.now();
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    localStorage.setItem('loginTime', loginTime.toString());
    
    // Start both timers
    resetInactivityTimer();
    setSessionExpirationTimer(loginTime);
  }, [resetInactivityTimer, setSessionExpirationTimer]);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && (
        <>
          {children}
          <ConfirmationModal
            isOpen={showLogoutModal}
            message={isInactiveLogout 
              ? 'You have been inactive for 20 minutes. For security reasons, you will be logged out.' 
              : 'Are you sure you want to sign out?'}
            onConfirm={handleLogoutConfirm}
            onCancel={handleLogoutCancel}
          />
        </>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};