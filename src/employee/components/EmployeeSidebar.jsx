import React, { Fragment, useState, useEffect } from 'react';
import {
  Home,
  User,
  Briefcase,
  BarChart3,
  FileText,
  Clock,
  DollarSign,
  Download,
  Settings,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

const navigation = [
  { name: 'Summary', href: '/employee/summary', icon: Home },
  { name: 'Overview', href: '/employee/overview', icon: Briefcase },
  { name: 'Career', href: '/employee/career', icon: User },
  { name: 'Performance', href: '/employee/learning', icon: BarChart3 },
  { name: 'Personal', href: '/employee/profile', icon: FileText },
  { name: 'Contact', href: '/employee/contact', icon: Clock },
  { name: 'Tasks', href: '/employee/tasks', icon: Briefcase },
  { name: 'Compensation', href: '/employee/compensation', icon: DollarSign },
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

const EmployeeSidebar = ({ sidebarOpen = true, setSidebarOpen = () => {} }) => {
  const [actionsOpen, setActionsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('/employee/profile');

  // Mock user data
  const displayName = 'Sid Johnson';
  const displayRole = 'Employee';
  const displayId = '007';

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
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-30 flex flex-col w-64 transform transition-all duration-300 ease-in-out bg-[#0c4a6e] text-white border-r border-gray-700 backdrop-blur-md ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 relative overflow-hidden`}
        style={{
          // background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #161616 100%)',
          background:'#1a1a1a',
          borderRight: '1px solid #2a2a2a',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.8)',
        }}
      >
        {/* Animated Background Effects */}
        {/* <CosmicBackground intensity="moderate" /> */}
        {/* <SparklesOverlay /> */}
        
        {/* Cosmic overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent pointer-events-none" /> */}

        <div className="flex-1 flex flex-col h-full relative z-10 no-scrollbar">
          {/* Header with Company Branding */}
          <div className="flex-1 flex flex-col pt-1 pb-1 overflow-y-auto no-scrollbar">
            <div className="px-6 mb-2">
              {/* Centered Name and Role */}
              <div className="text-center mb-4">
                <h1 
                  className="text-xl font-bold text-white mb-2"
                  style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}
                >
                  {displayName}
                </h1>
                <p className="text-sm text-gray-300 font-medium">{displayRole}</p>
              </div>
              
              {/* Centered Actions Button with Dropdown */}
              <div className="flex justify-center relative">
                <button 
                  onClick={() => setActionsOpen(!actionsOpen)}
                  className="bg-gray-800/80 hover:bg-gray-700/80 text-white px-4 py-1 rounded-full text-xs border border-gray-600/50 transition-all duration-300 flex items-center gap-2 backdrop-blur-sm shadow-lg hover:shadow-blue-500/20 hover:border-blue-500/30"
                  style={{
                    boxShadow: actionsOpen ? '0 0 20px rgba(37, 99, 235, 0.3)' : '0 4px 6px -1px rgba(0, 0, 0, 0.8)',
                  }}
                >
                  Actions
                  {actionsOpen ? (
                    <ChevronUp className="w-3 h-3" />
                  ) : (
                    <ChevronDown className="w-3 h-3" />
                  )}
                </button>
                
                {/* Dropdown Menu */}
                {actionsOpen && (
                  <div 
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-40 bg-gray-800/90 border border-gray-600/50 rounded-lg shadow-2xl z-50 backdrop-blur-md"
                    style={{
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.9), 0 0 20px rgba(37, 99, 235, 0.2)',
                    }}
                  >
                    {actionItems.map((item, index) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          item.action();
                          setActionsOpen(false);
                        }}
                        className="w-full px-3 py-1 text-xs text-gray-300 hover:text-white hover:bg-gray-700/80 flex items-center gap-4 transition-all duration-200 first:rounded-t-lg last:rounded-b-lg group"
                      >
                        <div className="w-6 h-6 rounded-full border border-gray-500/50 flex items-center justify-center group-hover:border-blue-400/50 group-hover:shadow-lg group-hover:shadow-blue-400/20 transition-all duration-200">
                          <item.icon className="w-3 h-3" />
                        </div>
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 space-y-2">
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
                                    : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-700 border border-gray-800/50 hover:border-gray-400'
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

          {/* Footer */}
          <div 
            className="flex-shrink-0 p-4 border-t border-gray-700/50 backdrop-blur-sm relative"
            style={{
              background: 'linear-gradient(135deg, #0a0a0a/80 0%, #161616/80 100%)',
            }}
          >
            <div className="flex items-center">
              <div 
                className="inline-flex h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 items-center justify-center text-sm font-bold text-white shadow-lg relative overflow-hidden"
                style={{
                  boxShadow: '0 0 20px rgba(37, 99, 235, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)',
                }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse" />
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <p 
                  className="text-sm font-semibold text-white"
                  style={{ fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}
                >
                  {displayName.split(' ').slice(-1).join(' ')}, {displayName.split(' ')[0]}
                </p>
                <p className="text-xs text-gray-400">ID: {displayId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Click outside to close dropdown */}
      {actionsOpen && (
        <div 
          className="fixed inset-0 z-10" 
          onClick={() => setActionsOpen(false)}
        />
      )}

      {/* Custom styles */}
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

export default EmployeeSidebar;
