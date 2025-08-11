// src/layouts/EmployeeLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import EmployeeSidebar from '../employee/components/EmployeeSidebar';
import Header from '../shared/components/Header';
import MainSidebar from '../shared/components/MainSidebar';
import { useAuth } from '../contexts/AuthContext';
import { HiMenu, HiChevronRight, HiChevronLeft } from 'react-icons/hi';

const SIDEBAR_WIDTH = 280; // px, keep in sync with your EmployeeSidebar width
const DRAG_THRESHOLD = 80; // px needed to open/close on drag

const EmployeeLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

  const [mainSidebarOpen, setMainSidebarOpen] = useState(false);
  const [dashboardSidebarOpen, setDashboardSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // drag state (mobile)
  const dragStartX = useRef(null);
  const [dragDelta, setDragDelta] = useState(0); // visual translate while dragging
  const [isDragging, setIsDragging] = useState(false);

  // Close MainSidebar when route changes
  useEffect(() => {
    setMainSidebarOpen(false);
  }, [location]);

  // Sync mobile/desktop + default dashboard open state
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setDashboardSidebarOpen(!mobile); // open on desktop, closed on mobile
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleDashboardSidebar = () => {
    setDashboardSidebarOpen((prev) => !prev);
  };

  // ---- Drag handlers (mobile only) ----
  const onDragStart = (clientX) => {
    if (!isMobile) return;
    setIsDragging(true);
    dragStartX.current = clientX;
    setDragDelta(0);
  };

  const onDragMove = (clientX) => {
    if (!isMobile || dragStartX.current === null) return;
    const delta = clientX - dragStartX.current;

    // If closed, we only care about rightward drag (positive)
    // If open, we only care about leftward drag (negative)
    if (!dashboardSidebarOpen) {
      setDragDelta(Math.max(0, Math.min(SIDEBAR_WIDTH, delta)));
    } else {
      setDragDelta(Math.min(0, Math.max(-SIDEBAR_WIDTH, delta)));
    }
  };

  const onDragEnd = () => {
    if (!isMobile) return;
    // Decide to open/close based on delta
    if (!dashboardSidebarOpen && dragDelta > DRAG_THRESHOLD) {
      setDashboardSidebarOpen(true);
    } else if (dashboardSidebarOpen && dragDelta < -DRAG_THRESHOLD) {
      setDashboardSidebarOpen(false);
    }
    // reset drag
    setIsDragging(false);
    dragStartX.current = null;
    setDragDelta(0);
  };

  // Pointer helpers for both mouse & touch
  const handleHandleMouseDown = (e) => onDragStart(e.clientX);
  const handleHandleMouseMove = (e) => {
    if (isDragging) onDragMove(e.clientX);
  };
  const handleHandleMouseUp = onDragEnd;

  const handleHandleTouchStart = (e) => onDragStart(e.touches[0].clientX);
  const handleHandleTouchMove = (e) => onDragMove(e.touches[0].clientX);
  const handleHandleTouchEnd = onDragEnd;

  if (!user) return null; // ProtectedRoute handles redirect

  // Compute sidebar translate for mobile
  const baseTranslate = dashboardSidebarOpen ? 0 : -SIDEBAR_WIDTH;
  const dragTranslate = isDragging ? dragDelta : 0;
  const currentTranslate = isMobile
    ? `translateX(${baseTranslate + dragTranslate}px)`
    : 'translateX(0)';

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-100">
      {/* Header */}
      <Header
        isPublic={false}
        setMainSidebarOpen={setMainSidebarOpen}
      />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Desktop / Tablet persistent sidebar */}
        <div className="hidden md:block h-screen">
          <EmployeeSidebar
            sidebarOpen={dashboardSidebarOpen}
            setSidebarOpen={setDashboardSidebarOpen}
            className="h-full"
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          <main className="flex-1 relative z-0 overflow-y-auto bg-white">
            <div className="py-0">
              <div className="max-w-7xl mx-auto px-0 sm:px-6 md:px-0">
                <Outlet />
              </div>
            </div>
          </main>

          {/* Mobile Dashboard Toggle FAB (you can keep it or remove since we add a hanger) */}
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

        {/* ===== Mobile Overlay Sidebar (slides over Outlet) ===== */}
        {isMobile && (
          <>
            {/* Backdrop when open */}
            {dashboardSidebarOpen && (
              <div
                className="md:hidden fixed inset-0 z-30 bg-black/40"
                onClick={() => setDashboardSidebarOpen(false)}
              />
            )}

            {/* Sliding container (fixed) */}
            <div
              className="md:hidden fixed inset-y-0 left-0 z-40"
              style={{
                width: SIDEBAR_WIDTH,
                transform: currentTranslate,
                transition: isDragging ? 'none' : 'transform 200ms ease',
              }}
              // Mouse
              onMouseMove={handleHandleMouseMove}
              onMouseUp={handleHandleMouseUp}
              onMouseLeave={isDragging ? handleHandleMouseUp : undefined}
              // Touch
              onTouchMove={handleHandleTouchMove}
              onTouchEnd={handleHandleTouchEnd}
            >
              {/* Sidebar content */}
              <div className="h-full bg-white shadow-xl border-r border-gray-200">
                <EmployeeSidebar
                  sidebarOpen={true}
                  setSidebarOpen={setDashboardSidebarOpen}
                  className="h-full"
                />
              </div>

              {/* Hanger / Handle */}
              <div
                className="absolute top-1/2 -right-7 -translate-y-1/2"
                // Make the handle easy to grab
                onMouseDown={handleHandleMouseDown}
                onTouchStart={handleHandleTouchStart}
              >
                <button
                  type="button"
                  aria-label="Drag or tap to toggle employee menu"
                  onClick={() => setDashboardSidebarOpen((p) => !p)}
                  className="h-12 w-6 rounded-r-full bg-white shadow-lg border border-gray-200 flex items-center justify-center"
                >
                  {dashboardSidebarOpen ? (
                    <HiChevronLeft className="h-6 w-8 text-gray-700" />
                  ) : (
                    <HiChevronRight className="h-6 w-8 text-gray-700" />
                  )}
                </button>
              </div>
            </div>

           
          </>
        )}
      </div>

      {/* MainSidebar (Global Menu) */}
      {mainSidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 transition-opacity"
            onClick={() => setMainSidebarOpen(false)}
          />
          <MainSidebar sidebarOpen={mainSidebarOpen} setSidebarOpen={setMainSidebarOpen} />
        </>
      )}
    </div>
  );
};

export default EmployeeLayout;
