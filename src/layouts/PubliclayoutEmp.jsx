// src/layouts/PublicEmployeeLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from '../shared/components/Header';
import Footer from '../shared/components/Footer';
const PublicEmployeeLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header isPublic={false} />
      <div className="relative bg-black text-white p-6 overflow-hidden ">
  <img
    src="https://bbditm.ac.in/wp-content/uploads/2020/02/utkarsh-website-banner-background.jpg"
    alt="QR Code"
    className="absolute inset-0 w-full h-full object-cover opacity-60"
    aria-hidden="true"
  />
  <div className="relative flex items-center justify-between gap-4">
    <div className="max-w-2xl">
      
          <h2 className="text-2xl font-bold text-gray-300 mb-4">Employee Portal</h2>
      <p className="text-xl font-thin">  Welcome! This is your public employee space. 
        Access policies, learning, and announcements.</p>
    </div>
    
  </div>
</div>
      <main className="container mx-auto px-0 py-0">
        <div className="max-w-full mx-auto">
          <p className="text-gray-600 mb-6">
           
          </p>
          <Outlet />
        </div>
      </main>
     <Footer/>
    </div>
  );
};

export default PublicEmployeeLayout;