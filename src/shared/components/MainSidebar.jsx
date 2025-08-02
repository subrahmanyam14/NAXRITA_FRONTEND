// src/shared/components/MainSidebar.jsx
import { Fragment, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Icons
import { IoClose } from 'react-icons/io5';
import { 
  HiHome, 
  HiUser, 
  HiUserGroup, 
  HiDotsHorizontal,
  HiChevronUp,
  HiChevronDown 
} from 'react-icons/hi';
import { 
  FiChartBar, 
  FiBookOpen, FiHome,
  FiBriefcase, 
  FiSettings,
  FiUsers,FiUser,
  FiCalendar,FiDroplet,
  FiAward,
  FiEdit3,
  FiPlus
} from 'react-icons/fi';

const MainSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user } = useAuth();
  const location = useLocation();
  const sidebarRef = useRef(null);
  const [expandedSections, setExpandedSections] = useState({});

  const handleCloseSidebar = () => {
    if (typeof setSidebarOpen === 'function') {
      setSidebarOpen(false);
    }
  };

  const toggleSection = (sectionName) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  // Navigation structure with sub-items
  const navigation = [
    {
      name: 'Home',
      icon: FiHome,
      href: user?.role === 'admin' ? '/admin/home' : '/employee/home',
      roles: ['admin', 'employee'],
    },
      {
          name: 'Policies',
          icon: FiBookOpen,
          href: user?.role === 'admin' ? '/admin/public' : '/employee/public',
          roles: ['admin', 'employee'],
        },
    {
      name: 'Personal',
      icon: FiUser,
      roles: ['admin', 'employee'],
      expandable: true,
      subItems: [
        {
          name: 'My Performance Dashboard',
          href: user?.role === 'admin' ? '/admin/performance/dashboard' : '/employee/performance/dashboard',
          roles: ['admin', 'employee'],
        },
        {
          name: 'Learning',
          href: user?.role === 'admin' ? '/admin/learning' : '/employee/learning',
          roles: ['admin', 'employee'],
        },
        {
          name: 'Careers Marketplace',
          href: user?.role === 'admin' ? '/admin/careers' : '/employee/careers',
          roles: ['admin', 'employee'],
        },
        {
          name: 'Skills Engine',
          href: user?.role === 'admin' ? '/admin/skills' : '/employee/skills',
          roles: ['admin', 'employee'],
        },
      ],
    },
    {
      name: 'Team',
      icon: FiUsers,
      roles: ['admin', 'employee'],
      expandable: true,
      subItems: [
        {
          name: 'People I Lead',
          href: user?.role === 'admin' ? '/admin/team/people' : '/employee/team/people',
          roles: ['admin', 'employee'],
        },
        {
          name: 'Performance Dashboard',
          href: user?.role === 'admin' ? '/admin/team/performance' : '/employee/team/performance',
          roles: ['admin', 'employee'],
        },
        {
          name: 'Assign People Lead',
          href: user?.role === 'admin' ? '/admin/team/assign' : '/employee/team/assign',
          roles: ['admin', 'employee'],
        },
        {
          name: 'Anniversaries',
          href: user?.role === 'admin' ? '/admin/team/anniversaries' : '/employee/team/anniversaries',
          roles: ['admin', 'employee'],
        },
      ],
    },
    {
      name: 'More',
      icon: FiDroplet,
      roles: ['admin', 'employee'],
      expandable: true,
      subItems: [
        {
          name: 'Calendar',
          href: user?.role === 'admin' ? '/admin/calendar' : '/employee/calendar',
          roles: ['admin', 'employee'],
        },
        {
          name: 'Policies',
          href: user?.role === 'admin' ? '/admin/policies' : '/employee/policies',
          roles: ['admin', 'employee'],
        },
        {
          name: 'Settings',
          href: user?.role === 'admin' ? '/admin/settings' : '/employee/settings',
          roles: ['admin', 'employee'],
        },
      ],
    },
  ];

  // Filter navigation based on user role
  const filteredNav = navigation.filter((item) => item.roles.includes(user?.role || ''));

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        const menuButton = document.querySelector('button[aria-label="Toggle sidebar"]');
        if (menuButton && !menuButton.contains(event.target)) {
          handleCloseSidebar();
        }
      }
    }

    if (sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  // Close sidebar when route changes
  useEffect(() => {
    if (sidebarOpen) {
      handleCloseSidebar();
    }
  }, [location.pathname]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  return (
    <Fragment>
      {/* Black Background Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out  p-2 z-40 ${
          sidebarOpen ? 'opacity-50 visible' : 'opacity-0 invisible'
        }`}
        onClick={handleCloseSidebar}
        aria-hidden="true"
      />

      {/* Sidebar Panel */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 h-screen rounded-lg border-slate-500 border-2 z-50 py-1 w-80 bg-white shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-4' : '-translate-x-full '
        }`}
      >
        {/* Header with Tabs */}
        <div className="px-4 pt-0 pb-0 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900"></h1>
            <button
              type="button"
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
              onClick={handleCloseSidebar}
              aria-label="Close sidebar"
            >
              <IoClose className="h-5 w-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-0 mb-0">
            <button className="px-4 py-2 text-sm font-normal text-blue-600 border-b-2 border-blue-600 bg-transparent">
              Menu
            </button>
            <button className="px-4 py-2 text-sm font-nromal text-gray-500 hover:text-gray-700 bg-transparent">
              Shortcuts
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-0 py-0 overflow-y-auto">
          <div className="space-y-0">
            {filteredNav.map((item) => {
              const isExpanded = expandedSections[item.name];
              const isActive = location.pathname === item.href;
              
              return (
                <div key={item.name}>
                  {/* Main Navigation Item */}
                  {item.expandable ? (
                    <button
                      onClick={() => toggleSection(item.name)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-xs font-normal text-left transition-colors duration-200 hover:bg-gray-50 ${
                        isExpanded ? 'bg-gray-100' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon className="mr-3 h-5 w-5 text-gray-500" />
                        <span className="text-gray-900">{item.name}</span>
                      </div>
                      {isExpanded ? (
                        <HiChevronUp className="h-4 w-4 text-gray-400 transition-transform duration-200" />
                      ) : (
                        <HiChevronDown className="h-4 w-4 text-gray-400 transition-transform duration-200" />
                      )}
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className={`flex items-center px-4 py-3 text-xs font-medium transition-colors duration-200 hover:bg-gray-50 ${
                        isActive ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' : 'text-gray-900'
                      }`}
                      onClick={handleCloseSidebar}
                    >
                      <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                      {item.name}
                    </Link>
                  )}

                  {/* Sub Items */}
                  {item.expandable && (
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="bg-gray-50">
                        {item.subItems?.filter(subItem => subItem.roles.includes(user?.role || '')).map((subItem) => {
                          const isSubActive = location.pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className={`block px-12 py-2.5 text-xs transition-colors duration-200 hover:bg-gray-100 ${
                                isSubActive ? 'text-blue-700 bg-blue-50 font-medium' : 'text-gray-600'
                              }`}
                              onClick={handleCloseSidebar}
                            >
                              {subItem.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Bottom Action Buttons */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex space-x-2">
            <button className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
              <FiPlus className="h-4 w-4 mr-2" />
              Add
            </button>
            <button className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
              <FiEdit3 className="h-4 w-4 mr-2" />
              Edit
            </button>
          </div>
        </div>

        {/* User Profile Footer */}
       
      </div>
    </Fragment>
  );
};

export default MainSidebar;