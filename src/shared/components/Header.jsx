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

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm z-30 sticky top-0 h-14 flex items-center">
        <div className="px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
          {/* Left: Menu Button + Label + Brand */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <button
              type="button"
              className="flex items-center space-x-1 p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <FiX className="h-5 w-5" />
              ) : (
                <FiMenu className="h-5 w-5" />
              )}
              <span className="text-sm font-medium text-gray-700">Menu</span>
            </button>
  
            <Link to="/" className="text-lg font-semibold text-indigo-600">
              NexRita
            </Link>
          </div>

          {/* Center: Search Bar */}
          <div className="mx-4 flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-200"
              />
              <FiSearch className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Right: Icons & User */}
          <div className="flex items-center space-x-3">
            {/* Chat */}
            <button
              type="button"
              className="p-2 rounded-full text-gray-600 hover:text-indigo-600 hover:bg-gray-100 relative transition duration-200 focus:outline-none"
            >
              <FiMessageCircle className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Notifications */}
            <button
              type="button"
              className="p-2 rounded-full text-gray-600 hover:text-indigo-600 hover:bg-gray-100 relative transition duration-200 focus:outline-none"
            >
              <FiBell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                1
              </span>
            </button>

            {/* Email */}
            <button
              type="button"
              className="p-2 rounded-full text-gray-600 hover:text-indigo-600 hover:bg-gray-100 relative transition duration-200 focus:outline-none"
            >
              <FiMail className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                3
              </span>
            </button>

            {/* User: Show Login or Profile */}
            {isLoggedIn ? (
              <Menu as="div" className="relative ml-3">
                <MenuButton
                  className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 rounded-md p-1"
                  aria-label="User menu"
                >
                  <div className="h-8 w-8 rounded-full  flex items-center justify-center border border-gray-600">
                    <FiUser className="h-5 w-5 text-gray-900" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">{userName}</span>
                </MenuButton>

                <MenuItems
                  className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 py-1 text-sm focus:outline-none transition duration-100 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                  {profileNavigation.map((item) => {
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
                            className={`${
                              focus ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'
                            } flex items-center px-4 py-2`}
                          >
                            <Icon className="mr-3 h-4 w-4 text-gray-500" />
                            {item.name}
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
                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition duration-200"
              >
                Login
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