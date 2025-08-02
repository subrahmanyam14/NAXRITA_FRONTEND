import React, { Fragment, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  User,
  Briefcase,
  BarChart3,
  FileText,
  Clock,
  Calendar,
  Book,
  DollarSign,
  Settings,
  Download,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const navigation = [
  { name: 'Summary', href: '/admin/summary', icon: Home },
  { name: 'Overview', href: '/admin/overview', icon: Briefcase },
  { name: 'Career', href: '/admin/career', icon: User },
  
  { name: 'Employee Management', href: '/admin/employees', icon: User },
  { name: 'Performance', href: '/admin/performance', icon: BarChart3 },
  { name: 'Personal', href: '/admin/profile', icon: FileText },
  { name: 'Contact', href: '/admin/contact', icon: Clock },
  { name: 'Compensation', href: '/admin/compensation', icon: DollarSign },
];

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
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-30 flex flex-col w-64 transform transition-transform duration-300 ease-in-out bg-gray-900 text-white border-r border-gray-700 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex-1 flex flex-col h-screen">
          {/* Header */}
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="px-4 mb-6">
              {/* Centered Name and Role */}
              <div className="text-center mb-4">
                <h1 className="text-xl font-bold text-white">{displayName}</h1>
                <p className="text-sm text-gray-300">{displayRole}</p>
              </div>
              
              {/* Centered Actions Button with Dropdown */}
              <div className="flex justify-center relative">
                <button 
                  onClick={() => setActionsOpen(!actionsOpen)}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-1.5 rounded-full text-xs border border-gray-600 transition-all duration-200 flex items-center gap-2"
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
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-40 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50">
                    {actionItems.map((item, index) => (
                      <button
                        key={item.name}
                        onClick={() => {
                          item.action();
                          setActionsOpen(false);
                        }}
                        className="w-full px-3 py-2 text-xs text-gray-300 hover:text-white hover:bg-gray-700 flex items-center gap-2 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg"
                      >
                        <div className="w-6 h-6 rounded-full border border-gray-500 flex items-center justify-center">
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
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`group flex items-center px-3 py-2.5 text-sm font-normal rounded-md transition-colors duration-150 ${
                      isActive
                        ? 'bg-gray-800 text-white border-l-4 border-blue-500'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-4 w-4 ${
                        isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'
                      }`}
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 p-4 bg-gray-950 border-t border-gray-700">
            <div className="flex items-center">
              <div className="inline-flex h-9 w-9 rounded-full bg-gradient-to-r from-orange-500 to-red-600 items-center justify-center text-sm font-medium text-white shadow-lg">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">
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
    </Fragment>
  );
};

export default AdminSidebar;