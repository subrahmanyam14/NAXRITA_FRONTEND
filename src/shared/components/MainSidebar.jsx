// src/shared/components/MainSidebar.jsx
import { Fragment, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useRoles } from '../../contexts/RolesContext';

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
  FiUsers, FiUser,
  FiCalendar, FiDroplet,
  FiAward,
  FiEdit3,
  FiPlus
} from 'react-icons/fi';

const MainSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [lowerCaseRoles, setLowerCaseRoles] = useState([]);
  const { user } = useAuth();
  const { roles, loading } = useRoles();
  const location = useLocation();
  const sidebarRef = useRef(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [activeTab, setActiveTab] = useState('Menu');
  const userRole = (user?.role || '').toLowerCase();
  const handleCloseSidebar = () => {
    if (typeof setSidebarOpen === 'function') {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    const toLowerCase = roles.map((role) => (role.toLowerCase()));
    setLowerCaseRoles(toLowerCase);
  }, []);

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
      href: ["super admin", "admin"].includes(userRole) ? '/admin/home' : '/employee/home',
      roles: lowerCaseRoles || ['super admin', 'admin', 'employee', 'hr admin', 'manager', 'team lead', 'hr viewer', 'contractor'],
    },
    {
      name: 'Policies',
      icon: FiBookOpen,
      href: ["super admin", "admin"].includes(userRole) ? '/admin/public' : '/employee/public',
      roles: lowerCaseRoles || ['super admin', 'admin', 'employee', 'hr admin', 'manager', 'team lead', 'hr viewer', 'contractor'],
    },
    {
      name: 'Personal',
      icon: FiUser,
      roles: lowerCaseRoles || ['super admin', 'admin', 'employee', 'hr admin', 'manager', 'team lead', 'hr viewer', 'contractor'],
      expandable: true,
      subItems: [
        {
          name: 'My Performance Dashboard',
          href: ["super admin", "admin"].includes(userRole) ? '/admin/performance/dashboard' : '/employee/performance/dashboard',
          roles: lowerCaseRoles || ['super admin', 'admin', 'employee', 'hr admin', 'manager', 'team lead', 'hr viewer', 'contractor'],
        },
        {
          name: 'Learning',
          href: ["super admin", "admin"].includes(userRole) ? '/admin/learning' : '/employee/learning',
          roles: lowerCaseRoles || ['super admin', 'admin', 'employee', 'hr admin', 'manager', 'team lead', 'hr viewer', 'contractor'],
        },
        {
          name: 'Careers Marketplace',
          href: ["super admin", "admin"].includes(userRole) ? '/admin/careers' : '/employee/careers',
          roles: lowerCaseRoles || ['super admin', 'admin', 'employee', 'hr admin', 'manager', 'team lead', 'hr viewer', 'contractor'],
        },
        {
          name: 'Skills Engine',
          href: ["super admin", "admin"].includes(userRole) ? '/admin/skills' : '/employee/skills',
          roles: lowerCaseRoles || ['super admin', 'admin', 'employee', 'hr admin', 'manager', 'team lead', 'hr viewer', 'contractor'],
        },
      ],
    },
    {
      name: 'Team',
      icon: FiUsers,
      roles: lowerCaseRoles || ['super admin', 'admin', 'employee', 'hr admin', 'manager', 'team lead', 'hr viewer', 'contractor'],
      expandable: true,
      subItems: [
        {
          name: 'People I Lead',
          href: ["super admin", "admin"].includes(userRole) ? '/admin/team/people' : '/employee/team/people',
          roles: lowerCaseRoles || ['super admin', 'admin', 'employee', 'hr admin', 'manager', 'team lead', 'hr viewer', 'contractor'],
        },
        {
          name: 'Performance Dashboard',
          href: ["super admin", "admin"].includes(userRole) ? '/admin/team/performance' : '/employee/team/performance',
          roles: lowerCaseRoles || ['super admin', 'admin', 'employee', 'hr admin', 'manager', 'team lead', 'hr viewer', 'contractor'],
        },
        {
          name: 'Assign People Lead',
          href: ["super admin", "admin"].includes(userRole) ? '/admin/team/assign' : '/employee/team/assign',
          roles: lowerCaseRoles || ['super admin', 'admin', 'employee', 'hr admin', 'manager', 'team lead', 'hr viewer', 'contractor'],
        },
        {
          name: 'Anniversaries',
          href: ["super admin", "admin"].includes(userRole) ? '/admin/team/anniversaries' : '/employee/team/anniversaries',
          roles: lowerCaseRoles || ['super admin', 'admin', 'employee', 'hr admin', 'manager', 'team lead', 'hr viewer', 'contractor'],
        },
      ],
    },
    {
      name: 'More',
      icon: FiDroplet,
      roles: lowerCaseRoles || ['super admin', 'admin', 'employee', 'hr admin', 'manager', 'team lead', 'hr viewer', 'contractor'],
      expandable: true,
      subItems: [
        {
          name: 'Calendar',
          href: ["super admin", "admin"].includes(user?.role.toLowerCase()) ? '/admin/calendar' : '/employee/calendar',
          roles: lowerCaseRoles || ['super admin', 'admin', 'employee', 'hr admin', 'manager', 'team lead', 'hr viewer', 'contractor'],
        },
        {
          name: 'Policies',
          href: ["super admin", "admin"].includes(user?.role.toLowerCase()) ? '/admin/policies' : '/employee/policies',
          roles: lowerCaseRoles || ['super admin', 'admin', 'employee', 'hr admin', 'manager', 'team lead', 'hr viewer', 'contractor'],
        },
        {
          name: 'Settings',
          href: ["super admin", "admin"].includes(user?.role.toLowerCase()) ? '/admin/settings' : '/employee/settings',
          roles: lowerCaseRoles || ['super admin', 'admin', 'employee', 'hr admin', 'manager', 'team lead', 'hr viewer', 'contractor'],
        },
      ],
    },
  ];

  // Filter navigation based on user role
  const filteredNav = navigation.filter((item) => item.roles.includes(userRole));

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
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-all duration-300 ease-in-out z-40 no-scrollbar ${sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        onClick={handleCloseSidebar}
        aria-hidden="true"
      />

      {/* Sidebar Panel */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 h-screen z-50 w-[320px] bg-[#111111] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.8)] flex flex-col transform transition-transform duration-300 ease-in-out border-r border-[#2a2a2a] font-jakarta no-scrollbar ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Header with Brand and Close Button */}
        <div className="px-6 pt-6 pb-4 border-b border-[#2a2a2a] bg-[#0a0a0a] no-scrollbar">
          <div className="flex items-center justify-between mb-6 no-scrollbar">
            <div className="flex items-center space-x-3 no-scrollbar">
              <img
                src="https://naxrita.com/wp-content/uploads/2024/10/logo-t.png"
                alt="naxrita Logo"
                className="h-8 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              {/* <h1 className="text-xl font-bold text-white tracking-tight">naxrita</h1> */}
            </div>
            <button
              type="button"
              className="p-2 rounded-xl text-[#a3a3a3] hover:text-white hover:bg-[#1e1e1e] transition-all duration-300 border border-transparent hover:border-[#404040] hover:shadow-lg hover:shadow-black/20"
              onClick={handleCloseSidebar}
              aria-label="Close sidebar"
            >
              <IoClose className="h-5 w-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-[#161616] rounded-lg p-1 border border-[#2a2a2a] no-scrollbar">
            {['Menu', 'Shortcuts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-300 ${activeTab === tab
                    ? 'bg-[#2563eb] text-white shadow-lg shadow-blue-500/20'
                    : 'text-[#a3a3a3] hover:text-white hover:bg-[#1e1e1e]'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-4 overflow-y-auto   no-scrollbar">
          <div className="space-y-1 no-scrollbar">
            {filteredNav.map((item) => {
              const isExpanded = expandedSections[item.name];
              const isActive = location.pathname === item.href;

              return (
                <div key={item.name} className="group">
                  {/* Main Navigation Item */}
                  {item.expandable ? (
                    <button
                      onClick={() => toggleSection(item.name)}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-left rounded-xl transition-all duration-300 group-hover:shadow-md group-hover:shadow-black/20 no-scrollbar ${isExpanded
                          ? 'bg-[#1e1e1e] text-white border border-[#404040] no-scrollbar'
                          : 'text-[#a3a3a3] hover:text-white hover:bg-[#1e1e1e] hover:border-[#404040] border border-transparent no-scrollbar'
                        }`}
                    >
                      <div className="flex items-center no-scrollbar">
                        <item.icon className={`mr-3 h-5 w-5 transition-colors duration-300 ${isExpanded ? 'text-[#2563eb]' : 'text-[#6b7280] group-hover:text-[#2563eb]'
                          }`} />
                        <span>{item.name}</span>
                      </div>
                      <div className={`transition-transform duration-300 no-scrollbar ${isExpanded ? 'rotate-180' : ''}`}>
                        <HiChevronDown className={`h-4 w-4 transition-colors duration-300 ${isExpanded ? 'text-[#2563eb]' : 'text-[#6b7280]'
                          }`} />
                      </div>
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 group hover:shadow-md hover:shadow-black/20 border ${isActive
                          ? 'bg-[#2563eb] text-white border-[#2563eb] shadow-lg shadow-blue-500/20'
                          : 'text-[#a3a3a3] hover:text-white hover:bg-[#1e1e1e] hover:border-[#404040] border-transparent'
                        }`}
                      onClick={handleCloseSidebar}
                    >
                      <item.icon className={`mr-3 h-5 w-5 transition-colors duration-300 ${isActive
                          ? 'text-white'
                          : 'text-[#6b7280] group-hover:text-[#2563eb]'
                        }`} />
                      {item.name}
                    </Link>
                  )}

                  {/* Sub Items */}
                  {item.expandable && (
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out no-scrollbar ${isExpanded ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'
                        }`}
                    >
                      <div className="ml-4 space-y-1 border-l-2 border-[#2a2a2a] pl-4 no-scrollbar">
                        {item.subItems?.filter(subItem => subItem.roles.includes(userRole)).map((subItem) => {
                          const isSubActive = location.pathname === subItem.href;
                          return (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              className={`block px-4 py-2.5 text-sm rounded-lg transition-all duration-300 hover:shadow-md hover:shadow-black/10 border ${isSubActive
                                  ? 'text-white bg-[#2563eb] border-[#2563eb] font-medium shadow-lg shadow-blue-500/20'
                                  : 'text-[#6b7280] hover:text-white hover:bg-[#1e1e1e] hover:border-[#404040] border-transparent'
                                }`}
                              onClick={handleCloseSidebar}
                            >
                              <span className="relative">
                                {subItem.name}
                                {isSubActive && (
                                  <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-1 h-4 bg-[#2563eb] rounded-full"></div>
                                )}
                              </span>
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
        <div className="p-6 border-t border-[#2a2a2a] bg-[#0a0a0a]">
          {/* <div className="flex space-x-3">
            <button className="flex-1 flex items-center justify-center px-4 py-3 border border-[#404040] rounded-xl text-sm font-medium text-[#a3a3a3] bg-[#161616] hover:text-white hover:bg-[#1e1e1e] hover:border-[#2563eb] transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <FiPlus className="h-4 w-4 mr-2" />
              Add
            </button>
            <button className="flex-1 flex items-center justify-center px-4 py-3 border border-[#404040] rounded-xl text-sm font-medium text-[#a3a3a3] bg-[#161616] hover:text-white hover:bg-[#1e1e1e] hover:border-[#2563eb] transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
              <FiEdit3 className="h-4 w-4 mr-2" />
              Edit
            </button>
          </div> */}

          {/* User Info */}
          {user && (
            <div className="mt-4 p-4 bg-[#161616] rounded-xl border border-[#2a2a2a]">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] flex items-center justify-center border-2 border-[#404040]">
                  <FiUser className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-white truncate">{user.name || 'User'}</div>
                  <div className="text-xs text-[#6b7280] capitalize">{user.role || 'Employee'}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default MainSidebar;