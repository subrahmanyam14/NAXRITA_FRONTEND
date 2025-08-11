// src/layouts/AdminLayout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import AdminSidebar from '../admin/components/AdminSidebar';
import Header from '../shared/components/Header';
import MainSidebar from '../shared/components/MainSidebar';
import { useAuth } from '../contexts/AuthContext';
import { HiMenu, HiChevronRight, HiChevronLeft } from 'react-icons/hi';

const SIDEBAR_WIDTH = 280;   // keep in sync with AdminSidebar width
const DRAG_THRESHOLD = 80;   // px needed to open/close on drag

const AdminLayout = () => {
  const { user } = useAuth();
  const location = useLocation();

  const [mainSidebarOpen, setMainSidebarOpen] = useState(false);
  const [dashboardSidebarOpen, setDashboardSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // drag state (mobile)
  const dragStartX = useRef(null);
  const [dragDelta, setDragDelta] = useState(0);
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
    setDashboardSidebarOpen(prev => !prev);
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

    if (!dashboardSidebarOpen) {
      // closed -> allow rightward drag (0..SIDEBAR_WIDTH)
      setDragDelta(Math.max(0, Math.min(SIDEBAR_WIDTH, delta)));
    } else {
      // open -> allow leftward drag (-SIDEBAR_WIDTH..0)
      setDragDelta(Math.min(0, Math.max(-SIDEBAR_WIDTH, delta)));
    }
  };

  const onDragEnd = () => {
    if (!isMobile) return;
    if (!dashboardSidebarOpen && dragDelta > DRAG_THRESHOLD) {
      setDashboardSidebarOpen(true);
    } else if (dashboardSidebarOpen && dragDelta < -DRAG_THRESHOLD) {
      setDashboardSidebarOpen(false);
    }
    setIsDragging(false);
    dragStartX.current = null;
    setDragDelta(0);
  };

  // Pointer helpers
  const handleHandleMouseDown = (e) => onDragStart(e.clientX);
  const handleHandleMouseMove = (e) => { if (isDragging) onDragMove(e.clientX); };
  const handleHandleMouseUp = onDragEnd;

  const handleHandleTouchStart = (e) => onDragStart(e.touches[0].clientX);
  const handleHandleTouchMove = (e) => onDragMove(e.touches[0].clientX);
  const handleHandleTouchEnd = onDragEnd;

  if (!user) return null; // ProtectedRoute handles auth

  // Compute sidebar translate for mobile
  const baseTranslate = dashboardSidebarOpen ? 0 : -SIDEBAR_WIDTH;
  const dragTranslate = isDragging ? dragDelta : 0;
  const currentTranslate = isMobile
    ? `translateX(${baseTranslate + dragTranslate}px)`
    : 'translateX(0)';

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-950">
      {/* Header */}
      <Header
        isPublic={false}
        setMainSidebarOpen={setMainSidebarOpen}
        className="sticky top-0 z-1000"
      />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Desktop / Tablet persistent sidebar */}
        <div className="hidden md:block h-screen">
          <AdminSidebar
            sidebarOpen={dashboardSidebarOpen}
            setSidebarOpen={setDashboardSidebarOpen}
            className="h-full"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 relative">
          <main className="flex-1 relative z-0 overflow-y-auto bg-white">
            <div className="py-0">
              <div className="max-w-full mx-auto px-4 sm:px-0 md:px-0">
                <Outlet />
              </div>
            </div>
          </main>

          {/* Mobile FAB (optional since hanger exists) */}
          <div className="md:hidden fixed bottom-4 left-4 z-20">
            <button
              type="button"
              className="inline-flex items-center justify-center p-3 rounded-full shadow-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={toggleDashboardSidebar}
              aria-label="Toggle admin menu"
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

            {/* Sliding container */}
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
                <AdminSidebar
                  sidebarOpen={true}
                  setSidebarOpen={setDashboardSidebarOpen}
                  className="h-full"
                />
              </div>

              {/* Hanger / Handle */}
              <div
                className="absolute top-1/2 -right-7 -translate-y-1/2"
                onMouseDown={handleHandleMouseDown}
                onTouchStart={handleHandleTouchStart}
              >
                <button
                  type="button"
                  aria-label="Drag or tap to toggle admin menu"
                  onClick={() => setDashboardSidebarOpen(p => !p)}
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

export default AdminLayout;
