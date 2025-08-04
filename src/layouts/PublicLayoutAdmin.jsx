// src/layouts/PublicAdminLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from '../shared/components/Header';
import Footer from '../shared/components/Footer';
const PublicAdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isPublic={false} /> {/* Shows user menu, not login */}
       <div className="relative bg-black text-white p-6 overflow-hidden ">
  <img
    src="https://bbditm.ac.in/wp-content/uploads/2020/02/utkarsh-website-banner-background.jpg"
    alt="QR Code"
    className="absolute inset-0 w-full h-full object-cover opacity-60"
    aria-hidden="true"
  />
  <div className="relative flex items-center justify-between gap-4">
    <div className="max-w-2xl">
      
              <h2 className="text-4xl font-bold text-gray-100 mb-4 font-jakarta ">Admin Portal</h2>
          <p className="text-gray-300 mb-6 font-jakarta">
            Welcome to the admin public area. You can access policies, announcements, and more before entering the full dashboard.
          </p>
    </div>
    
  </div>
</div>
      <main className="container mx-auto px-0 py-0">
        <div className="max-w-full mx-auto">
     
          <Outlet />
        </div>
      </main>
      <Footer/>
    </div>
  );
};

export default PublicAdminLayout;