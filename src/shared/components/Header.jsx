// src/shared/components/Header.jsx
import { Fragment, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, MenuButton, MenuItems, MenuItem, Transition } from '@headlessui/react';
import { FiSearch, FiMenu, FiX, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import MainSidebar from './MainSidebar';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { user: contextUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Fallback user from localStorage
  const storedUserStr = localStorage.getItem('user');
  const storedUser = storedUserStr ? JSON.parse(storedUserStr) : null;
  const user = contextUser || storedUser;

  const isLoggedIn = !!(user && user.role);
  const userName = user?.name || 'User';

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleMobileSearch = () => setMobileSearchOpen((s) => !s);

  const profileNavigation = [
    { name: 'View Profile', icon: FiUser, href: `/${['Super Admin', 'Admin'].includes(user?.role)? 'Admin': 'Employee'}/profile` },
    { name: 'Settings', icon: FiSettings, href: '/settings' },
    { name: 'Sign out', icon: FiLogOut, onClick: logout },
  ];

  return (
    <>
      {/* Top App Bar */}
      <header className="sticky top-0 z-30  bg-black/95 backdrop-blur border-b border-[#2a2a2a]">
        <div className="h-[64px] px-4 sm:px-2 lg:px-3 flex items-center  gap-6 sm:gap-8 lg:gap-24">
          {/* LEFT: Menu */}
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-[#a3a3a3] hover:text-white hover:bg-[#151515] border border-[#2a2a2a] hover:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/40 transition"
          >
            {sidebarOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            <span className="hidden sm:inline text-sm font-jakarta font-medium">Menu</span>
          </button>

          {/* CENTER: Brand */}
          <Link
            to={`/${user?.role || 'user'}/home`}
            className="flex items-center gap-2 hover:opacity-90 transition"
            aria-label="Go to home"
          >
            <img
              src="https://naxrita.com/wp-content/uploads/2024/10/logo-t.png"
              alt="Naxrita Logo"
              className="h-9 w-auto"
              onError={(e) => (e.currentTarget.style.display = 'none')}
              loading="lazy"
            />
            {/* <span className="hidden md:inline text-white/90 font-semibold tracking-wide">Naxrita</span> */}
          </Link>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-1 sm:gap-96">
            {/* Mobile Search Toggle */}
            <button
              type="button"
              onClick={toggleMobileSearch}
              aria-label="Search"
              className="md:hidden p-2.5 rounded-full text-[#a3a3a3] hover:text-white hover:bg-[#151515] transition focus:outline-none focus:ring-2 font-jakarta focus:ring-[#2563eb]/40"
            >
              <FiSearch className="h-5 w-5" />
            </button>

            {/* Desktop Search (inline) */}
            <div className="hidden md:block w-72 lg:w-96">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search employees, departments, tasks…"
                  className="w-full font-jakarta pl-10 pr-3 py-2.5 text-sm rounded-full bg-[#0b0b0b] border border-[#2a2a2a] text-white placeholder-[#6b7280]
                             focus:outline-none focus:ring-2 focus:ring-[#2563eb]/40 focus:border-[#2563eb] transition"
                />
                <FiSearch className="absolute left-3 top-2.5 h-4 w-4 font-jakarta text-[#6b7280] group-focus-within:text-[#2563eb] transition" />
              </div>
            </div>

            {/* Profile */}
            {isLoggedIn ? (
              <Menu as="div" className="relative">
                <MenuButton className="flex items-center gap-2 rounded-xl px-2 py-1.5 border border-[#2a2a2a] bg-[#0b0b0b] hover:bg-[#141414] text-white transition focus:outline-none focus:ring-2 focus:ring-[#2563eb]/40">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] flex items-center justify-center border border-[#2a2a2a] font-jakarta">
                    <FiUser className="h-4 w-4 text-white" />
                  </div>
                  <div className="hidden sm:block text-left font-jakarta">
                    <div className="text-sm font-semibold leading-4">{userName}</div>
                    <div className="text-[11px] text-white/50 capitalize">{user?.role || 'user'}</div>
                  </div>
                </MenuButton>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-150"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <MenuItems className="absolute right-0 mt-2 w-56 rounded-xl bg-[#111] border border-[#262626] shadow-xl py-2 focus:outline-none font-jakarta">
                    {profileNavigation.map((item, idx) => {
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
                              className={`flex items-center px-4 py-2.5 text-sm rounded-lg ${
                                focus ? 'bg-[#1b1b1b] text-white' : 'text-white/90'
                              } ${idx === profileNavigation.length - 1 ? 'mt-2 border-t border-[#1f1f1f] pt-3' : ''}`}
                            >
                              <Icon className={`mr-3 h-4 w-4 ${focus ? 'text-white' : 'text-white/60'}`} />
                              <span className="font-medium font-jakarta">{item.name}</span>
                            </Link>
                          )}
                        </MenuItem>
                      );
                    })}
                  </MenuItems>
                </Transition>
              </Menu>
            ) : (
              <Link
                to="/login"
                className="ml-1 px-4 py-2.5 text-sm font-semibold bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50 border border-[#2563eb] transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* MOBILE: Slide-down Search */}
        <div
          className={`md:hidden px-4 pb-3 overflow-hidden transition-[max-height,opacity] duration-300 ${
            mobileSearchOpen ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search employees, departments, tasks…"
              className="w-full pl-10 pr-3 font-jakarta py-2.5 text-sm rounded-lg bg-[#0b0b0b] border border-[#1f1f1f] text-white placeholder-[#6b7280]
                         focus:outline-none focus:ring-2 focus:ring-[#2563eb]/40 focus:border-[#2563eb] transition"
            />
            <FiSearch className="absolute left-3 top-2.5 h-4 w-4 text-[#6b7280]" />
          </div>
        </div>
      </header>

      {/* Global Sidebar (slide-over) */}
      <MainSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </>
  );
}
