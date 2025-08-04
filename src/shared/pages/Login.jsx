import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, CheckCircle, X, Loader, Mail, Lock, Users, Calendar, Star, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NexritaLogin() {
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginType, setLoginType] = useState('admin'); // 'admin' or 'employee'
  
  const navigate = useNavigate();

  // Starfield animation state
  const [stars, setStars] = useState([]);
  const [sparkles, setSparkles] = useState([]);

  // Generate animated background elements
  useEffect(() => {
    const generateStars = () => {
      const starArray = [];
      for (let i = 0; i < 200; i++) {
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
      for (let i = 0; i < 30; i++) {
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

  // Handle login submission with axios
  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   setErrors({});
    
  //   // Validate form
  //   const newErrors = {};
  //   if (!email) newErrors.email = 'Email is required';
  //   if (!password) newErrors.password = 'Password is required';
    
  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors);
  //     setIsSubmitting(false);
  //     return;
  //   }
    
  //   try {
  //     // Replace with your actual backend URL
  //     const response = await axios.post('https://your-backend-url.com/api/auth/login', {
  //       email,
  //       password,
  //       rememberMe,
  //       loginType
  //     });
      
  //     const { user, token } = response.data;
      
  //     // Store token in localStorage
  //     localStorage.setItem('token', token);
  //     localStorage.setItem('user', JSON.stringify(user));
      
  //     setIsSuccess(true);
      
  //     // Redirect based on user role after success animation
  //     setTimeout(() => {
  //       if (user.role === 'admin' || loginType === 'admin') {
  //         navigate('/admin/home');
  //       } else {
  //         navigate('/employee/home');
  //       }
  //     }, 2000);
      
  //   } catch (error) {
  //     console.error('Login error:', error);
      
  //     if (error.response?.status === 401) {
  //       setErrors({ auth: 'Invalid email or password' });
  //     } else if (error.response?.data?.message) {
  //       setErrors({ auth: error.response.data.message });
  //     } else {
  //       setErrors({ auth: 'Login failed. Please try again.' });
  //     }
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
// Handle login submission with axios
const handleLogin = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setErrors({});
  
  // Validate form
  const newErrors = {};
  if (!email) newErrors.email = 'Email is required';
  if (!password) newErrors.password = 'Password is required';
  
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    setIsSubmitting(false);
    return;
  }
  
  try {
    // Try backend first
    const response = await axios.post('https://your-backend-url.com/api/auth/login', {
      email,
      password,
      rememberMe,
      loginType
    });
    
    const { user, token } = response.data;
    
    // Store token in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    setIsSuccess(true);
    
    // Redirect based on user role after success animation
    setTimeout(() => {
      if (user.role === 'admin' || loginType === 'admin') {
        navigate('/admin/home');
      } else {
        navigate('/employee/home');
      }
    }, 2000);
    
  } catch (error) {
    console.error('Backend login failed, falling back to dummy data:', error);
    
    // Fallback to dummy data when backend fails
    let dummyUser = null;
    
    // Check credentials and create appropriate dummy user
    if (loginType === 'admin' && email === 'admin@hrportal.com' && password === 'admin123') {
      dummyUser = {
        id: '1',
        name: 'Sid',
        email: 'admin@hrportal.com',
        role: 'admin',
        avatar: 'S',
        jobTitle: 'HR Administrator',
        department: 'Human Resources',
        employeeId: 'ADM001',
        joinDate: '2023-01-15',
        permissions: ['user_management', 'payroll_access', 'reports_view', 'system_admin']
      };
    } else if (loginType === 'employee' && email === 'employee@hrportal.com' && password === 'employee123') {
      dummyUser = {
        id: '2',
        name: 'Sid',
        email: 'employee@hrportal.com',
        role: 'employee',
        avatar: 'S',
        jobTitle: 'Software Developer',
        department: 'Engineering',
        employeeId: 'EMP001',
        joinDate: '2023-03-20',
        manager: 'John Smith',
        permissions: ['profile_view', 'attendance_view', 'payslip_view']
      };
    } else {
      // Invalid credentials
      setErrors({ auth: 'Invalid email or password' });
      setIsSubmitting(false);
      return;
    }
    
    // Generate dummy token
    const dummyToken = 'dummy_token_' + Date.now();
    
    // Store dummy data in localStorage
    localStorage.setItem('token', dummyToken);
    localStorage.setItem('user', JSON.stringify(dummyUser));
    
    setIsSuccess(true);
    
    // Redirect based on user role after success animation
    setTimeout(() => {
      if (dummyUser.role === 'admin' || loginType === 'admin') {
        navigate('/admin/home');
      } else {
        navigate('/employee/home');
      }
    }, 2000);
  } finally {
    setIsSubmitting(false);
  }
};

  // Reset form when switching login types
  useEffect(() => {
    setEmail('');
    setPassword('');
    setErrors({});
  }, [loginType]);

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden flex items-center justify-center p-4">
     
      {/* Success overlay */}
      {isSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 flex flex-col items-center justify-center shadow-2xl transform animate-success-modal backdrop-blur-lg">
            <div className="w-20 h-20 rounded-full bg-green-900 bg-opacity-30 flex items-center justify-center mb-4 border border-green-600">
              <CheckCircle className="text-green-400 w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold text-white">Success!</h3>
            <p className="text-gray-300 mt-2">Login successful</p>
            <p className="text-gray-500 mt-1 text-sm">Redirecting to dashboard...</p>
          </div>
        </div>
      )}
      
      <div className="relative z-10 h-[85vh] w-full max-w-5xl flex flex-col md:flex-row shadow-2xl rounded-3xl overflow-hidden bg-gray-900 bg-opacity-90 backdrop-blur-xl border border-gray-700">
        
        {/* Left section - HR Management Illustration */}
        <div className="w-full md:w-3/5 bg-gradient-to-br from-gray-900 via-black to-blue-900 px-8 py-8 flex flex-col justify-between text-white relative overflow-hidden">
          {/* Mini starfield for left panel */}
          <div className="absolute inset-0">
            {stars.slice(0, 30).map(star => (
              <div
                key={`left-${star.id}`}
                className="absolute rounded-full bg-white animate-pulse"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${star.size * 0.5}px`,
                  height: `${star.size * 0.5}px`,
                  opacity: star.opacity * 0.5,
                  animationDelay: `${star.animationDelay}s`
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            {/* Nexrita Logo */}
            <div className="flex flex-col items-center mb-1">
              <img 
                src="https://naxrita.com/wp-content/uploads/2024/10/logo-t.png" 
                alt="Nexrita Logo"
                className="h-12 w-auto mb-2"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'block';
                }}
              />
             
              
            </div>
            
            <div className="text-center mb-0">
              <p className="text-lg text-gray-300 font-light mb-2">
                Advanced HR Management Platform
              </p>
              <p className="text-sm text-gray-400 font-light opacity-75 mb-2">
                AI-powered workforce optimization with intelligent automation and analytics
              </p>
              <p className="text-xs text-gray-200 font-light opacity-60 leading-relaxed">
                Nexrita combines cutting-edge artificial intelligence with intuitive design to revolutionize how organizations manage their most valuable asset - their people. From automated onboarding workflows to predictive analytics dashboards, our platform empowers HR professionals to make data-driven decisions while streamlining operations across the entire employee lifecycle.
              </p>
            </div>
          </div>
          
          <div className="my-auto relative z-10">
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-white bg-opacity-10 backdrop-blur-sm flex items-center justify-center mr-4 border border-white border-opacity-20">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Employee Management</h3>
                  <p className="text-sm opacity-75 text-gray-300">Streamline workforce operations and analytics</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-white bg-opacity-10 backdrop-blur-sm flex items-center justify-center mr-4 border border-white border-opacity-20">
                  <Calendar className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Attendance & Payroll</h3>
                  <p className="text-sm opacity-75 text-gray-300">Automated time tracking and salary processing</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-white bg-opacity-10 backdrop-blur-sm flex items-center justify-center mr-4 border border-white border-opacity-20">
                  <Building className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Performance Analytics</h3>
                  <p className="text-sm opacity-75 text-gray-300">Data-driven insights for better decisions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right section - Login Form */}
        <div className="w-full md:w-2/5 md:p-8  flex flex-col justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-50 rounded-r-3xl" />
          
          <div className="relative z-10">
            {/* Toggle switch */}
            <div className="mx-auto mb-1 bg-gray-800 bg-opacity-50 rounded-full p-1 flex w-64 border border-gray-600">
              <button 
                className={`w-1/2 py-1 px-1 rounded-full font-sm text-center transition-all duration-300 ${
                  loginType === 'admin' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 font-sm  text-white shadow-lg' 
                    : 'text-gray-400 hover:text-gray-200 font-sm '
                }`}
                onClick={() => setLoginType('admin')}
              >
                Admin Portal
              </button>
              <button 
                className={`w-1/2 py-1 rounded-full font-sm text-center transition-all duration-300 ${
                  loginType === 'employee' 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 font-sm  text-white shadow-lg' 
                    : 'text-gray-400 hover:text-gray-200 font-sm '
                }`}
                onClick={() => setLoginType('employee')}
              >
                Employee Portal
              </button>
            </div>
            
            {/* <h2 className="text-3xl font-bold mb-0 text-center text-white">
              {loginType === 'admin' ? 'Admin Dashboard' : 'Employee Portal'}
            </h2> */}
            <p className="text-gray-400 mb-2 text-center text-sm">
              {loginType === 'admin' 
                ? 'Access administrative controls and analytics' 
                : 'View your profile, attendance, and payslips'
              }
            </p>
            
            {errors.auth && (
              <div className="mb-6 p-4 bg-red-900 bg-opacity-30 border border-red-600 rounded-lg flex items-center backdrop-blur-sm">
                <X className="text-red-400 mr-3 w-5 h-5" />
                <span className="text-red-300 text-sm">{errors.auth}</span>
              </div>
            )}
            
           
            
            <form onSubmit={handleLogin} className="space-y-2">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-white">
                    <Mail size={24} />
                  </span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={loginType === 'admin' ? 'admin@hrportal.com' : 'employee@hrportal.com'}
                    className={`w-full pl-12 pr-4 py-1 rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-gray-600'
                    } bg-gray-800 bg-opacity-50 backdrop-blur-sm text-white font-xs placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                  />
                </div>
                {errors.email && <p className="text-red-400 text-xs mt-2">{errors.email}</p>}
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-white">
                    <Lock size={24} />
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-12 pr-12 py-1 rounded-lg border ${
                      errors.password ? 'border-red-500' : 'border-gray-600'
                    } bg-gray-800 bg-opacity-50 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-800"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
                
                <a href="/forgot-password" className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot password?
                </a>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-2 bg-gradient-to-r font-jakarta from-blue-950 to-purple-950 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex items-center justify-center backdrop-blur-sm border border-blue-500 border-opacity-30"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin w-4 h-4 mr-3" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in 
                  </>
                )}
              </button>
            </form>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-xs text-gray-500">
                Powered by Nexrita HR Solutions © 2025
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes success-modal {
          0% { transform: scale(0.7); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .animate-success-modal {
          animation: success-modal 0.3s ease-out forwards;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
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
