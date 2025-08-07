// src/shared/components/Header.jsx
import { Fragment, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';

// 🔹 Use React Outline Icons (thin, modern)
import { FiSearch } from 'react-icons/fi';
import { FiMenu, FiX } from 'react-icons/fi'; // Menu & Close
import { FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { FiBell, FiMail, FiMessageCircle } from 'react-icons/fi';

// 🔹 Sidebar
import MainSidebar from './MainSidebar';

// 🔹 Auth Context
import { useAuth } from '../../contexts/AuthContext';

export default function Header({ isPublic = false }) {
  const { user: contextUser, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Read from localStorage if context doesn't provide
  const storedUserStr = localStorage.getItem('user');
  const storedUser = storedUserStr ? JSON.parse(storedUserStr) : null;

  const user = contextUser || storedUser;
  const isLoggedIn = !!(user && user.role);
  const userName = user?.name || 'User';

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // Profile dropdown items
  const profileNavigation = [
    { name: 'View Profile', icon: FiUser, href: `/${user?.role}/profile` },
    { name: 'Settings', icon: FiSettings, href: '/settings' },
    { name: 'Sign out', icon: FiLogOut, onClick: logout },
  ];
  // In your AuthContext
  // const logout = () => {
  //   const confirmLogout = window.confirm('Are you sure you want to sign out?');

  //   if (confirmLogout) {
  //     // Clear user state
  //     setUser(null);

  //     // Clear localStorage
  //     localStorage.removeItem('user');
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('refreshToken');

  //     // Redirect to login
  //     window.location.href = '/login';
  //   }
  // };


  return (
    <>
      {/* Header */}
      <header className="bg-black shadow-lg border-b border-[#2a2a2a] z-30 sticky top-0 h-[72px] flex items-center font-jakarta">
        <div className="px-8 w-full flex items-center justify-between">
          {/* Left: Menu Button + Label + Brand */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            <button
              type="button"
              className="flex items-center space-x-2 p-3 rounded-lg text-[#a3a3a3] hover:bg-[#1e1e1e] hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 ease-out border border-[#404040] hover:border-[#2563eb] hover:shadow-lg hover:shadow-blue-500/10"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <FiX className="h-5 w-5" />
              ) : (
                <FiMenu className="h-5 w-5" />
              )}
              <span className="text-sm font-medium">Menu</span>
            </button>

            {/* Brand with Logo */}
            <Link
              to={`/${user?.role}/home`}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300"
              aria-label="Go to profile"
            >
              <img
                src="https://naxrita.com/wp-content/uploads/2024/10/logo-t.png"
                alt="Naxrita Logo"
                className="h-8 w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'; // Use currentTarget instead of target
                }}
                loading="lazy" // Optimize image loading
              />
            </Link>          </div>

          {/* Center: Search Bar */}
          <div className="mx-6 flex-1 max-w-lg">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search employees, departments, tasks..."
                className="w-full pl-12 pr-4 py-3 text-sm rounded-full bg-black border border-[#404040] text-white placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50 focus:border-[#2563eb] transition-all duration-300 hover:border-[#666666] hover:shadow-md hover:shadow-black/20"
              />
              <FiSearch className="absolute left-4 top-3.5 h-4 w-4 text-[#6b7280] group-focus-within:text-[#2563eb] transition-colors duration-300 pointer-events-none" />
              <div className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[0_0_20px_rgba(37,99,235,0.2)]"></div>
            </div>
          </div>

          {/* Right: Icons & User */}
          <div className="flex items-center space-x-2">
            {/* Chat */}
            {/* <button
              type="button"
              className="p-3 rounded-xl text-[#a3a3a3] hover:text-white hover:bg-[#1e1e1e] relative transition-all duration-300 focus:outline-none border border-transparent hover:border-[#404040] hover:shadow-lg hover:shadow-black/20 group"
            >
              <FiMessageCircle className="h-5 w-5" />
              <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-[#2563eb] rounded-full animate-pulse"></span>
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[0_0_15px_rgba(37,99,235,0.1)]"></div>
            </button> */}

            {/* Notifications */}
            {/* <button
              type="button"
              className="p-3 rounded-xl text-[#a3a3a3] hover:text-white hover:bg-[#1e1e1e] relative transition-all duration-300 focus:outline-none border border-transparent hover:border-[#404040] hover:shadow-lg hover:shadow-black/20 group"
            >
              <FiBell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-5 w-5 bg-[#ef4444] rounded-full flex items-center justify-center text-white text-xs font-medium">
                1
              </span>
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[0_0_15px_rgba(239,68,68,0.1)]"></div>
            </button> */}

            {/* Email */}
            {/* <button
              type="button"
              className="p-3 rounded-xl text-[#a3a3a3] hover:text-white hover:bg-[#1e1e1e] relative transition-all duration-300 focus:outline-none border border-transparent hover:border-[#404040] hover:shadow-lg hover:shadow-black/20 group"
            >
              <FiMail className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-5 w-5 bg-[#22c55e] rounded-full flex items-center justify-center text-white text-xs font-medium">
                3
              </span>
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[0_0_15px_rgba(34,197,94,0.1)]"></div>
            </button> */}

            {/* User: Show Login or Profile */}
            {isLoggedIn ? (
              <Menu as="div" className="relative ml-4">
                <MenuButton
                  className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50 rounded-xl p-2 border border-[#404040] hover:border-[#2563eb] bg-black hover:bg-[#1e1e1e] transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                  aria-label="User menu"
                >
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] flex items-center justify-center border-2 border-[#404040] hover:border-[#2563eb] transition-all duration-300 shadow-lg">
                    <FiUser className="h-5 w-5 text-white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-semibold text-white">{userName}</div>
                    <div className="text-xs text-[#6b7280] capitalize">{user?.role || 'User'}</div>
                  </div>
                </MenuButton>

                <MenuItems
                  className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-[#1e1e1e] shadow-xl border border-[#2a2a2a] py-2 text-sm focus:outline-none transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 shadow-[0_10px_25px_rgba(0,0,0,0.9)]"
                >
                  {profileNavigation.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <MenuItem key={item.name}>
                        {({ focus }) => (
                          <Link
                            to={item.href || '#'}
                            onClick={(e) => {
                              if (item.onClick) {
                                e.preventDefault();
                                item.onClick();
                              }
                            }}
                            className={`${focus
                                ? 'bg-[#2563eb] text-white shadow-lg shadow-blue-500/20'
                                : 'text-[#a3a3a3] hover:text-white'
                              } flex items-center px-4 py-3 mx-2 rounded-lg transition-all duration-300 ${index === profileNavigation.length - 1
                                ? 'border-t border-[#2a2a2a] mt-2'
                                : ''
                              }`}
                          >
                            <Icon className={`mr-3 h-4 w-4 ${focus ? 'text-white' : 'text-[#6b7280]'
                              }`} />
                            <span className="font-medium">{item.name}</span>
                          </Link>
                        )}
                      </MenuItem>
                    );
                  })}
                </MenuItems>
              </Menu>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2.5 text-sm font-semibold bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 border border-[#2563eb]"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar Component */}
      <MainSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </>
  );
}
