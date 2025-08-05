import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, CheckCircle, X, Loader, Mail, Lock, Users, Calendar, Star, Building, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth hook

export default function NaxritaLogin() {
  // Form states
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext

  // Starfield animation state
  const [stars, setStars] = useState([]);
  const [sparkles, setSparkles] = useState([]);

  // Generate animated background elements
  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 150; i++) {
        starArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          animationDelay: Math.random() * 3
        });
      }
      setStars(starArray);
    };

    const generateSparkles = () => {
      const sparkleArray = [];
      for (let i = 0; i < 25; i++) {
        sparkleArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          animationDelay: Math.random() * 8
        });
      }
      setSparkles(sparkleArray);
    };

    generateStars();
    generateSparkles();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    
    // Validate form
    const newErrors = {};
    if (!employeeId) newErrors.employeeId = 'Employee ID is required';
    if (!password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      console.log('Attempting backend authentication...');
      
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeId,
          password
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('Backend authentication successful');
        setIsSuccess(true);
        
        // Use the login function from AuthContext
        login(data.user, data.token);
        
        // Determine redirect based on user permissions
        setTimeout(() => {
          if (data.user.permissions && data.user.permissions.includes('all')) {
            navigate('/admin/home');
          } else {
            navigate('/employee/home');
          }
        }, 1500);
        
      } else {
        // Handle error response
        setErrors({ auth: data.message || 'Invalid credentials' });
      }
      
    } catch (error) {
      console.error('Authentication error:', error);
      
      // Fallback to dummy authentication if backend is unavailable
      console.log('Backend unavailable, attempting dummy fallback...');
      
      try {
        const dummyResult = await authenticateWithDummy(employeeId, password);
        
        if (dummyResult.success) {
          console.log('Dummy authentication successful');
          setIsSuccess(true);
          
          // Use the login function from AuthContext
          login(dummyResult.user, dummyResult.token);
          
          setTimeout(() => {
            if (dummyResult.user.permissions && dummyResult.user.permissions.includes('all')) {
              navigate('/admin/home');
            } else {
              navigate('/employee/home');
            }
          }, 1500);
          
        } else {
          setErrors({ auth: dummyResult.message });
        }
      } catch (dummyError) {
        setErrors({ auth: 'Authentication system unavailable. Please try again later.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dummy authentication function as fallback
  const authenticateWithDummy = async (employeeId, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let dummyUser = null;
        
        // Admin credentials
        if (employeeId === 'ADM001' && password === 'ADM001@2023-01-01') {
          dummyUser = {
            id: 1,
            individual_data_id: 1,
            email: 'admin@company.com',
            employeeId: 'ADM001',
            name: 'Admin User',
            role: 'admin',
            avatar: 'A',
            jobTitle: 'HR Administrator',
            department: 'Human Resources',
            joinDate: '2023-01-01',
            permissions: ['all', 'user_management', 'system_config', 'audit_logs']
          };
        } 
        // Employee credentials
        else if (employeeId === 'EMP001' && password === 'EMP001@2023-03-20') {
          dummyUser = {
            id: 2,
            individual_data_id: 2,
            email: 'employee@company.com',
            employeeId: 'EMP001',
            name: 'Employee User',
            role: 'employee',
            avatar: 'E',
            jobTitle: 'Software Developer',
            department: 'Engineering',
            joinDate: '2023-03-20',
            manager: 'John Smith',
            permissions: ['profile_view', 'attendance_view', 'payslip_view']
          };
        }
        
        if (dummyUser) {
          resolve({
            success: true,
            user: dummyUser,
            token: 'dummy_token_' + Date.now(),
            message: 'Login successful (Demo Mode)'
          });
        } else {
          resolve({
            success: false,
            message: 'Invalid employee ID or password'
          });
        }
      }, 1000);
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden flex items-center justify-center p-4 font-['Plus_Jakarta_Sans']">
      {/* Success overlay */}
      {isSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl p-8 flex flex-col items-center justify-center shadow-2xl transform animate-success-modal backdrop-blur-lg">
            <div className="w-20 h-20 rounded-full bg-[#22c55e] bg-opacity-30 flex items-center justify-center mb-4 border border-[#22c55e] shadow-glow-success">
              <CheckCircle className="text-[#22c55e] w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold text-[#ffffff] font-['Plus_Jakarta_Sans']">Success!</h3>
            <p className="text-[#a3a3a3] mt-2">Login successful</p>
            <p className="text-[#6b7280] mt-1 text-sm">Redirecting to dashboard...</p>
          </div>
        </div>
      )}
      
      <div className="relative z-10 h-[90vh] w-full max-w-6xl flex flex-col md:flex-row shadow-large rounded-3xl overflow-hidden bg-[#0a0a0a] backdrop-blur-xl border border-[#2a2a2a]">
        
        {/* Left section - naxrita Branding */}
        <div className="w-full md:w-3/5 bg-gradient-to-br from-[#000000] via-[#111111] to-[#2563eb] px-12 py-12 flex flex-col justify-center text-white relative overflow-hidden">
          <div className="absolute inset-0">
            {stars.slice(0, 50).map(star => (
              <div
                key={`left-${star.id}`}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size * 0.8}px`,
                  height: `${star.size * 0.8}px`,
                  opacity: star.opacity * 0.6,
                  animationDelay: `${star.animationDelay}s`
                }}
              />
            ))}
          </div>

          <div className="relative z-10 text-center">
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <img 
                  src="https://naxrita.com/wp-content/uploads/2024/10/logo-t.png" 
                  alt="naxrita Logo"
                  className="h-40 w-auto mb-4 transform transition-all duration-500 group-hover:scale-110 filter drop-shadow-2xl"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(37, 99, 235, 0.6))',
                    animation: 'glow-pulse 3s ease-in-out infinite alternate'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Right section - Login Form */}
        <div className="w-full md:w-2/5 p-10 flex flex-col justify-center relative bg-[#000000]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#000000] to-[#111111] opacity-95" />
          
          <div className="relative z-10">
            {/* Form Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#ffffff] via-[#2563eb] to-[#ffffff] bg-clip-text text-transparent font-['Plus_Jakarta_Sans']">
                Sign In
              </h2>
              <p className="text-[#a3a3a3] text-base font-['Plus_Jakarta_Sans']">
                Enter your credentials to continue
              </p>
            </div>
            
            {errors.auth && (
              <div className="mb-6 p-4 bg-[#ef4444] bg-opacity-20 border border-[#ef4444] rounded-lg flex items-center backdrop-blur-sm">
                <X className="text-[#ef4444] mr-3 w-5 h-5" />
                <span className="text-[#ef4444] text-sm font-['Plus_Jakarta_Sans']">{errors.auth}</span>
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-medium text-[#ffffff] mb-2 font-['Plus_Jakarta_Sans']">Employee ID</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#2563eb] z-10">
                    <Users size={20} />
                  </span>
                  <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="ADM001 or EMP001"
                    className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                      errors.employeeId ? 'border-[#ef4444]' : 'border-[#2a2a2a]'
                    } bg-[#161616] backdrop-blur-sm text-[#ffffff] placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all duration-300 font-['Plus_Jakarta_Sans']`}
                  />
                </div>
                {errors.employeeId && <p className="text-[#ef4444] text-xs mt-2 font-['Plus_Jakarta_Sans']">{errors.employeeId}</p>}
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-[#ffffff] mb-2 font-['Plus_Jakarta_Sans']">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#2563eb] z-10">
                    <Lock size={20} />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-12 pr-12 py-3 rounded-lg border ${
                      errors.password ? 'border-[#ef4444]' : 'border-[#2a2a2a]'
                    } bg-[#161616] backdrop-blur-sm text-[#ffffff] placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all duration-300 font-['Plus_Jakarta_Sans']`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#6b7280] hover:text-[#ffffff] transition-colors z-10"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-[#ef4444] text-xs mt-2 font-['Plus_Jakarta_Sans']">{errors.password}</p>}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-[#2563eb] focus:ring-[#2563eb] border-[#2a2a2a] rounded bg-[#161616]"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-[#a3a3a3] font-['Plus_Jakarta_Sans']">
                    Remember me
                  </label>
                </div>
                
                <a href="/forgot-password" className="text-sm font-medium text-[#2563eb] hover:text-[#1d4ed8] transition-colors font-['Plus_Jakarta_Sans']">
                  Forgot password?
                </a>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 text-transparent bg-gradient-to-r from-[#ff6600] to-[#0066ff] inline-block bg-clip-text font-semibold rounded-full shadow-glow focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 focus:ring-offset-[#000000] transition-all duration-300 transform hover:scale-105 hover:shadow-glow-large flex items-center justify-center border border-[#2563eb] border-opacity-30 font-['Plus_Jakarta_Sans']"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin w-5 h-5 mr-3" />
                    Authenticating...
                  </>
                ) : (
                  'Sign In to Portal'
                )}
              </button>
            </form>

            {/* Demo Credentials Info */}
            <div className="mt-6 p-4 bg-[#2563eb] bg-opacity-10 border border-[#2563eb] border-opacity-30 rounded-lg">
              <p className="text-xs text-[#a3a3a3] font-['Plus_Jakarta_Sans'] mb-2">Demo Credentials:</p>
              <p className="text-xs text-[#6b7280] font-['Plus_Jakarta_Sans']">Admin: ADM001 / ADM001@2023-01-01</p>
              <p className="text-xs text-[#6b7280] font-['Plus_Jakarta_Sans']">Employee: EMP001 / EMP001@2023-03-20</p>
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-xs text-[#6b7280] font-['Plus_Jakarta_Sans']">
                Powered by naxrita HR Solutions © 2025
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Global styles for animations */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        
        @keyframes success-modal {
          0% { transform: scale(0.7); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes glow-pulse {
          0% { filter: drop-shadow(0 0 20px rgba(37, 99, 235, 0.6)); }
          100% { filter: drop-shadow(0 0 30px rgba(37, 99, 235, 1)); }
        }
        
        .animate-success-modal {
          animation: success-modal 0.3s ease-out forwards;
        }
        
        .shadow-glow {
          box-shadow: 0 0 20px rgba(37, 99, 235, 0.3);
        }
        
        .shadow-glow-large {
          box-shadow: 0 0 30px rgba(37, 99, 235, 0.5);
        }
        
        .shadow-glow-success {
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
        }
        
        .shadow-large {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.8);
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-pulse,
          .animate-bounce {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}