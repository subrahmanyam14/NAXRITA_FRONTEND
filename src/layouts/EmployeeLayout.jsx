// src/layouts/EmployeeLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import EmployeeSidebar from '../employee/components/EmployeeSidebar';
import Header from '../shared/components/Header';
import MainSidebar from '../shared/components/MainSidebar';
import { useAuth } from '../contexts/AuthContext';
import { HiMenu } from 'react-icons/hi';

const EmployeeLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

  const [mainSidebarOpen, setMainSidebarOpen] = useState(false);
  const [dashboardSidebarOpen, setDashboardSidebarOpen] = useState(true);

  // Close MainSidebar when route changes (optional UX)
  useEffect(() => {
    setMainSidebarOpen(false);
  }, [location]);

  // Sync dashboardSidebarOpen with screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDashboardSidebarOpen(false);
      } else {
        setDashboardSidebarOpen(true);
      }
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle functions
  const toggleDashboardSidebar = () => {
    setDashboardSidebarOpen((prev) => !prev);
  };

  if (!user) {
    return null; // Assume ProtectedRoute handles auth
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-100">
      {/* Header (Fixed at Top) */}
      <Header
        isPublic={false}
        setMainSidebarOpen={setMainSidebarOpen} // Triggers MainSidebar
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Employee Dashboard Sidebar (Persistent on desktop) */}
        <EmployeeSidebar
          sidebarOpen={dashboardSidebarOpen}
          setSidebarOpen={setDashboardSidebarOpen}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Page Content */}
          <main className="flex-1 relative z-0 overflow-y-auto bg-white">
            <div className="py-0">
              <div className="max-w-7xl mx-auto px-0 sm:px-6 md:px-0">
                <Outlet />
              </div>
            </div>
          </main>

          {/* Mobile Dashboard Toggle Button */}
          <div className="md:hidden fixed bottom-4 left-4 z-20">
            <button
              type="button"
              className="inline-flex items-center justify-center p-3 rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={toggleDashboardSidebar}
              aria-label="Toggle employee menu"
            >
              <HiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* MainSidebar (Global Menu) - Modal Overlay */}
      {mainSidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setMainSidebarOpen(false)}
          />
          {/* Sidebar */}
          <MainSidebar sidebarOpen={mainSidebarOpen} setSidebarOpen={setMainSidebarOpen} />
        </>
      )}
    </div>
  );
};

export default EmployeeLayout;