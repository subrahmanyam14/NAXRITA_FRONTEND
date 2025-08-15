import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, CheckCircle, X, Loader, Lock, Shield, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminLogin() {
  // Form states
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();
  const { loginAsAdmin } = useAuth(); // Use the new admin-specific login function

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

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    
    // Validate form
    const newErrors = {};
    if (!adminId) newErrors.adminId = 'Admin ID is required';
    if (!password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      console.log('Attempting admin authentication...');
      
      const response = await fetch(`${process.env.REACT_APP_URL}/api/auth/admin-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adminId,
          password
        })
      });

      const data = await response.json();
      
      if (response.ok && data.user.role === 'Admin') {
        console.log('Admin authentication successful');
        setIsSuccess(true);
        
        // Use the admin-specific login function
        loginAsAdmin(data.user, data.token);
        
        setTimeout(() => {
          navigate('/admin/home');
        }, 1500);
        
      } else {
        setErrors({ auth: data.message || 'Invalid admin credentials' });
      }
      
    } catch (error) {
      console.error('Admin authentication error:', error);
      
      // Fallback to dummy admin authentication if backend is unavailable
      console.log('Backend unavailable, attempting admin dummy fallback...');
      
      try {
        const dummyResult = await authenticateAdminWithDummy(adminId, password);
        
        if (dummyResult.success) {
          console.log('Dummy admin authentication successful');
          setIsSuccess(true);
          
          // Use the admin-specific login function
          loginAsAdmin(dummyResult.user, dummyResult.token);
          
          setTimeout(() => {
            navigate('/admin/home');
          }, 1500);
          
        } else {
          setErrors({ auth: dummyResult.message });
        }
      } catch (dummyError) {
        setErrors({ auth: 'Admin authentication system unavailable. Please try again later.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dummy admin authentication function as fallback
  const authenticateAdminWithDummy = async (adminId, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let dummyUser = null;
        
        // Admin credentials - only admin can login through this route
        if (adminId === 'ADM001' && password === 'ADM001@2023-01-01') {
          dummyUser = {
            id: 1,
            individual_data_id: 1,
            email: 'admin@company.com',
            employeeId: 'ADM001',
            name: 'Admin User',
            role: 'Admin',
            avatar: 'A',
            jobTitle: 'HR Administrator',
            department: 'Human Resources',
            joinDate: '2023-01-01',
            permissions: ['all', 'user_management', 'system_config', 'audit_logs'],
            loginType: 'admin' // Mark as admin login
          };
        }
        
        if (dummyUser) {
          resolve({
            success: true,
            user: dummyUser,
            token: 'admin_token_' + Date.now(),
            message: 'Admin Login successful (Demo Mode)'
          });
        } else {
          resolve({
            success: false,
            message: 'Invalid admin credentials'
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
            <h3 className="text-2xl font-bold text-[#ffffff] font-['Plus_Jakarta_Sans']">Admin Access Granted!</h3>
            <p className="text-[#a3a3a3] mt-2">Login successful</p>
            <p className="text-[#6b7280] mt-1 text-sm">Redirecting to admin dashboard...</p>
          </div>
        </div>
      )}
      
      <div className="relative z-10 h-[90vh] w-full max-w-6xl flex flex-col md:flex-row shadow-large rounded-3xl overflow-hidden bg-[#0a0a0a] backdrop-blur-xl border border-[#2a2a2a]">
        
        {/* Left section - Admin Branding */}
        <div className="w-full md:w-3/5 bg-gradient-to-br from-[#000000] via-[#1a1a1a] to-[#dc2626] px-12 py-12 flex flex-col justify-center text-white relative overflow-hidden">
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
              <div className="relative group mb-6">
                <div className="w-32 h-32 bg-gradient-to-br from-[#dc2626] to-[#7c2d12] rounded-full flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 shadow-2xl">
                  <Shield className="w-16 h-16 text-white" />
                </div>
              </div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#ffffff] via-[#dc2626] to-[#ffffff] bg-clip-text text-transparent">
                ADMIN
              </h1>
              <h2 className="text-3xl font-light mb-6 text-[#e5e5e5]">
                Control Panel
              </h2>
              <p className="text-[#c1c1c1] text-lg max-w-md leading-relaxed">
                Secure administrative access to naxrita HR Solutions. 
                Manage systems, users, and organizational data with enhanced privileges.
              </p>
            </div>
          </div>
        </div>
        
        {/* Right section - Admin Login Form */}
        <div className="w-full md:w-2/5 p-10 flex flex-col justify-center relative bg-[#000000]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#000000] to-[#1a1a1a] opacity-95" />
          
          <div className="relative z-10">
            {/* Form Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Shield className="text-[#dc2626] w-8 h-8 mr-3" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#ffffff] via-[#dc2626] to-[#ffffff] bg-clip-text text-transparent font-['Plus_Jakarta_Sans']">
                  Admin Sign In
                </h2>
              </div>
              <p className="text-[#a3a3a3] text-base font-['Plus_Jakarta_Sans']">
                Enter your administrative credentials
              </p>
            </div>
            
            {errors.auth && (
              <div className="mb-6 p-4 bg-[#ef4444] bg-opacity-20 border border-[#ef4444] rounded-lg flex items-center backdrop-blur-sm">
                <X className="text-[#ef4444] mr-3 w-5 h-5" />
                <span className="text-[#ef4444] text-sm font-['Plus_Jakarta_Sans']">{errors.auth}</span>
              </div>
            )}
            
            <form onSubmit={handleAdminLogin} className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-medium text-[#ffffff] mb-2 font-['Plus_Jakarta_Sans']">Admin ID</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#dc2626] z-10">
                    <Shield size={20} />
                  </span>
                  <input
                    type="text"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    placeholder="ADM001"
                    className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                      errors.adminId ? 'border-[#ef4444]' : 'border-[#2a2a2a]'
                    } bg-[#161616] backdrop-blur-sm text-[#ffffff] placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:border-transparent transition-all duration-300 font-['Plus_Jakarta_Sans']`}
                  />
                </div>
                {errors.adminId && <p className="text-[#ef4444] text-xs mt-2 font-['Plus_Jakarta_Sans']">{errors.adminId}</p>}
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-[#ffffff] mb-2 font-['Plus_Jakarta_Sans']">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#dc2626] z-10">
                    <Lock size={20} />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-12 pr-12 py-3 rounded-lg border ${
                      errors.password ? 'border-[#ef4444]' : 'border-[#2a2a2a]'
                    } bg-[#161616] backdrop-blur-sm text-[#ffffff] placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:border-transparent transition-all duration-300 font-['Plus_Jakarta_Sans']`}
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
                    className="h-4 w-4 text-[#dc2626] focus:ring-[#dc2626] border-[#2a2a2a] rounded bg-[#161616]"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-[#a3a3a3] font-['Plus_Jakarta_Sans']">
                    Remember me
                  </label>
                </div>
                
                <a href="/admin/forgot-password" className="text-sm font-medium text-[#dc2626] hover:text-[#b91c1c] transition-colors font-['Plus_Jakarta_Sans']">
                  Forgot password?
                </a>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 text-white bg-gradient-to-r from-[#dc2626] to-[#7c2d12] font-semibold rounded-lg shadow-glow-red focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:ring-offset-2 focus:ring-offset-[#000000] transition-all duration-300 transform hover:scale-105 hover:shadow-glow-red-large flex items-center justify-center font-['Plus_Jakarta_Sans']"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin w-5 h-5 mr-3" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Access Admin Panel
                  </>
                )}
              </button>
            </form>

            {/* Demo Credentials Info */}
            <div className="mt-6 p-4 bg-[#dc2626] bg-opacity-10 border border-[#dc2626] border-opacity-30 rounded-lg">
              <p className="text-xs text-[#a3a3a3] font-['Plus_Jakarta_Sans'] mb-2">Demo Admin Credentials:</p>
              <p className="text-xs text-[#6b7280] font-['Plus_Jakarta_Sans']">Admin: ADM001 / ADM001@2023-01-01</p>
            </div>

            {/* Employee Login Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-[#6b7280] font-['Plus_Jakarta_Sans']">
                Not an admin?{' '}
                <a href="/login" className="text-[#dc2626] hover:text-[#b91c1c] transition-colors font-medium">
                  Employee Login
                </a>
              </p>
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
          0% { filter: drop-shadow(0 0 20px rgba(220, 38, 38, 0.6)); }
          100% { filter: drop-shadow(0 0 30px rgba(220, 38, 38, 1)); }
        }
        
        .animate-success-modal {
          animation: success-modal 0.3s ease-out forwards;
        }
        
        .shadow-glow-red {
          box-shadow: 0 0 20px rgba(220, 38, 38, 0.3);
        }
        
        .shadow-glow-red-large {
          box-shadow: 0 0 30px rgba(220, 38, 38, 0.5);
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