import {
  BarChart3,
  Briefcase,
  Cake,
  ChevronDown,
  ChevronUp,
  Clock,
  DollarSign,
  Download,
  FileText,
  Home,
  Settings,
  User
} from 'lucide-react';
import { Fragment, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Summary', href: '/admin/summary', icon: Home },
  { name: 'Overview', href: '/admin/overview', icon: Briefcase },
  { name: 'Career', href: '/admin/career', icon: User },
   { name: 'Birthdays', href: '/admin/birthdays', icon: Cake },
  { name: 'Employee Management', href: '/admin/employees', icon: User },
  { name: 'Performance', href: '/admin/performance', icon: BarChart3 },
  { name: 'Personal', href: '/admin/profile', icon: FileText },
  { name: 'Contact', href: '/admin/contact', icon: Clock },
  { name: 'Compensation', href: '/admin/compensation', icon: DollarSign },
  
];

// Cosmic Background Component
const CosmicBackground = ({ intensity = 'full' }) => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (reduceMotion) return null;

  const getParticleCount = () => {
    switch (intensity) {
      case 'subtle': return { stars: 50, sparkles: 10, dots: 30 };
      case 'moderate': return { stars: 100, sparkles: 15, dots: 50 };
      case 'full': return { stars: 150, sparkles: 25, dots: 80 };
      default: return { stars: 150, sparkles: 25, dots: 80 };
    }
  };

  const counts = getParticleCount();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Starfield */}
      {/* <div className="absolute inset-0">
        {Array.from({ length: counts.stars }).map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full bg-white opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
            }}
          />
        ))}
      </div> */}

      {/* Floating Sparkles */}
      {/* <div className="absolute inset-0">
        {Array.from({ length: counts.sparkles }).map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute rounded-full bg-blue-500 opacity-30 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 4 + 6}s`,
            }}
          />
        ))}
      </div> */}

      {/* Animated Dots */}
      {/* <div className="absolute inset-0">
        {Array.from({ length: counts.dots }).map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute rounded-full bg-blue-400 opacity-10 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 3 + 3}s`,
            }}
          />
        ))}
      </div> */}

      {/* Nebula Clouds */}
      {/* <div className="absolute inset-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`nebula-${i}`}
            className="absolute rounded-full blur-3xl opacity-5 animate-pulse"
            style={{
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              background: i % 2 === 0 ? '#2563eb' : '#6b7280',
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 10 + 20}s`,
            }}
          />
        ))}
      </div> */}
    </div>
  );
};

const AdminSidebar = ({ sidebarOpen = true, setSidebarOpen = () => {} }) => {
  const location = useLocation();
  const [actionsOpen, setActionsOpen] = useState(false);

  // Retrieve user data from localStorage
  const auth = JSON.parse(localStorage.getItem('auth')) || {};
  const { name, role, employeeId } = auth;

  const displayName = name || 'Admin Sid';
  const displayRole = role || 'Admin';
  const displayId = employeeId || '007';

  const actionItems = [
    { name: 'Download PDF', icon: Download, action: () => console.log('Download PDF') },
    { name: 'Settings', icon: Settings, action: () => console.log('Settings') },
  ];

  const handleNavClick = (href) => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <Fragment>
      {/* Backdrop (only visible on mobile when sidebar is open) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-70 transition-opacity lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed  lg:static inset-y-0 left-0 z-30 flex flex-col w-72 transform transition-all duration-500 ease-in-out bg-[#0a0a0a] text-white border-r border-gray-800 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 shadow-2xl`}
        style={{
          background: '#0a0a0a',
          boxShadow: '0 0 50px rgba(37, 99, 235, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Cosmic Background for Sidebar */}
        {/* <CosmicBackground intensity="moderate" /> */}
        
        <div className="flex-1 flex flex-col h-full  relative z-10 no-scrollbar">
          {/* Header with Company Branding */}
          <div className="flex-1 flex flex-col pt-1 pb-1 overflow-y-auto no-scrollbar">
            <div className="px-6 mb-0">
              {/* Company Logo */}
             
              
              {/* User Info with Enhanced Styling */}
              <div className="text-center mb-2 no-scrollbar">
                <h1 
                  className="text-xl font-semibold text-white mb-1 tracking-wide"
                  style={{ 
                    fontFamily: 'Plus Jakarta Sans, Inter, system-ui, sans-serif',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {displayName}
                </h1>
                <p className="text-sm text-gray-300 font-medium opacity-90">{displayRole}</p>
              </div>
              
              {/* Enhanced Actions Button with Cosmic Styling */}
              <div className="flex justify-center relative mb-2">
                <button 
                  onClick={() => setActionsOpen(!actionsOpen)}
                  className="group relative bg-gradient-to-r from-gray-800 to-gray-900 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-medium border border-gray-600 hover:border-blue-500 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-blue-500/25 hover:shadow-2xl transform hover:scale-105"
                  style={{
                    backdropFilter: 'blur(10px)',
                    background: 'rgba(30, 30, 30, 0.8)',
                  }}
                >
                  <span className="relative z-10">Actions</span>
                  {actionsOpen ? (
                    <ChevronUp className="w-4 h-4 transition-transform duration-300 group-hover:text-blue-200" />
                  ) : (
                    <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:text-blue-200" />
                  )}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                {/* Enhanced Dropdown Menu */}
                {actionsOpen && (
                  <div 
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-48 rounded-xl shadow-2xl z-50 border border-gray-700 overflow-hidden"
                    style={{
                      background: 'rgba(30, 30, 30, 0.95)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(59, 130, 246, 0.1)',
                    }}
                  >
                    {actionItems.map((item, index) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          item.action();
                          setActionsOpen(false);
                        }}
                        className="w-full px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 flex items-center gap-3 transition-all duration-200 group"
                      >
                        <div className="w-8 h-8 rounded-full border border-gray-500 group-hover:border-blue-400 flex items-center justify-center transition-all duration-200 group-hover:shadow-lg group-hover:shadow-blue-500/25">
                          <item.icon className="w-4 h-4 group-hover:text-blue-200" />
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Navigation */}
            <nav className="flex-1 px-4 space-y-2 h-screen overflow-y-auto no-scrollbar">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`group relative flex items-center px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25 border border-blue-500'
                        : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 border border-transparent hover:border-gray-600'
                    }`}
                    style={{
                      backdropFilter: 'blur(10px)',
                      background: isActive 
                        ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' 
                        : 'rgba(30, 30, 30, 0.3)',
                    }}
                  >
                    <item.icon
                      className={`mr-4 h-5 w-5 transition-all duration-300 ${
                        isActive 
                          ? 'text-blue-200 drop-shadow-lg' 
                          : 'text-gray-400 group-hover:text-blue-400'
                      }`}
                    />
                    <span className="relative z-10 tracking-wide">{item.name}</span>
                    {isActive && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 opacity-80"></div>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Enhanced Footer */}
          <div 
            className="flex-shrink-0 p-2 border-t border-gray-700 relative -mt-5"
            style={{
              background: 'linear-gradient(135deg, #0a0a0a 0%, #161616 100%)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div className="flex items-center group">
              <div 
                className="inline-flex h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 items-center justify-center text-lg font-bold text-white shadow-xl transform transition-all duration-300 group-hover:scale-110"
                style={{
                  boxShadow: '0 8px 32px rgba(37, 99, 235, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                }}
              >
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="ml-4 flex-1">
                <p 
                  className="text-sm font-semibold text-white tracking-wide"
                  style={{ fontFamily: 'Plus Jakarta Sans, Inter, system-ui, sans-serif' }}
                >
                  {displayName.split(' ').slice(-1).join(' ')}, {displayName.split(' ')[0]}
                </p>
                <p className="text-xs text-gray-400 font-medium">ID: {displayId}</p>
              </div>
            </div>
            
            {/* Subtle glow effect at bottom */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30 rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Enhanced click outside to close dropdown */}
      {actionsOpen && (
        <div 
          className="fixed inset-0 z-10 bg-black bg-opacity-20 backdrop-blur-sm" 
          onClick={() => setActionsOpen(false)}
        />
      )}

      {/* CSS for additional cosmic animations */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes drift {
          0% { transform: translateX(0px); }
          100% { transform: translateX(50px); }
        }
        
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite alternate;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-drift {
          animation: drift 15s linear infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </Fragment>
  );
};

export default AdminSidebar;
