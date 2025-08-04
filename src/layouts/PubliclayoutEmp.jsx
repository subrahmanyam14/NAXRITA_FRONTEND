// src/layouts/PublicEmployeeLayout.jsx
import { Outlet } from 'react-router-dom';
import Header from '../shared/components/Header';
import Footer from '../shared/components/Footer';

const PublicEmployeeLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-['Plus_Jakarta_Sans']">
      <Header isPublic={false} />
      <div className="relative bg-black text-white p-6 overflow-hidden">
        <img
          src="https://bbditm.ac.in/wp-content/uploads/2020/02/utkarsh-website-banner-background.jpg"
          alt="QR Code"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          aria-hidden="true"
        />
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
        
        <div className="relative flex items-center justify-between gap-4">
          <div className="max-w-2xl">
            {/* Primary heading with gradient from orange through white to blue */}
            <h2 
              className="text-4xl font-semibold mb-4 bg-gradient-to-r font-jakarta from-white via-blue-700 to-white bg-clip-text text-transparent"
              style={{ 
                // background: 'linear-gradient(to right, #fff, #0066ff, #ffffffff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Employee Portal
            </h2>
            
            <p className="text-lg font-light font-jakarta text-gray-200 leading-relaxed">
              Welcome! This is your{' '}
             
                public employee space
        
              . Access{' '}
              policies
          learning
             announcements
            </p>
          </div>
        </div>
      </div>
      
      <main className="container mx-auto px-0 py-0 font-['Plus_Jakarta_Sans']">
        <div className="max-w-full mx-auto">
          <Outlet />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PublicEmployeeLayout;
